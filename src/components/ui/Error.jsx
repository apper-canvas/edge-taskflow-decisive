import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry = null, 
  type = 'general' 
}) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff'
      case 'notFound':
        return 'Search'
      case 'permission':
        return 'Lock'
      default:
        return 'AlertTriangle'
    }
  }

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error'
      case 'notFound':
        return 'Nothing Found'
      case 'permission':
        return 'Access Denied'
      default:
        return 'Oops! Something went wrong'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon 
          name={getErrorIcon()} 
          className="w-8 h-8 text-red-600" 
        />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {getErrorTitle()}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-6 max-w-md"
      >
        {message}
      </motion.p>
      
      {onRetry && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error