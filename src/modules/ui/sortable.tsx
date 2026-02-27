"use client";

import {
  DndContext,
  closestCenter,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useState, type ReactNode } from "react";

// ─── Single-column sortable list ───────────────────────────────────────────────

interface SortableListProps {
  items: string[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  children: ReactNode;
}

export function SortableList({ items, onReorder, children }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));
    if (oldIndex !== -1 && newIndex !== -1) {
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

// ─── Two-column sortable layout ────────────────────────────────────────────────

interface SortableColumnsProps {
  items: string[];
  onReorder: (newOrder: string[]) => void;
  renderItem: (id: string) => ReactNode;
  renderOverlay?: (id: string) => ReactNode;
}

function DroppableColumn({
  id,
  items,
  renderItem,
}: {
  id: string;
  items: string[];
  renderItem: (id: string) => ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 space-y-4 min-h-24 rounded-lg p-3 transition-colors ${
        isOver ? "bg-muted/50" : ""
      }`}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((itemId) => (
          <SortableItem key={itemId} id={itemId}>
            {renderItem(itemId)}
          </SortableItem>
        ))}
      </SortableContext>
    </div>
  );
}

export function SortableColumns({
  items,
  onReorder,
  renderItem,
  renderOverlay,
}: SortableColumnsProps) {
  const mid = Math.ceil(items.length / 2);
  const [left, setLeft] = useState<string[]>(items.slice(0, mid));
  const [right, setRight] = useState<string[]>(items.slice(mid));
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync when items change externally (add/remove)
  const allIds = [...left, ...right];
  if (
    items.length !== allIds.length ||
    items.some((id) => !allIds.includes(id))
  ) {
    const newMid = Math.ceil(items.length / 2);
    setLeft(items.slice(0, newMid));
    setRight(items.slice(newMid));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findContainer = (id: string): "left" | "right" | null => {
    if (left.includes(id)) return "left";
    if (right.includes(id)) return "right";
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(String(active.id));
    const overId = String(over.id);

    // Dropping over a column itself (empty area)
    let overContainer = findContainer(overId);
    if (!overContainer) {
      // Over is likely the droppable column id
      if (overId === "left" || overId === "right") {
        overContainer = overId;
      } else {
        return;
      }
    }

    if (!activeContainer || activeContainer === overContainer) return;

    // Move item between columns
    setLeft((prev) => {
      if (activeContainer === "left") {
        return prev.filter((id) => id !== String(active.id));
      }
      if (overContainer === "left") {
        const overIndex = prev.indexOf(overId);
        const insertAt = overIndex >= 0 ? overIndex : prev.length;
        return [
          ...prev.slice(0, insertAt),
          String(active.id),
          ...prev.slice(insertAt),
        ];
      }
      return prev;
    });

    setRight((prev) => {
      if (activeContainer === "right") {
        return prev.filter((id) => id !== String(active.id));
      }
      if (overContainer === "right") {
        const overIndex = prev.indexOf(overId);
        const insertAt = overIndex >= 0 ? overIndex : prev.length;
        return [
          ...prev.slice(0, insertAt),
          String(active.id),
          ...prev.slice(insertAt),
        ];
      }
      return prev;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeContainer = findContainer(String(active.id));
    const overId = String(over.id);
    let overContainer = findContainer(overId);

    if (!overContainer) {
      if (overId === "left" || overId === "right") {
        overContainer = overId;
      } else {
        return;
      }
    }

    if (!activeContainer) return;

    // Reorder within same column
    if (activeContainer === overContainer) {
      const setter = activeContainer === "left" ? setLeft : setRight;
      const column = activeContainer === "left" ? left : right;
      const oldIndex = column.indexOf(String(active.id));
      const newIndex = column.indexOf(overId);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const updated = arrayMove(column, oldIndex, newIndex);
        setter(updated);
        // Emit new flat order
        if (activeContainer === "left") {
          onReorder([...updated, ...right]);
        } else {
          onReorder([...left, ...updated]);
        }
        return;
      }
    }

    // Cross-container move already handled in onDragOver, just emit order
    onReorder([...left, ...right]);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DroppableColumn id="left" items={left} renderItem={renderItem} />
        <DroppableColumn id="right" items={right} renderItem={renderItem} />
      </div>
      <DragOverlay>
        {activeId && renderOverlay
          ? renderOverlay(activeId)
          : activeId && renderItem(activeId)}
      </DragOverlay>
    </DndContext>
  );
}

// ─── Sortable item with drag handle ────────────────────────────────────────────

interface SortableItemProps {
  id: string;
  children: ReactNode;
  handle?: boolean;
}

export function SortableItem({ id, children, handle = true }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-2">
      {handle && (
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing shrink-0 mt-1 text-muted-foreground hover:text-foreground touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
