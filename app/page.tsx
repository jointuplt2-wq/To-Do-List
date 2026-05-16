'use client'
import { useTodos } from '@/hooks/useTodos'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
import TodoFilter from '@/components/TodoFilter'

export default function Home() {
  const { todos, allTodos, addTodo, toggleTodo, deleteTodo, loaded, filter, setFilter, categories } = useTodos()

  const activeCount = allTodos.filter(t => !t.completed).length

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
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">My To-Do List</h1>
            <p className="mt-0.5 text-sm text-slate-400">오늘 할 일을 빠르게 정리하세요.</p>
          </div>
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
        </div>
      </div>
    </main>
  )
}
