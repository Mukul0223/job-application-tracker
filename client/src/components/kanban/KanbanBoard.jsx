import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';

const KANBAN_STATUSES = [
  'Wishlist',
  'Applied',
  'Interviewing',
  'Offer',
  'Rejected',
  'Archived',
];

export default function KanbanBoard({ applications = [] }) {
  const [localApplications, setLocalApplications] = useState(applications);
  const [prevApplications, setPrevApplications] = useState(applications);

  // Sync state during render when props change, avoiding an effect callback
  if (applications !== prevApplications) {
    setPrevApplications(applications);
    setLocalApplications(applications);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const appId = active.id;
    const targetStatus = over.id;

    setLocalApplications((prevApps) => {
      const draggedApp = prevApps.find((app) => app._id === appId);

      if (!draggedApp || draggedApp.status === targetStatus) {
        return prevApps;
      }

      return prevApps.map((app) =>
        app._id === appId ? { ...app, status: targetStatus } : app
      );
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 items-start">
        {KANBAN_STATUSES.map((status) => {
          const columnApps = localApplications.filter(
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
