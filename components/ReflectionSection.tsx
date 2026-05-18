'use client'
import { useState, useEffect, useRef } from 'react'

const toKey = (date: Date) => `todo-reflection-${date.toLocaleDateString('sv')}`

const addDays = (date: Date, days: number) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toLocaleDateString('sv') === today.toLocaleDateString('sv')
}

export default function ReflectionSection() {
  const [date, setDate] = useState(new Date())
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(true)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(toKey(date))
    setText(stored ?? '')
    setSaved(true)
  }, [date])

  const handleChange = (value: string) => {
    setText(value)
    setSaved(false)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(toKey(date), value)
      setSaved(true)
    }, 800)
  }

  const today = isToday(date)
  const label = today
    ? `오늘 ${date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}`
    : date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5L16.862 4.487Z" />
          </svg>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDate(prev => addDays(prev, -1))}
              className="rounded-lg p-0.5 text-slate-500 transition-colors hover:text-slate-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="min-w-[120px] text-center text-sm font-semibold text-slate-300">{label}</span>
            <button
              onClick={() => setDate(prev => addDays(prev, 1))}
              disabled={today}
              className="rounded-lg p-0.5 text-slate-500 transition-colors hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <span className={`text-xs transition-colors ${saved ? 'text-slate-600' : 'text-indigo-400'}`}>
          {saved ? '저장됨' : '저장 중...'}
        </span>
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder={today ? '오늘 하루를 돌아보며 느낀 점을 적어보세요.' : '이 날의 기록이 없습니다.'}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
      />
    </section>
  )
}
