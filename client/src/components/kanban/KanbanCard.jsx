import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function KanbanCard({ application }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: application._id,
    });

  const style = {
    // Converts the dnd-kit transform object into a valid CSS translate string
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 mb-2 bg-white rounded-md shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <h4 className="font-semibold text-gray-900 text-sm">
        {application.jobTitle}
      </h4>
      <p className="text-gray-600 text-xs mt-1">{application.companyName}</p>

      {application.applicationDate && (
        <span className="inline-block mt-2 text-[11px] text-gray-400">
          {new Date(application.applicationDate).toLocaleDateString()}
        </span>
      )}
    </div>
  );
}
