import en from '@/locales/en.json'

export const useTranslations = () => {
  const translate = (key: keyof typeof en): string => {
    return en[key]
  }
  
  return { translate }
}
