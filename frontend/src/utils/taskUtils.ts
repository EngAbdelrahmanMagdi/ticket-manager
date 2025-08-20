export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'In Progress':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200'
  }
}


export const getProgressWidth = (status: string) => {
  switch (status) {
    case 'Done':
        return 'w-full'
    case 'In Progress':
        return 'w-2/3'
    default:
        return 'w-1/3'
  }
}


export const getProgressColor = (status: string) => {
  switch (status) {
    case 'Done':
        return 'bg-emerald-500'
    case 'In Progress':
        return 'bg-blue-500'
    default:
        return 'bg-amber-500'
  }
}
