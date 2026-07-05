import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTodos } from '../useTodos';

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => Math.random().toString(36).substring(7),
});

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    clear: vi.fn(() => { store = {}; })
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty todos', () => {
    const { result } = renderHook(() => useTodos());
    
    expect(result.current.todos).toEqual([]);
    expect(result.current.allTodosCount).toBe(0);
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Learn React');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Learn React');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should toggle a todo completion status', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Test Toggle');
    });
    
    const todoId = result.current.todos[0].id;
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    expect(result.current.todos[0].completed).toBe(true);
    
    act(() => {
      result.current.toggleTodo(todoId);
    });
    
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Task 1');
      result.current.addTodo('Task 2');
    });
    
    expect(result.current.todos).toHaveLength(2);
    const idToDelete = result.current.todos[0].id;
    
    act(() => {
      result.current.deleteTodo(idToDelete);
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Task 2');
  });

  it('should filter correctly', () => {
    const { result } = renderHook(() => useTodos());
    
    act(() => {
      result.current.addTodo('Task 1');
      result.current.addTodo('Task 2');
    });
    
    const todo1Id = result.current.todos[1].id; // "Task 1" because sorting is "Newest" default
    
    act(() => {
      result.current.toggleTodo(todo1Id);
      result.current.setFilter('Completed');
    });
    
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].completed).toBe(true);
  });
});
