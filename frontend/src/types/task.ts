export interface Task {
  id: string
  title: string
  description: string
  status: 'Pending' | 'In Progress' | 'Done'
  created_at: string
  updated_at: string
}

export interface TaskCardProps {
  task: Task
  onClick?: (task: Task) => void
}


export interface TaskModalProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}


export interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskCreated: () => void
}
 
export type CreateTaskFormData = {
  title: string
  description: string
  status: 'Pending' | 'In Progress' | 'Done'
}

export interface SuccessToastProps {
  message: string
  isVisible: boolean
  onHide: () => void
}
