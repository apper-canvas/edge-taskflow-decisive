import categoriesData from '@/services/mockData/categories.json'

let categories = [...categoriesData]

export const categoryService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return [...categories].sort((a, b) => a.position - b.position)
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 150))
    const category = categories.find(cat => cat.Id === parseInt(id))
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      ...categoryData,
      taskCount: 0,
      position: categories.length + 1
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 250))
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) return null
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...updates
    }
    
    categories[categoryIndex] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const initialLength = categories.length
    categories = categories.filter(cat => cat.Id !== parseInt(id))
    return categories.length < initialLength
  },

  async updateTaskCount(categoryId, count) {
    await new Promise(resolve => setTimeout(resolve, 100))
    const categoryIndex = categories.findIndex(cat => cat.Id === parseInt(categoryId))
    if (categoryIndex === -1) return null
    
    categories[categoryIndex].taskCount = count
    return { ...categories[categoryIndex] }
  }
}