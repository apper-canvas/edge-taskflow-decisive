import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'

const QuickAddBar = ({ onAddTask, categories = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Task title is required')
      return
    }

    setIsLoading(true)
try {
      await onAddTask({
        title: title.trim(),
        description: description.trim(),
        categoryId: categoryId || 'personal',
        priority,
        dueDate: dueDate ? new Date(dueDate + 'T23:59:59.999Z').toISOString() : null
      })
      // Reset form
      setTitle('')
      setDescription('')
      setCategoryId('')
      setPriority('medium')
      setDueDate('')
      setIsExpanded(false)
      
      toast.success('Task added successfully!')
    } catch (error) {
      toast.error('Failed to add task')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      setIsExpanded(false)
    }
  }

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <ApperIcon name="Plus" className="w-5 h-5 text-primary" />
          <span className="text-gray-500">Add a new task...</span>
        </button>
      ) : (
        <motion.form
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          onSubmit={handleSubmit}
          className="p-4 space-y-4"
        >
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="text-lg font-semibold"
          />
          
          <Input
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              options={categoryOptions}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Select category"
            />
            
            <Select
              options={priorityOptions}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due date"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-100 rounded">Cmd+Enter</kbd> to save
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                loading={isLoading}
                disabled={!title.trim()}
              >
                Add Task
              </Button>
            </div>
          </div>
        </motion.form>
      )}
    </motion.div>
  )
}

export default QuickAddBar