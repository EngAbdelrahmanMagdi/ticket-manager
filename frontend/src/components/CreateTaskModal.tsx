'use client'
import {useState} from 'react'
import {useTranslations} from '@/hooks/useTranslations'
import {createTask} from '@/services/taskService'
import {CreateTaskModalProps, CreateTaskFormData } from '@/types/task'

export default function CreateTaskModal({ isOpen, onClose, onTaskCreated }: CreateTaskModalProps) {
  const { translate } = useTranslations()
  const [formData, setFormData] = useState<CreateTaskFormData>({
    title: '',
    description: '',
    status: 'Pending'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await createTask(formData)
      setFormData({ title: '', description: '', status: 'Pending' })
      onTaskCreated()
      onClose()
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({ general: 'Failed to create task. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreateTaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value as any }))
    if (errors[field]) { setErrors(prev => ({ ...prev, [field]: '' }))}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
                {translate('createTaskTitle')}
          </h2>
          <button onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('titleLabel')}
            </label>
            <input type="text" id="title" value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={translate('titlePlaceholder')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}/>
            {errors.title && ( <p className="mt-1 text-sm text-red-600">{errors.title}</p>)}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  {translate('description')}
            </label>
            <textarea id="description" value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={translate('descriptionPlaceholder')} rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}/>
            {errors.description && ( <p className="mt-1 text-sm text-red-600">{errors.description}</p>)}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              {translate('statusLabel')}
            </label>
            <select id="status" value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.status ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="Pending">{translate('pending')}</option>
              <option value="In Progress">{translate('inProgress')}</option>
              <option value="Done">{translate('done')}</option>
            </select>
            {errors.status && (<p className="mt-1 text-sm text-red-600">{errors.status}</p>)}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors cursor-pointer">
                {translate('cancel')}
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
              {isSubmitting ? 'Creating...' : translate('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
