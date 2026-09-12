import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ status, applications = [] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-72 min-w-70 rounded-lg p-3 border transition-colors ${
        isOver
          ? 'bg-blue-50/80 border-blue-400 border-dashed'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-bold text-gray-700 text-sm">{status}</h3>
        <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
          {applications.length}
        </span>
      </div>

      {/* Droppable Card List */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-37.5">
        {applications.map((application) => (
          <KanbanCard key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
}
