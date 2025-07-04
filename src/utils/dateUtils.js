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

export const formatDateTimeForAPI = (dateValue) => {
  if (!dateValue) return null
  
  // If it's already a valid ISO string, return it
  if (typeof dateValue === 'string' && dateValue.includes('T')) {
    return new Date(dateValue).toISOString()
  }
  
  // If it's a date-only string (YYYY-MM-DD), add end of day time
  if (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(dateValue + 'T23:59:59.999Z').toISOString()
  }
  
  // If it's a Date object or timestamp, convert to ISO
  return new Date(dateValue).toISOString()
}