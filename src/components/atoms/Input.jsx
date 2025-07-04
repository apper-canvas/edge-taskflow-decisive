import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  type = 'text',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon 
              name={icon} 
              className="w-4 h-4 text-gray-400" 
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-500
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input