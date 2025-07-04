import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts = {} }) => {
  const filters = [
    { 
      id: 'all', 
      label: 'All Tasks', 
      icon: 'List',
      count: taskCounts.all || 0
    },
    { 
      id: 'today', 
      label: 'Today', 
      icon: 'Calendar',
      count: taskCounts.today || 0
    },
    { 
      id: 'week', 
      label: 'This Week', 
      icon: 'CalendarDays',
      count: taskCounts.week || 0
    },
    { 
      id: 'overdue', 
      label: 'Overdue', 
      icon: 'AlertCircle',
      count: taskCounts.overdue || 0
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      icon: 'CheckCircle',
      count: taskCounts.completed || 0
    }
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${activeFilter === filter.id 
              ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }
          `}
        >
          <ApperIcon name={filter.icon} className="w-4 h-4" />
          <span>{filter.label}</span>
          {filter.count > 0 && (
            <span className={`
              px-2 py-1 rounded-full text-xs font-semibold
              ${activeFilter === filter.id 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {filter.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default FilterTabs