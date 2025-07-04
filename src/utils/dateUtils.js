import { format, isToday, isTomorrow, isYesterday, isPast, isFuture, startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) return 'Today'
  if (isTomorrow(dateObj)) return 'Tomorrow'
  if (isYesterday(dateObj)) return 'Yesterday'
  
  return format(dateObj, 'MMM d')
}

export const getDueDateStatus = (date) => {
  if (!date) return 'none'
  
  const dateObj = new Date(date)
  const now = new Date()
  
  if (isPast(dateObj) && !isToday(dateObj)) return 'overdue'
  if (isToday(dateObj)) return 'today'
  if (isTomorrow(dateObj)) return 'tomorrow'
  if (isFuture(dateObj)) return 'future'
  
  return 'none'
}

export const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false
  
  const dateObj = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return dateObj >= start && dateObj <= end
}

export const getDateRangeForView = (view) => {
  const now = new Date()
  
  switch (view) {
    case 'today':
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      }
    case 'week':
      return {
        start: startOfWeek(now),
        end: endOfWeek(now)
      }
    default:
      return null
  }
}