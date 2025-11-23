import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 的 className
 * @param inputs - 需要合并的 className
 * @returns 合并后的 className
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
