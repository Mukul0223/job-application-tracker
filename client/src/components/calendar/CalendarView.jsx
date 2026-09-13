import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { Button } from '../ui/button';
import { CalendarEventCard } from './CalendarEventCard';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView = ({ interviews = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div className="flex flex-col gap-6 p-4! sm:p-6 bg-background rounded-xl border border-border shadow-xs">
      {/* Header Controls */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePrevMonth}
            className="px-4! py-2.5 h-10 text-sm font-medium transition-colors"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentMonth(new Date())}
            className="px-4! py-2.5 h-10 text-sm font-medium transition-colors hidden sm:inline-flex"
          >
            Today
          </Button>
          <Button
            variant="outline"
            onClick={handleNextMonth}
            className="px-4! py-2.5 h-10 text-sm font-medium transition-colors"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex flex-col gap-3">
        {/* Day-of-week Headers */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center pb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 7-Column Day Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 auto-rows-fr">
          {days.map((day) => {
            const dayInterviews = interviews.filter((interview) =>
              interview.scheduledAt
                ? isSameDay(new Date(interview.scheduledAt), day)
                : false
            );

            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-30 sm:min-h-35 rounded-xl border p-3! flex flex-col gap-2 transition-colors ${
                  isCurrentMonth
                    ? 'bg-card border-border/80 text-card-foreground'
                    : 'bg-muted/20 border-border/40 text-muted-foreground/40 opacity-50'
                } ${isDayToday ? 'ring-2 ring-primary border-transparent bg-primary/5' : ''}`}
              >
                {/* Cell Day Number Header */}
                <div className="flex items-center justify-between pb-1">
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      isDayToday
                        ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs'
                        : isCurrentMonth
                          ? 'text-foreground'
                          : 'text-muted-foreground/50'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>

                {/* Daily Event Cards */}
                <div className="flex flex-col gap-2 overflow-y-auto max-h-45 pr-0.5">
                  {dayInterviews.map((interview) => (
                    <CalendarEventCard
                      key={interview._id}
                      interview={interview}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
