import { describe, it, expect } from 'vitest';
import { buildSortQuery } from '../utils/sortHelper.js';

describe('buildSortQuery', () => {
  it('handles ("date", "asc")', () => {
    expect(buildSortQuery('date', 'asc')).toEqual({ applicationDate: 1 });
  });

  it('handles ("date", "desc")', () => {
    expect(buildSortQuery('date', 'desc')).toEqual({ applicationDate: -1 });
  });

  it('handles ("company", "asc")', () => {
    expect(buildSortQuery('company', 'asc')).toEqual({ companyName: 1 });
  });

  it('falls back to default field for unrecognized sortBy without crashing', () => {
    expect(buildSortQuery('invalid_field', 'asc')).toEqual({
      applicationDate: 1,
    });
    expect(buildSortQuery(null, 'desc')).toEqual({ applicationDate: -1 });
  });
});
