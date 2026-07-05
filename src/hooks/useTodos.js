import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage('intern_todos', []);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(), // TODO: add fallback for older browsers?
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText.trim() } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };
  
  const filteredTodos = useMemo(() => {
    let result = todos;
    
    if (filter === 'Completed') result = result.filter(t => t.completed);
    if (filter === 'Pending') result = result.filter(t => !t.completed);
    
    if (searchQuery.trim()) {
      result = result.filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    result.sort((a, b) => {
       if (sortOrder === 'Newest') return b.createdAt - a.createdAt;
       if (sortOrder === 'Oldest') return a.createdAt - b.createdAt;
       return 0;
    });

    return result;
  }, [todos, filter, searchQuery, sortOrder]);

  return {
    todos: filteredTodos,
    allTodosCount: todos.length,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
    filter, setFilter,
    searchQuery, setSearchQuery,
    sortOrder, setSortOrder
  };
}
