import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StatsHeader from '@/components/organisms/StatsHeader'
import FilterTabs from '@/components/molecules/FilterTabs'
import SearchBar from '@/components/molecules/SearchBar'
import QuickAddBar from '@/components/molecules/QuickAddBar'
import TaskList from '@/components/organisms/TaskList'
import TaskModal from '@/components/organisms/TaskModal'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TaskBoard = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    loadCategories()
    loadTaskCounts()
  }, [refreshTrigger])

  const loadCategories = async () => {
    try {
      const fetchedCategories = await categoryService.getAll()
      setCategories(fetchedCategories)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const loadTaskCounts = async () => {
    try {
      const [allTasks, todayTasks, weekTasks, overdueTasks] = await Promise.all([
        taskService.getAll(),
        taskService.getTodayTasks(),
        taskService.getWeekTasks(),
        taskService.getOverdueTasks()
      ])

      const completedTasks = allTasks.filter(task => task.completed)

      setTaskCounts({
        all: allTasks.length,
        today: todayTasks.length,
        week: weekTasks.length,
        overdue: overdueTasks.length,
        completed: completedTasks.length
      })
    } catch (err) {
      console.error('Failed to load task counts:', err)
    }
  }

  const handleAddTask = async (taskData) => {
    await taskService.create(taskData)
    setRefreshTrigger(prev => prev + 1)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleModalSave = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setSearchQuery('')
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query) {
      setActiveFilter('all')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header with stats */}
          <StatsHeader refreshTrigger={refreshTrigger} />

          {/* Quick add bar */}
          <QuickAddBar 
            onAddTask={handleAddTask}
            categories={categories}
          />

          {/* Filters and search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              taskCounts={taskCounts}
            />
            
            <div className="w-full lg:w-auto lg:min-w-[300px]">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search tasks..."
              />
            </div>
          </div>

          {/* Task list */}
          <TaskList
            filter={activeFilter}
            searchQuery={searchQuery}
            onEditTask={handleEditTask}
            refreshTrigger={refreshTrigger}
          />
        </motion.div>
      </div>

      {/* Task modal */}
      <TaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </div>
  )
}

export default TaskBoard