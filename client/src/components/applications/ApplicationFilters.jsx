import { useState } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Wishlist', value: 'Wishlist' },
  { label: 'Applied', value: 'Applied' },
  { label: 'Screening', value: 'Screening' },
  { label: 'Interview', value: 'Interview' },
  { label: 'Offer', value: 'Offer' },
  { label: 'Rejected', value: 'Rejected' },
];

const SORT_OPTIONS = [
  { label: 'Date (Newest)', value: 'date_desc' },
  { label: 'Date (Oldest)', value: 'date_asc' },
  { label: 'Company (A-Z)', value: 'company_asc' },
  { label: 'Company (Z-A)', value: 'company_desc' },
];

export default function ApplicationFilters({
  filters = {
    search: '',
    status: undefined,
    sortBy: 'date',
    sortOrder: 'desc',
  },
  onFiltersChange,
}) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [prevFilterSearch, setPrevFilterSearch] = useState(filters.search);

  if (filters.search !== prevFilterSearch) {
    setPrevFilterSearch(filters.search);
    setSearchTerm(filters.search || '');
  }

  const handleStatusChange = (value) => {
    onFiltersChange({
      ...filters,
      status: value === 'ALL' ? undefined : value,
    });
  };

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split('_');
    onFiltersChange({
      ...filters,
      sortBy,
      sortOrder,
    });
  };

  const currentSortValue = `${filters.sortBy || 'date'}_${filters.sortOrder || 'desc'}`;
  const currentStatusValue = filters.status || 'ALL';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
      {/* Search Input with Positioned Icon */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search by company or job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-8"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Status Dropdown */}
        <Select value={currentStatusValue} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <div className="flex items-center gap-2 truncate">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Dropdown */}
        <Select value={currentSortValue} onValueChange={handleSortChange}>
          <SelectTrigger className="w-42.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
