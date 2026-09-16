import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ApplicationFilters from './ApplicationFilters';

describe('ApplicationFilters - Debounce Regression Test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces onFiltersChange calls when typing in search input', () => {
    const handleFiltersChange = vi.fn();

    render(
      <ApplicationFilters
        filters={{
          search: '',
          status: 'ALL',
          sortBy: 'date',
          sortOrder: 'desc',
        }}
        onFiltersChange={handleFiltersChange}
      />
    );

    // Locate input by accessible placeholder or label text
    const searchInput = screen.getByPlaceholderText(/search/i);

    // Simulate user typing
    fireEvent.change(searchInput, { target: { value: 'Google' } });

    // 1. Assert onFiltersChange was NOT called immediately
    expect(handleFiltersChange).not.toHaveBeenCalled();

    // 2. Advance timers past your debounce delay (e.g., 300ms or 500ms)
    vi.advanceTimersByTime(500);

    // 3. Assert onFiltersChange was called exactly once with updated search value
    expect(handleFiltersChange).toHaveBeenCalledTimes(1);
    expect(handleFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'Google' })
    );
  });
});
