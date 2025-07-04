import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import { taskService } from '@/services/api/taskService'

const StatsHeader = ({ refreshTrigger = 0 }) => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    today: 0,
    overdue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [refreshTrigger])

  const loadStats = async () => {
    try {
      setLoading(true)
      const [allTasks, todayTasks, overdueTasks] = await Promise.all([
        taskService.getAll(),
        taskService.getTodayTasks(),
        taskService.getOverdueTasks()
      ])

      const completedTasks = allTasks.filter(task => task.completed)

      setStats({
        total: allTasks.length,
        completed: completedTasks.length,
        today: todayTasks.length,
        overdue: overdueTasks.length
      })
    } catch (err) {
      console.error('Failed to load stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0
  const todayDate = format(new Date(), 'EEEE, MMMM d')

  const StatCard = ({ icon, label, value, color, gradient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {loading ? (
              <span className="w-8 h-8 bg-gray-200 rounded shimmer inline-block"></span>
            ) : (
              value
            )}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gradient}`}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Date and greeting */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold gradient-text mb-2"
        >
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          {todayDate}
        </motion.p>
      </div>

      {/* Progress circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${completionPercentage}, 100`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B4CFF" />
                <stop offset="100%" stopColor="#8B7FFF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(completionPercentage)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="List"
          label="Total Tasks"
          value={stats.total}
          color="text-gray-900"
          gradient="bg-gradient-to-br from-gray-500 to-gray-600"
        />
        <StatCard
          icon="CheckCircle"
          label="Completed"
          value={stats.completed}
          color="text-green-600"
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon="Calendar"
          label="Due Today"
          value={stats.today}
          color="text-blue-600"
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon="AlertCircle"
          label="Overdue"
          value={stats.overdue}
          color="text-red-600"
          gradient="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>
    </div>
  )
}

export default StatsHeader