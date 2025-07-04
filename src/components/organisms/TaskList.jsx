import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import TaskCard from '@/components/molecules/TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TaskList = ({ 
  filter = 'all', 
  searchQuery = '', 
  onEditTask,
  refreshTrigger = 0
}) => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTasks()
    loadCategories()
  }, [filter, searchQuery, refreshTrigger])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      
      let fetchedTasks = []
      
      if (searchQuery) {
        fetchedTasks = await taskService.search(searchQuery)
      } else {
        switch (filter) {
          case 'today':
            fetchedTasks = await taskService.getTodayTasks()
            break
          case 'week':
            fetchedTasks = await taskService.getWeekTasks()
            break
          case 'overdue':
            fetchedTasks = await taskService.getOverdueTasks()
break
case 'completed': {
            const allTasks = await taskService.getAll()
            fetchedTasks = allTasks.filter(task => task.completed)
            break
          }
          default:
            fetchedTasks = await taskService.getAll()
        }
      }
      
      setTasks(fetchedTasks)
    } catch (err) {
      setError('Failed to load tasks')
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const fetchedCategories = await categoryService.getAll()
      setCategories(fetchedCategories)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId)
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      )
      
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened')
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      await taskService.delete(taskId)
      setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.name.toLowerCase() === categoryId)
    return category?.color || '#3b82f6'
  }

  const getEmptyStateType = () => {
    if (searchQuery) return 'search'
    switch (filter) {
      case 'today': return 'today'
      case 'completed': return 'completed'
      default: return 'tasks'
    }
  }

  if (loading) {
    return <Loading type="tasks" />
  }

  if (error) {
    return (
      <Error 
        message={error} 
        onRetry={loadTasks}
        type="general"
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <Empty 
        type={getEmptyStateType()}
        onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={onEditTask}
              onDelete={handleDeleteTask}
              categoryColor={getCategoryColor(task.categoryId)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList