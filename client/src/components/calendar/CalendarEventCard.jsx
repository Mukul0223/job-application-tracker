import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

export const CalendarEventCard = ({ interview }) => {
  const { scheduledAt, type, applicationId } = interview;

  // Extract application sub-document fields safely
  const companyName = applicationId?.companyName || 'Unknown Application';
  const applicationIdStr =
    typeof applicationId === 'object' ? applicationId?._id : applicationId;

  const formattedTime = scheduledAt
    ? format(new Date(scheduledAt), 'h:mm a')
    : '';

  return (
    <Link
      to={applicationIdStr ? `/applications/${applicationIdStr}` : '#'}
      className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    >
      <div className="bg-card hover:bg-accent/60 border border-border/80 rounded-lg p-3 shadow-sm transition-colors duration-150 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="text-[11px] px-2.5 py-1 font-medium capitalize truncate max-w-30 shrink-0"
          >
            {type || 'Interview'}
          </Badge>
          <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
            {formattedTime}
          </span>
        </div>

        <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors px-0.5 pt-0.5">
          {companyName}
        </div>
      </div>
    </Link>
  );
};

export default CalendarEventCard;
