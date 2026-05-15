'use client'
import type { FilterState, FilterStatus, Priority } from '@/types/todo'

interface Props {
  filter: FilterState
  onChange: (f: FilterState) => void
  categories: string[]
  total: number
  active: number
}

const STATUS_TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
]

const PRIORITY_OPTIONS: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

const SORT_OPTIONS = [
  { value: 'createdAt', label: '최신순' },
  { value: 'deadline', label: '마감일순' },
  { value: 'priority', label: '우선순위순' },
]

export default function TodoFilter({ filter, onChange, categories, total, active }: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filter, ...patch })

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-3 shadow-sm sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-3 rounded-xl bg-neutral-800 p-0.5">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => set({ status: tab.value })}
              className={`min-h-9 rounded-lg px-2 text-xs font-medium transition-colors ${
                filter.status === tab.value
                  ? 'bg-neutral-700 text-neutral-100 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-neutral-500">
          {active}개 진행 중 / {total}개 전체
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <select
          value={filter.category}
          onChange={e => set({ category: e.target.value })}
          className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? '모든 카테고리' : c}</option>
          ))}
        </select>

        <select
          value={filter.priority}
          onChange={e => set({ priority: e.target.value as Priority | 'all' })}
          className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
        >
          {PRIORITY_OPTIONS.map(p => (
            <option key={p.value} value={p.value}>{p.value === 'all' ? '모든 우선순위' : p.label}</option>
          ))}
        </select>

        <select
          value={filter.sortBy}
          onChange={e => set({ sortBy: e.target.value as FilterState['sortBy'] })}
          className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500 sm:w-auto"
        >
          {SORT_OPTIONS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
