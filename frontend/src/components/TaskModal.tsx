import {useTranslations} from '@/hooks/useTranslations'
import {TaskModalProps} from '@/types/task'
import {getStatusColor, getProgressWidth, getProgressColor } from '@/utils/taskUtils'


export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const { translate } = useTranslations()
  if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                    {task.title}
              </h2>
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border-2 inline-block ${getStatusColor(task.status)}`}>
                    {task.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>


        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{translate('description')}</h3>
              <p className="text-gray-600 leading-relaxed">
                    {task.description}
              </p>
          </div>


          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{translate('progress')}</h3>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${getProgressColor(task.status)} ${getProgressWidth(task.status)}`}></div>
              </div>
            <p className="text-sm text-gray-500 mt-2">
              {task.status === 'Done' ? translate('taskCompleted') : task.status === 'In Progress' ? translate('taskInProgress') : 
                  translate('taskPending')}
            </p>
          </div>
        </div>


        <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer">
                  {translate('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
