import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  // TODO: Use clsx or tailwind-merge if these class conditions get more complex
  const containerClass = `group flex flex-col sm:flex-row sm:items-center gap-3 p-5 bg-white rounded-2xl shadow-sm border border-slate-100/80 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-100 ${
    todo.completed ? 'opacity-60 bg-slate-50/50 grayscale-[0.2]' : ''
  }`;

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-4 w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-2 py-1 text-slate-700 border-b border-indigo-500 focus:outline-none bg-transparent"
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 text-slate-700 transition-all cursor-pointer select-none ${todo.completed ? 'line-through text-slate-400' : ''}`}
          >
            {todo.text}
          </span>
        )}

        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
