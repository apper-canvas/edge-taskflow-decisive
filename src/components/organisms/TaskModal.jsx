import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priority: 'medium',
    dueDate: ''
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        categoryId: task.categoryId || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        priority: 'medium',
        dueDate: ''
      })
    }
    setErrors({})
  }, [task, isOpen])

  useEffect(() => {
    if (isOpen) {
      loadCategories()
    }
  }, [isOpen])

  const loadCategories = async () => {
    try {
      const fetchedCategories = await categoryService.getAll()
      setCategories(fetchedCategories)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required'
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }

      if (task) {
        await taskService.update(task.Id, taskData)
        toast.success('Task updated successfully!')
      } else {
        await taskService.create(taskData)
        toast.success('Task created successfully!')
      }

      onSave()
      onClose()
    } catch (err) {
      toast.error(task ? 'Failed to update task' : 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const categoryOptions = categories.map(cat => ({
    value: cat.name.toLowerCase(),
    label: cat.name
  }))

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter task title"
                error={errors.title}
                autoFocus
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Add a description (optional)"
                  rows={3}
                  className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData.categoryId}
                  onChange={(e) => handleChange('categoryId', e.target.value)}
                  placeholder="Select category"
                  error={errors.categoryId}
                />

                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                />
              </div>

              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {task ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskModal