export type Priority = 'low' | 'medium' | 'high'
export type FilterStatus = 'all' | 'active' | 'completed'
export type SortBy = 'createdAt' | 'deadline' | 'priority'

export interface Todo {
  id: string
  title: string
  completed: boolean
  category: string
  tags: string[]
  deadline: string | null
  priority: Priority
  createdAt: string
}

export interface FilterState {
  status: FilterStatus
  category: string
  priority: Priority | 'all'
  sortBy: SortBy
}
