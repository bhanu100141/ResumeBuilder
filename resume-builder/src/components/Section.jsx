// src/components/Section.jsx
import { useResume } from "../context/ResumeContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Section = ({ sectionKey }) => {
  const {
    data,
    setPersonalInfo,
    updateSection,
    addEntry,
    removeEntry,
  } = useResume();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: sectionKey,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFields = () => {
    if (sectionKey === "personalInfo") {
      return (
        <div className="flex flex-col gap-2">
          <input
            className="border p-2"
            placeholder="Name"
            value={data.personalInfo.name}
            onChange={(e) => setPersonalInfo("name", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) => setPersonalInfo("email", e.target.value)}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {data[sectionKey]?.map((entry, index) => (
          <div key={index} className="border p-2">
            {sectionKey === "skills" ? (
              <input
                className="w-full p-1 border"
                placeholder="Skill"
                value={entry}
                onChange={(e) => updateSection(sectionKey, index, null, e.target.value)}
              />
            ) : (
              Object.keys(entry).map((field) => (
                <input
                  key={field}
                  className="w-full p-1 border mb-1"
                  placeholder={field}
                  value={entry[field] || ""}
                  onChange={(e) =>
                    updateSection(sectionKey, index, field, e.target.value)
                  }
                />
              ))
            )}
            <button
              onClick={() => removeEntry(sectionKey, index)}
              className="text-sm text-red-500 mt-1"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addEntry(sectionKey)}
          className="mt-2 text-blue-600 underline"
        >
          + Add {sectionKey.slice(0, -1)}
        </button>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-3 my-2 bg-gray-100 rounded"
    >
      <h3 className="font-semibold capitalize mb-2">{sectionKey.replace(/([A-Z])/g, ' $1')}</h3>
      {renderFields()}
    </div>
  );
};

export default Section;
