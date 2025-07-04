export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent':
      return 'text-red-600'
    case 'high':
      return 'text-orange-600'
    case 'medium':
      return 'text-blue-600'
    case 'low':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
}

export const getPriorityBgColor = (priority) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800'
    case 'high':
      return 'bg-orange-100 text-orange-800'
    case 'medium':
      return 'bg-blue-100 text-blue-800'
    case 'low':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
  
  return [...tasks].sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 0
    const priorityB = priorityOrder[b.priority] || 0
    return priorityB - priorityA
  })
}

export const sortTasksByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
}

export const filterTasksByStatus = (tasks, status) => {
  switch (status) {
    case 'completed':
      return tasks.filter(task => task.completed)
    case 'pending':
      return tasks.filter(task => !task.completed)
    case 'overdue':
      return tasks.filter(task => {
        if (task.completed || !task.dueDate) return false
        return new Date(task.dueDate) < new Date()
      })
    default:
      return tasks
  }
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const overdue = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false
    return new Date(task.dueDate) < new Date()
  }).length
  
  return {
    total,
    completed,
    pending,
    overdue,
    completionRate: total > 0 ? (completed / total) * 100 : 0
  }
}