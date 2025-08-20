export interface Task {
  id: number
  title: string
  description: string
  status: 'Pending' | 'In Progress' | 'Done'
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