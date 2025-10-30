// Real API client for Friendly Eco backend
const API_BASE_URL = 'http://localhost:5000/api';

const base44 = {
  auth: {
    me: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/me`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    },
    updateMe: async (data) => {
      const response = await fetch(`${API_BASE_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      return response.json();
    }
  },
  entities: {
    Task: {
      filter: async (filter, sort, limit) => {
        const params = new URLSearchParams();
        if (filter && filter.user_id) params.append('user_id', filter.user_id);
        if (limit) params.append('limit', limit);
        
        const response = await fetch(`${API_BASE_URL}/tasks?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      },
      create: async (data) => {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to create task');
        }
        return response.json();
      }
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        return response.json();
      },
      InvokeLLM: async ({ prompt, file_urls, response_json_schema }) => {
        const response = await fetch(`${API_BASE_URL}/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt, file_urls }),
        });
        if (!response.ok) {
          throw new Error('Failed to verify task');
        }
        return response.json();
      }
    }
  }
};

// Add the missing functions for Tasks.jsx
const User = base44.auth;
const Task = base44.entities.Task;
const UploadFile = base44.integrations.Core.UploadFile;
const InvokeLLM = base44.integrations.Core.InvokeLLM;

export { base44, User, Task, UploadFile, InvokeLLM };