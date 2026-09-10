import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Building2, Calendar, MapPin, ExternalLink, Edit } from 'lucide-react';

const STATUS_BADGE_STYLES = {
  Wishlist: 'bg-slate-100 text-slate-800 border-slate-200',
  Applied: 'bg-blue-100 text-blue-800 border-blue-200',
  Screening: 'bg-purple-100 text-purple-800 border-purple-200',
  Interview: 'bg-amber-100 text-amber-800 border-amber-200',
  Offer: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Rejected: 'bg-rose-100 text-rose-800 border-rose-200',
};

const ApplicationCard = ({ application, onEdit }) => {
  if (!application) return null;

  const formattedDate = application.applicationDate
    ? new Date(application.applicationDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <Card className="hover:shadow-md transition-shadow bg-white border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-slate-900 line-clamp-1">
              {application.jobTitle || application.position}
            </CardTitle>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="line-clamp-1">
                {application.companyName || application.company}
              </span>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`shrink-0 font-medium ${
              STATUS_BADGE_STYLES[application.status] ||
              STATUS_BADGE_STYLES.Wishlist
            }`}
          >
            {application.status || 'Wishlist'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-0 text-xs text-slate-500 space-y-2">
        {application.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{application.location}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Applied {formattedDate}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 flex items-center justify-between border-t border-slate-100 mt-3">
        {onEdit ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(application)}
            className="h-8 text-xs text-slate-600 hover:text-slate-900 px-2"
          >
            <Edit className="w-3.5 h-3.5 mr-1" /> Edit
          </Button>
        ) : (
          <div />
        )}

        <Link
          to={`/applications/${application._id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          View Details
          <ExternalLink className="w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
