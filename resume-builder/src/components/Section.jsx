import React from "react";
import { useResume } from "../context/ResumeContext";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const titleCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1").trim();

export default function Section({ sectionKey, data }) {
  const {
    updatePersonalInfo,
    addEntry,
    removeEntry,
    updateEntry,
  } = useResume();

  // Use sortable hook to make section draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sectionKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    opacity: isDragging ? 0.7 : 1,
  };

  const fieldsBySection = {
    personalInfo: ["name", "email"],
    education: ["degree", "institution", "year"],
    experience: ["title", "company", "duration"],
    projects: ["name", "description", "link"],
    skills: ["skill"],
  };

  const handlePersonalInfoChange = (field, e) => {
    updatePersonalInfo(field, e.target.value);
  };

  const handleEntryChange = (index, field, e) => {
    updateEntry(sectionKey, index, field, e.target.value);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white select-none"
    >
      <h2 className="text-xl font-semibold mb-3">{titleCase(sectionKey)}</h2>

      {sectionKey === "personalInfo" ? (
        fieldsBySection.personalInfo.map((field) => (
          <div className="mb-2" key={field}>
            <label className="block font-medium mb-1">{titleCase(field)}</label>
            <input
              type={field === "email" ? "email" : "text"}
              value={data[field] || ""}
              onChange={(e) => handlePersonalInfoChange(field, e)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        ))
      ) : (
        <>
          {data.length === 0 && (
            <p className="mb-2 italic text-gray-500">No entries yet.</p>
          )}

          {data.map((entry, i) => (
            <div
              key={i}
              className="mb-4 p-3 border border-gray-200 rounded bg-gray-50 relative"
            >
              {fieldsBySection[sectionKey].map((field) => (
                <div className="mb-2" key={field}>
                  <label className="block font-medium mb-1">{titleCase(field)}</label>
                  <input
                    type="text"
                    value={entry[field] || ""}
                    onChange={(e) => handleEntryChange(i, field, e)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
              ))}

              <button
                onClick={() => removeEntry(sectionKey, i)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
                aria-label={`Remove ${titleCase(sectionKey)} entry`}
              >
                &times;
              </button>
            </div>
          ))}

          <button
            onClick={() => addEntry(sectionKey)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add {titleCase(sectionKey)} Entry
          </button>
        </>
      )}
    </div>
  );
}
