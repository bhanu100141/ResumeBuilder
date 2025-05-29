import React from "react";
import { useResume } from "../context/ResumeContext";
import Section from "./Section";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { downloadJSON } from "../utils/downloadJSON";

export default function ResumeEditor() {
  const {
    sections,
    sectionOrder,
    reorderSections,
  } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const [activeId, setActiveId] = React.useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
      reorderSections(newOrder);
    }
    setActiveId(null);
  }

  function handleDownload() {
    const exportData = {
      personalInfo: sections.personalInfo,
      sectionOrder,
      education: sections.education,
      experience: sections.experience,
      projects: sections.projects,
      skills: sections.skills,
    };

    downloadJSON(exportData);
  }

  return (
    <>
      <div className="mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download Resume JSON
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          {sectionOrder.map((sectionKey) => (
            <Section
              key={sectionKey}
              sectionKey={sectionKey}
              data={sections[sectionKey]}
            />
          ))}
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <div className="p-3 bg-blue-200 rounded shadow font-bold select-none">
              {activeId.charAt(0).toUpperCase() + activeId.slice(1)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
