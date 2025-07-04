import tasksData from '@/services/mockData/tasks.json'

let tasks = [...tasksData]

export const taskService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...tasks]
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async getByCategory(categoryId) {
    await new Promise(resolve => setTimeout(resolve, 250))
    return tasks.filter(task => task.categoryId === categoryId).map(task => ({ ...task }))
  },

  async getTodayTasks() {
    await new Promise(resolve => setTimeout(resolve, 250))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return tasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate >= today && taskDate < tomorrow
    }).map(task => ({ ...task }))
  },

  async getWeekTasks() {
    await new Promise(resolve => setTimeout(resolve, 250))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() + 7)
    
    return tasks.filter(task => {
      if (!task.dueDate) return false
      const taskDate = new Date(task.dueDate)
      return taskDate >= today && taskDate < weekEnd
    }).map(task => ({ ...task }))
  },

  async getOverdueTasks() {
    await new Promise(resolve => setTimeout(resolve, 250))
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false
      const taskDate = new Date(task.dueDate)
      return taskDate < today
    }).map(task => ({ ...task }))
  },

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) return null
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    if (updates.completed !== undefined) {
      updatedTask.completedAt = updates.completed ? new Date().toISOString() : null
    }
    
    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const initialLength = tasks.length
    tasks = tasks.filter(task => task.Id !== parseInt(id))
    return tasks.length < initialLength
  },

  async toggleComplete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) return null
    
    const task = tasks[taskIndex]
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString()
    }
    
    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  },

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const searchTerm = query.toLowerCase()
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    ).map(task => ({ ...task }))
  }
}