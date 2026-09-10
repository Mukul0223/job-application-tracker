import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, ExternalLink } from 'lucide-react';

const STATUS_BADGE_STYLES = {
  Wishlist: 'bg-slate-100 text-slate-700 border-slate-200',
  Applied: 'bg-blue-50 text-blue-700 border-blue-200',
  Screening: 'bg-purple-50 text-purple-700 border-purple-200',
  Interview: 'bg-amber-50 text-amber-700 border-amber-200',
  Offer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function ApplicationTable({ applications = [], onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="font-semibold text-slate-700 py-3.5">
              Company
            </TableHead>
            <TableHead className="font-semibold text-slate-700 py-3.5">
              Job Title
            </TableHead>
            <TableHead className="font-semibold text-slate-700 py-3.5">
              Status
            </TableHead>
            <TableHead className="font-semibold text-slate-700 py-3.5">
              Applied Date
            </TableHead>
            <TableHead className="font-semibold text-slate-700 py-3.5 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow
              key={app._id}
              className="hover:bg-slate-50/60 transition-colors"
            >
              <TableCell className="font-semibold text-slate-900 py-3.5">
                {app.companyName || app.company}
              </TableCell>
              <TableCell className="text-slate-600 py-3.5">
                {app.jobTitle || app.position}
              </TableCell>
              <TableCell className="py-3.5">
                <Badge
                  variant="outline"
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    STATUS_BADGE_STYLES[app.status] ||
                    STATUS_BADGE_STYLES.Wishlist
                  }`}
                >
                  {app.status || 'Wishlist'}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-500 text-sm py-3.5">
                {app.applicationDate
                  ? new Date(app.applicationDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : '—'}
              </TableCell>
              <TableCell className="text-right py-3.5">
                <div className="flex items-center justify-end gap-1">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(app)}
                      className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/applications/${app._id}`)}
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
