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

export default function TodoForm({ onAdd, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) setTags(prev => [...prev, trimmed])
    setTagInput('')
  }

  const removeTag = (tag: string) => setTags(prev => prev.filter(t => t !== tag))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const resolvedCategory = newCategory.trim() || category || '일반'
    onAdd({
      title: title.trim(),
      category: resolvedCategory,
      tags,
      deadline: deadline || null,
      priority,
    })
    setTitle('')
    setCategory('')
    setNewCategory('')
    setTagInput('')
    setTags([])
    setDeadline('')
    setPriority('medium')
    setOpen(false)
  }

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
          <label className="mb-1 block text-xs font-medium text-neutral-500">카테고리</label>
          {categories.filter(c => c !== 'all').length > 0 ? (
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
            >
              <option value="">직접 입력...</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : null}
          {!category && (
            <input
              type="text"
              placeholder="예: 개인, 업무"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="mt-2 min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none placeholder:text-neutral-600 focus:border-indigo-500"
            />
          )}
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">마감일</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="min-h-10 w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-neutral-500">태그</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
              className="min-h-10 min-w-0 flex-1 rounded-xl border border-neutral-700 bg-neutral-800 px-3 text-sm text-neutral-300 outline-none placeholder:text-neutral-600 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-400 transition-colors hover:bg-neutral-700"
              aria-label="태그 추가"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 rounded-full bg-indigo-900/50 px-2.5 py-1 text-xs text-indigo-400">
              #{tag}
              <button type="button" onClick={() => removeTag(tag)} className="rounded-full p-0.5 hover:text-indigo-200" aria-label={`${tag} 태그 삭제`}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

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
