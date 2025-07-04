import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  icon = null,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary text-white'
      case 'secondary':
        return 'bg-gray-100 text-gray-700'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'warning':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      case 'low':
        return 'priority-low'
      case 'medium':
        return 'priority-medium'
      case 'high':
        return 'priority-high'
      case 'urgent':
        return 'priority-urgent'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs'
      case 'medium':
        return 'px-3 py-1 text-sm'
      case 'large':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center rounded-full font-medium
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          className={`w-3 h-3 ${children ? 'mr-1' : ''}`} 
        />
      )}
      {children}
    </motion.span>
  )
}

export default Badge