import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  icon = null, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl'
      case 'secondary':
        return 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
      case 'ghost':
        return 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm'
      case 'medium':
        return 'px-4 py-2 text-base'
      case 'large':
        return 'px-6 py-3 text-lg'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  const baseStyles = `
    inline-flex items-center justify-center rounded-lg font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getVariantStyles()}
    ${getSizeStyles()}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 mr-2 animate-spin" 
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          className={`w-4 h-4 ${children ? 'mr-2' : ''}`} 
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          className={`w-4 h-4 ${children ? 'ml-2' : ''}`} 
        />
      )}
    </motion.button>
  )
}

export default Button