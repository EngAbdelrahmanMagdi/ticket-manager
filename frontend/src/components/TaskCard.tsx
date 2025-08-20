import { TaskCardProps } from '@/types/task'

export default function TaskCard({ task }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight pr-3">
            {task.title}
          </h3>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 flex-shrink-0 ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {task.description}
        </p>
      </div>
      
      <div className="px-6 pb-4 mt-auto">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-500 ${
            task.status === 'Done' ? 'bg-emerald-500 w-full' :
            task.status === 'In Progress' ? 'bg-blue-500 w-2/3' :
            'bg-amber-500 w-1/3'
          }`}></div>
        </div>
      </div>
    </div>
  )
}
