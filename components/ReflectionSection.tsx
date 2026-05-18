'use client'
import { useState, useEffect, useRef } from 'react'

const STORAGE_KEY = 'todo-reflection'

export default function ReflectionSection() {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(true)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setText(stored)
  }, [])

  const handleChange = (value: string) => {
    setText(value)
    setSaved(false)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, value)
      setSaved(true)
    }, 800)
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5L16.862 4.487Z" />
          </svg>
          <h2 className="text-sm font-semibold text-slate-300">오늘의 반성</h2>
        </div>
        <span className={`text-xs transition-colors ${saved ? 'text-slate-600' : 'text-indigo-400'}`}>
          {saved ? '저장됨' : '저장 중...'}
        </span>
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder="오늘 하루를 돌아보며 느낀 점을 적어보세요."
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
      />
    </section>
  )
}
