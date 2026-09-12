import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { useUpdateApplicationStatus } from '@/hooks/useApplications';

const KANBAN_STATUSES = [
  'Wishlist',
  'Applied',
  'Screening',
  'Interview',
  'Offer',
  'Rejected',
];

export default function KanbanBoard({ applications = [] }) {
  const { mutate } = useUpdateApplicationStatus();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const appId = active.id;
    const targetStatus = over.id;

    const draggedApp = applications.find((app) => app._id === appId);

    // Skip if application isn't found or is dropped back into its current column
    if (!draggedApp || draggedApp.status === targetStatus) {
      return;
    }

    // Fire-and-forget mutation call so TanStack Query handles optimistic UI cache updates immediately
    mutate({ id: appId, status: targetStatus });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pb-6 pt-2 items-start">
        {KANBAN_STATUSES.map((status) => {
          const columnApps = applications.filter(
            (app) => app.status === status
          );

          return (
            <KanbanColumn
              key={status}
              status={status}
              applications={columnApps}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
