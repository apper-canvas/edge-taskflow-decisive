import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No items found", 
  message = "Get started by creating your first item", 
  actionLabel = "Create New", 
  onAction = null,
  icon = "Plus",
  type = 'default' 
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'tasks':
        return {
          title: "No tasks yet",
          message: "Start organizing your day by adding your first task",
          actionLabel: "Add Task",
          icon: "CheckSquare"
        }
      case 'search':
        return {
          title: "No results found",
          message: "Try adjusting your search terms or filters",
          actionLabel: "Clear Search",
          icon: "Search"
        }
      case 'category':
        return {
          title: "No tasks in this category",
          message: "Add tasks to this category to see them here",
          actionLabel: "Add Task",
          icon: "FolderOpen"
        }
      case 'today':
        return {
          title: "No tasks for today",
          message: "Enjoy your free day or add some tasks to stay productive",
          actionLabel: "Add Task",
          icon: "Calendar"
        }
      case 'completed':
        return {
          title: "No completed tasks",
          message: "Complete some tasks to see your progress here",
          actionLabel: "View All Tasks",
          icon: "CheckCircle"
        }
      default:
        return { title, message, actionLabel, icon }
    }
  }

  const content = getEmptyContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon 
          name={content.icon} 
          className="w-12 h-12 text-primary" 
        />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-gray-900 mb-2"
      >
        {content.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md"
      >
        {content.message}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transform hover:scale-105"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{content.actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty