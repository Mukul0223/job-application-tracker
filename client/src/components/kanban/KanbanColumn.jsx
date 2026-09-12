import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ status, applications = [] }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-full min-w-0 rounded-lg p-2.5! border transition-colors ${
        isOver
          ? 'bg-blue-50/80 border-blue-400 border-dashed'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <h3
          className="font-bold text-gray-700 text-xs md:text-sm truncate mr-1"
          title={status}
        >
          {status}
        </h3>
        <span className="text-[11px] font-semibold text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full shrink-0">
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
