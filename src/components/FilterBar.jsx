export default function FilterBar({ 
  filter, setFilter, 
  searchQuery, setSearchQuery,
  sortOrder, setSortOrder
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-slate-100/80">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-700 w-full"
      />
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
        <div className="flex w-full sm:w-auto bg-slate-100 p-1 rounded-lg">
          {['All', 'Pending', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <select 
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 bg-slate-100 border-none rounded-lg text-sm text-slate-600 font-medium focus:ring-2 focus:ring-indigo-500 cursor-pointer outline-none"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
