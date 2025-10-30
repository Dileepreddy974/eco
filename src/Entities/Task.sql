  "name": "Task",
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "ID of the student who completed the task"
    },
    "task_type": {
      "type": "string",
      "enum": [
        "cleanup",
        "planting",
        "recycling",
        "water_saving",
        "energy_saving"
      ],
      "description": "Type of eco-task"
    },
    "task_title": {
      "type": "string",
      "description": "Title of the specific task"
    },
    "description": {
      "type": "string",
      "description": "What the student did"
    },
    "photo_url": {
      "type": "string",
      "description": "URL of uploaded verification photo"
    },
    "verification_status": {
      "type": "string",
      "enum": [
        "pending",
        "verified",
        "rejected"
      ],
      "default": "pending",
      "description": "AI verification status"
    },
    "stars_earned": {
      "type": "number",
      "default": 0,
      "description": "Stars awarded for this task"
    },
    "verification_details": {
      "type": "string",
      "description": "AI verification feedback"
    }
  },
  "required": [
    "user_id",
    "task_type",
    "task_title",
    "photo_url"
  ]
}