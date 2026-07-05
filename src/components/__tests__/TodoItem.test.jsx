import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../TodoItem';

const mockTodo = {
  id: '1',
  text: 'Test task',
  completed: false,
};

describe('TodoItem', () => {
  it('renders the task text correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    const handleToggle = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={handleToggle} onDelete={vi.fn()} onEdit={vi.fn()} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={handleDelete} onEdit={vi.fn()} />);
    
    const deleteButton = screen.getByTitle('Delete');
    fireEvent.click(deleteButton);
    
    expect(handleDelete).toHaveBeenCalledWith('1');
  });

  it('enters edit mode on double click', () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} onEdit={vi.fn()} />);
    
    const textElement = screen.getByText('Test task');
    fireEvent.doubleClick(textElement);
    
    const input = screen.getByDisplayValue('Test task');
    expect(input).toBeInTheDocument();
  });

  it('calls onEdit when saving changes', () => {
    const handleEdit = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} onEdit={handleEdit} />);
    
    // Enter edit mode
    const textElement = screen.getByText('Test task');
    fireEvent.doubleClick(textElement);
    
    // Change value
    const input = screen.getByDisplayValue('Test task');
    fireEvent.change(input, { target: { value: 'Updated task' } });
    
    // Press Enter to save
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(handleEdit).toHaveBeenCalledWith('1', 'Updated task');
  });
});
