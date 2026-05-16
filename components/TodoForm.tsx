'use client'
import { useState, type FormEvent } from 'react'
import type { Priority } from '@/types/todo'

interface Props {
  onAdd: (data: { title: string; category: string; tags: string[]; deadline: string | null; priority: Priority }) => void
  categories: string[]
}

const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'high', label: '높음' },
  { value: 'medium', label: '보통' },
  { value: 'low', label: '낮음' },
]

const PRESET_CATEGORIES = ['개인', '공부', '건강', '쇼핑', '기타']
const PRESET_TAGS = ['중요', '긴급', '전화', '이메일', '집', '오늘', '이번주', '반복']

export default function TodoForm({ onAdd, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const toggleTag = (tag: string) =>
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      category: category || '일반',
      tags,
      deadline: deadline || null,
      priority,
    })
    setTitle('')
    setCategory('')
    setTags([])
    setDeadline('')
    setPriority('medium')
    setOpen(false)
  }

  const allCategories = Array.from(new Set([
    ...PRESET_CATEGORIES,
    ...categories.filter(c => c !== 'all' && !PRESET_CATEGORIES.includes(c)),
  ]))

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-700 px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:border-indigo-500 hover:text-indigo-400 active:border-indigo-600 active:text-indigo-500"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        새 할 일 추가
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-700 bg-neutral-900 p-4 shadow-sm">
      <input
        autoFocus
        type="text"
        placeholder="할 일을 입력하세요..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border-b border-neutral-700 pb-3 text-base font-medium text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-indigo-500 sm:text-sm bg-transparent"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="todo-category" className="mb-1 block text-xs font-medium text-neutral-500">카테고리</label>
          <select
            id="todo-category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
          >
            <option value="">선택...</option>
            {allCategories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">우선순위</label>
          <div className="grid grid-cols-3 gap-1">
            {PRIORITIES.map(p => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`min-h-10 rounded-xl border px-2 text-sm font-medium transition-colors ${
                  priority === p.value
                    ? p.value === 'high'
                      ? 'border-red-500 bg-red-500 text-white'
                      : p.value === 'medium'
                      ? 'border-amber-400 bg-amber-400 text-white'
                      : 'border-sky-500 bg-sky-500 text-white'
                    : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="todo-deadline" className="mb-1 block text-xs font-medium text-neutral-500">마감일</label>
        <input
          id="todo-deadline"
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-neutral-500">
          태그 <span className="text-neutral-600">(클릭으로 선택)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_TAGS.map(tag => {
            const selected = tags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selected
                    ? 'border-indigo-500 bg-indigo-600 text-white'
                    : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300'
                }`}
              >
                #{tag}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2 pt-1">
        <button
          type="submit"
          className="min-h-11 rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          추가
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="min-h-11 rounded-xl px-4 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
        >
          취소
        </button>
      </div>
    </form>
  )
}
