import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows EmptyList on initial render', () => {
    render(<App />);
    expect(screen.getByText(/No projects selected/i)).toBeInTheDocument();
  });
  it('shows  Add new Project if we click on add button', () => {
    render(<App />);
    const addANewProjectButton = screen.getByRole('button', {
      name: /Create new project/i,
    });
    fireEvent.click(addANewProjectButton);
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
  it('adds a new project and displays it in sidebar', () => {
    render(<App />);

    // 1. open form
    fireEvent.click(
      screen.getByRole('button', { name: /create new project/i }),
    );

    // 2. fill form (IMPORTANT: App-level test still interacts with DOM)
    fireEvent.change(screen.getByTestId('Title'), {
      target: { value: 'My Project' },
    });

    fireEvent.change(screen.getByTestId('Description'), {
      target: { value: 'My Description' },
    });

    fireEvent.change(screen.getByTestId(/due date/i), {
      target: { value: '2026-01-01' },
    });

    // 3. save
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // 4. assert result in App UI (Sidebar)
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });
});
