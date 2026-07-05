import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

function App() {
  const {
    todos, allTodosCount,
    addTodo, editTodo, deleteTodo, toggleTodo,
    filter, setFilter,
    searchQuery, setSearchQuery,
    sortOrder, setSortOrder
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 py-10 px-4 sm:px-6 flex items-start sm:items-center justify-center">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-white/20 backdrop-blur-xl">
        <div className="p-6 sm:p-10">
          <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Focus.</h1>
              <p className="text-slate-500 mt-2 font-medium">Organize your workflow effectively.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold text-indigo-700 bg-indigo-50 px-5 py-2.5 rounded-2xl shadow-sm border border-indigo-100/50">
                {allTodosCount} {allTodosCount === 1 ? 'Task' : 'Tasks'}
              </div>
            </div>
          </header>

          <main>
            <div className="mb-8">
              <TodoInput onAdd={addTodo} />
            </div>
            
            <div className="mb-6">
              <FilterBar
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
            
            <div className="bg-slate-50/50 rounded-3xl p-2 sm:p-6 border border-slate-100">
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
