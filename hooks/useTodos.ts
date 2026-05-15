'use client'
import { useState, useEffect } from 'react'
import type { Todo, FilterState, Priority, SortBy } from '@/types/todo'

const STORAGE_KEY = 'todos-v1'

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

function readStoredTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<FilterState>({
    status: 'all',
    category: 'all',
    priority: 'all',
    sortBy: 'createdAt',
  })

  useEffect(() => {
    const id = window.setTimeout(() => {
      setTodos(readStoredTodos())
      setLoaded(true)
    }, 0)

    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos, loaded])

  const addTodo = (data: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    const next: Todo = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos(prev => [next, ...prev])
  }

  const toggleTodo = (id: string) =>
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )

  const deleteTodo = (id: string) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  const categories = ['all', ...Array.from(new Set(todos.map(t => t.category).filter(Boolean)))]

  const filtered = todos
    .filter(t => {
      if (filter.status === 'active' && t.completed) return false
      if (filter.status === 'completed' && !t.completed) return false
      if (filter.category !== 'all' && t.category !== filter.category) return false
      if (filter.priority !== 'all' && t.priority !== filter.priority) return false
      return true
    })
    .sort((a, b) => {
      const by = filter.sortBy as SortBy
      if (by === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      if (by === 'deadline') {
        if (!a.deadline && !b.deadline) return 0
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return a.deadline.localeCompare(b.deadline)
      }
      return b.createdAt.localeCompare(a.createdAt)
    })

  return { todos: filtered, allTodos: todos, addTodo, toggleTodo, deleteTodo, loaded, filter, setFilter, categories }
}
