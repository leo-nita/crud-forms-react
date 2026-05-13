import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AddNewProject from './AddNewProject';
const mockOnSave = vi.fn();
const mockOnCancel = vi.fn();
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});
describe('AddNewProject Component', () => {
  it('calls onSaveHandle with input values when Save is clicked', () => {
    // 1. Arrange: Create mock functions

    render(
      <AddNewProject
        onSaveHandle={mockOnSave}
        handleOnCancelProject={mockOnCancel}
      />,
    );
    // 2. Act: Simulate user typing
    fireEvent.change(screen.getByTestId('Title'), {
      target: { value: 'New Project' },
    });
    fireEvent.change(screen.getByTestId('Description'), {
      target: { value: 'Some description' },
    });
    fireEvent.change(screen.getByTestId('Due date'), {
      target: { value: '2026-05-20' },
    });

    // Click save
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // 3. Assert: Check if the function was called with expected data
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Project',
        description: 'Some description',
        dueDate: '2026-05-20',
      }),
    );
  });
  it('shows modal when inputs are empty', () => {
    const mockOnSave = vi.fn();
    const mockOnCancel = vi.fn();

    render(
      <AddNewProject
        onSaveHandle={mockOnSave}
        handleOnCancelProject={mockOnCancel}
      />,
    );

    // Click save without filling inputs
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Modal should appear
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();

    // Save should NOT be called
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
