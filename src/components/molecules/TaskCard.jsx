import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  isDragging = false,
  categoryColor = '#3b82f6'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    setIsCompleting(true)
    await onToggleComplete(task.Id)
    setTimeout(() => setIsCompleting(false), 300)
  }

  const formatDueDate = (date) => {
    if (!date) return null
    const dueDate = new Date(date)
    
    if (isToday(dueDate)) return "Today"
    if (isTomorrow(dueDate)) return "Tomorrow"
    return format(dueDate, 'MMM d')
  }

  const getDueDateColor = (date) => {
    if (!date) return 'text-gray-400'
    const dueDate = new Date(date)
    
    if (isPast(dueDate) && !task.completed) return 'text-red-500'
    if (isToday(dueDate)) return 'text-orange-500'
    return 'text-gray-600'
  }

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'urgent': return 'urgent'
      case 'high': return 'high'
      case 'medium': return 'medium'
      case 'low': return 'low'
      default: return 'low'
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isDragging ? 0.5 : 1, 
        y: 0,
        scale: isDragging ? 0.95 : 1
      }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer
        transition-all duration-200 group
        ${task.completed ? 'opacity-75' : ''}
        ${isDragging ? 'task-dragging' : ''}
        hover:shadow-md hover:border-gray-200
      `}
    >
      {/* Category indicator */}
      <div 
        className="w-full h-1 rounded-full mb-4"
        style={{ backgroundColor: categoryColor }}
      />
      
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleComplete}
            className={`
              task-checkbox mt-1 flex-shrink-0
              ${isCompleting ? 'animate-scale-check' : ''}
            `}
            disabled={isCompleting}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {}}
              className="task-checkbox"
            />
          </motion.button>
          
          {/* Task content */}
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors
              ${task.completed ? 'line-through text-gray-500' : ''}
            `}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`
                text-sm text-gray-600 mb-2 line-clamp-2
                ${task.completed ? 'line-through text-gray-400' : ''}
              `}>
                {task.description}
              </p>
            )}
            
            {/* Due date */}
            {task.dueDate && (
              <div className="flex items-center space-x-1 text-sm">
                <ApperIcon name="Calendar" className="w-3 h-3" />
                <span className={getDueDateColor(task.dueDate)}>
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Badge variant={getPriorityVariant(task.priority)} size="small">
            {task.priority}
          </Badge>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-1"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(task)
                  }}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Edit2" className="w-4 h-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(task.Id)
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard