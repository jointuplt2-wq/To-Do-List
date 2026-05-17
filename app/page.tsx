'use client'
import { useTodos } from '@/hooks/useTodos'
import { useNotifications } from '@/hooks/useNotifications'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
import TodoFilter from '@/components/TodoFilter'
import ReflectionSection from '@/components/ReflectionSection'

export default function Home() {
  const { todos, allTodos, addTodo, toggleTodo, deleteTodo, loaded, filter, setFilter, categories } = useTodos()
  const { permission, requestPermission } = useNotifications(allTodos, loaded)

  const activeCount = allTodos.filter(t => !t.completed).length

  const handleBell = async () => {
    if (permission === 'granted') return
    if (permission === 'denied') {
      alert('브라우저에서 알림이 차단되어 있습니다.\nChrome 주소창 왼쪽 자물쇠 아이콘 → 알림 → 허용으로 변경해 주세요.')
      return
    }
    await requestPermission()
  }

  return (
    <main className="min-h-dvh" style={{ background: 'var(--background)' }}>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-8 pt-5 sm:px-6 sm:py-10">
        <header className="mb-5 flex items-center gap-3 sm:mb-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-sm">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 12h10M5 17h6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m16 16 2 2 4-5" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">My To-Do List</h1>
            <p className="mt-0.5 text-sm text-slate-400">오늘 할 일을 빠르게 정리하세요.</p>
          </div>
          <button
            onClick={handleBell}
            title={permission === 'granted' ? '알림 켜짐' : permission === 'denied' ? '알림 차단됨 (클릭하여 해제 방법 보기)' : '알림 켜기'}
            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              permission === 'granted'
                ? 'border-indigo-500 bg-indigo-600 text-white'
                : permission === 'denied'
                ? 'border-slate-700 bg-slate-800 text-slate-600'
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-indigo-500 hover:text-indigo-400'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {permission === 'granted' && (
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-indigo-400" />
            )}
            {permission === 'denied' && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-slate-700 text-[8px] text-slate-400">✕</span>
            )}
          </button>
        </header>

        <div className="flex-1 space-y-4">
          <TodoForm onAdd={addTodo} categories={categories} />

          {loaded && allTodos.length > 0 && (
            <TodoFilter
              filter={filter}
              onChange={setFilter}
              categories={categories}
              total={allTodos.length}
              active={activeCount}
            />
          )}

          {!loaded && (
            <div className="flex justify-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-700 border-t-indigo-400" />
            </div>
          )}

          {loaded && todos.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-4 py-14 text-center text-slate-500">
              <svg className="mx-auto mb-3 h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z" />
              </svg>
              <p className="text-sm">
                {allTodos.length === 0 ? '첫 할 일을 추가해 보세요.' : '조건에 맞는 할 일이 없습니다.'}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>

          <ReflectionSection />
        </div>
      </div>
    </main>
  )
}
