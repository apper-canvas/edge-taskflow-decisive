import { toast } from 'react-toastify'

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        toast.error("Failed to load tasks");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await apperClient.getRecordById('task', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async getTodayTasks() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "dueDate",
            Operator: "RelativeMatch",
            Values: ["Today"]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching today's tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching today's tasks:", error.message);
      }
      return [];
    }
  },

  async getWeekTasks() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "dueDate",
            Operator: "RelativeMatch",
            Values: ["this week"]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching week tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching week tasks:", error.message);
      }
      return [];
    }
  },

  async getOverdueTasks() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
conditions: [
                  {
                    fieldName: "dueDate",
                    operator: "LessThan",
                    values: [new Date().toISOString()]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "completed",
                    operator: "EqualTo",
                    values: [false]
                  }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching overdue tasks:", error?.response?.data?.message);
      } else {
        console.error("Error fetching overdue tasks:", error.message);
      }
      return [];
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const updateableData = {
        Name: taskData.title || taskData.Name,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        completed: false,
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categoryId: parseInt(taskData.categoryId) || null,
        Tags: taskData.Tags || ""
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
        toast.error("Failed to create task");
      }
      return null;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const updateableData = {
        Id: parseInt(id),
        ...(updates.title !== undefined && { Name: updates.title, title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.priority !== undefined && { priority: updates.priority }),
        ...(updates.dueDate !== undefined && { dueDate: updates.dueDate }),
        ...(updates.completed !== undefined && { 
          completed: updates.completed,
          completedAt: updates.completed ? new Date().toISOString() : null
        }),
        ...(updates.categoryId !== undefined && { categoryId: parseInt(updates.categoryId) }),
        ...(updates.Tags !== undefined && { Tags: updates.Tags }),
        updatedAt: new Date().toISOString()
      };
      
      const params = {
        records: [updateableData]
      };
      
      const response = await apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
        toast.error("Failed to update task");
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
        toast.error("Failed to delete task");
      }
      return false;
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task
      const task = await this.getById(id);
      if (!task) return null;
      
      // Update with toggled completion status
      return await this.update(id, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error toggling task completion:", error.message);
        toast.error("Failed to update task");
      }
      return null;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "completed" } },
          { field: { Name: "completedAt" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "Tags" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error("Error searching tasks:", error.message);
      }
      return [];
    }
  }
}