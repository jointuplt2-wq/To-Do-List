'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Todo } from '@/types/todo'

const NOTIFIED_KEY = 'todo-notified-date'

export function useNotifications(todos: Todo[], loaded: boolean) {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied' as NotificationPermission
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  useEffect(() => {
    if (!loaded || permission !== 'granted' || todos.length === 0) return

    const today = new Date().toISOString().slice(0, 10)
    const lastNotified = localStorage.getItem(NOTIFIED_KEY)
    if (lastNotified === today) return

    const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10)
    const active = todos.filter(t => !t.completed)

    const todayItems = active.filter(t => t.deadline === today)
    const tomorrowItems = active.filter(t => t.deadline === tomorrow)

    if (todayItems.length > 0) {
      new Notification(`오늘 마감 할 일 ${todayItems.length}개`, {
        body: todayItems.map(t => `• ${t.title}`).join('\n'),
        icon: '/icon-192.png',
      })
    }
    if (tomorrowItems.length > 0) {
      new Notification(`내일 마감 할 일 ${tomorrowItems.length}개`, {
        body: tomorrowItems.map(t => `• ${t.title}`).join('\n'),
        icon: '/icon-192.png',
      })
    }

    if (todayItems.length > 0 || tomorrowItems.length > 0) {
      localStorage.setItem(NOTIFIED_KEY, today)
    }
  }, [loaded, permission, todos])

  return { permission, requestPermission }
}
