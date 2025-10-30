// Real entities for Friendly Eco backend
import { base44 } from "../api/base44Client";

const User = {
  me: async () => {
    return await base44.auth.me();
  },
  list: async () => {
    const response = await fetch('http://localhost:5000/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },
  updateMyUserData: async (data) => {
    return await base44.auth.updateMe(data);
  }
};

const Task = {
  create: async (data) => {
    return await base44.entities.Task.create(data);
  }
};

export { User, Task };