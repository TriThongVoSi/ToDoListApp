import { useState } from 'react';

// FIXME: Move this to a constant file later if it gets reused
const MAX_TASK_LENGTH = 150;

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Task cannot be empty.');
      return;
    }
    
    if (trimmed.length > MAX_TASK_LENGTH) {
      setError(`Task is too long (max ${MAX_TASK_LENGTH} characters).`);
      return;
    }
    
    onAdd(trimmed);
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm focus-within:shadow-md focus-within:border-indigo-100 transition-all">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2 ml-1 animate-pulse">{error}</p>}
    </form>
  );
}
