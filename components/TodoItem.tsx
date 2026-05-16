'use client'
import type { Todo, Priority } from '@/types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const PRIORITY_BORDER: Record<Priority, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-amber-400',
  low: 'border-l-sky-400',
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
}

const PRIORITY_BADGE: Record<Priority, string> = {
  high: 'bg-red-900/40 text-red-400',
  medium: 'bg-amber-900/40 text-amber-400',
  low: 'bg-sky-900/40 text-sky-400',
}

function isOverdue(deadline: string | null): boolean {
  if (!deadline) return false
  const [year, month, day] = deadline.split('-').map(Number)
  const today = new Date()
  const deadlineDate = new Date(year, month - 1, day)
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return deadlineDate < todayDate
}

function formatDeadline(deadline: string): string {
  const [, month, day] = deadline.split('-')
  return `${Number(month)}/${Number(day)}`
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const overdue = !todo.completed && isOverdue(todo.deadline)

  return (
    <div
      className={`group flex items-start gap-3 rounded-2xl border-b border-r border-t border-neutral-800 border-l-4 bg-neutral-900 px-3 py-3 shadow-sm transition-shadow hover:shadow-md sm:px-4 ${PRIORITY_BORDER[todo.priority]} ${todo.completed ? 'opacity-50' : ''}`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-6 sm:w-6 ${
          todo.completed
            ? 'border-indigo-500 bg-indigo-500'
            : 'border-neutral-600 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? '완료 해제' : '완료 처리'}
      >
        {todo.completed && (
          <svg className="h-4 w-4 text-white sm:h-3 sm:w-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className={`break-words text-sm font-medium leading-snug ${todo.completed ? 'text-neutral-600 line-through' : 'text-neutral-100'}`}>
          {todo.title}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {todo.category && (
            <span className="max-w-full truncate rounded-full bg-violet-900/40 px-2 py-0.5 text-xs font-medium text-violet-400">
              {todo.category}
            </span>
          )}

          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE[todo.priority]}`}>
            {PRIORITY_LABEL[todo.priority]}
          </span>

          {todo.deadline && (
            <span className={`flex items-center gap-1 text-xs font-medium ${overdue ? 'text-red-400' : 'text-neutral-500'}`}>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="3" width="12" height="11" rx="2" />
                <path strokeLinecap="round" d="M5 1v3M11 1v3M2 7h12" />
              </svg>
              {formatDeadline(todo.deadline)}
              {overdue && ' 지남'}
            </span>
          )}

          {todo.tags.map(tag => (
            <span key={tag} className="max-w-full truncate text-xs text-indigo-400">#{tag}</span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-all hover:bg-red-900/40 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="삭제"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  )
}
