import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoInput from '../TodoInput';

describe('TodoInput', () => {
  it('renders correctly', () => {
    render(<TodoInput onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAdd when submitting a valid task', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByRole('button', { name: /add/i });
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);
    
    expect(handleAdd).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
  });

  it('shows error when submitting empty task', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);
    
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);
    
    expect(handleAdd).not.toHaveBeenCalled();
    expect(screen.getByText('Task cannot be empty.')).toBeInTheDocument();
  });

  it('shows error when submitting a task that is too long', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByRole('button', { name: /add/i });
    
    const longTask = 'a'.repeat(151);
    fireEvent.change(input, { target: { value: longTask } });
    fireEvent.click(button);
    
    expect(handleAdd).not.toHaveBeenCalled();
    expect(screen.getByText(/Task is too long/i)).toBeInTheDocument();
  });
});
