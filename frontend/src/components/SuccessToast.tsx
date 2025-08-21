'use client'
import {useState, useEffect} from 'react'
import {SuccessToastProps} from '@/types/task'

export default function SuccessToast({ message, isVisible, onHide }: SuccessToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(onHide, 300)
      },2000)
      return ()=> clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isAnimating ? 'translate-x-0 opacity-100': 'translate-x-full opacity-0'}`}>
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <svg className="w-5 h-5 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}
