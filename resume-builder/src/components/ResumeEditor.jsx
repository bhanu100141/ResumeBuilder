// src/components/ResumeEditor.jsx
import React from "react";
import { useResume } from "../context/ResumeContext";

const ResumeEditor = () => {
  const {
    data,
    setPersonalInfo,
    updateSection,
    addEntry,
    removeEntry,
  } = useResume();

  return (
    <div className="editor container">
      <div className="section">
        <h3>Personal Info</h3>
        <input
          type="text"
          placeholder="Name"
          value={data.personalInfo.name}
          onChange={(e) => setPersonalInfo("name", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={data.personalInfo.email}
          onChange={(e) => setPersonalInfo("email", e.target.value)}
        />
      </div>

      {["education", "experience", "projects", "skills"].map((sectionKey) => (
        <div className="section" key={sectionKey}>
          <h3>{sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}</h3>

          {data[sectionKey].map((entry, index) => (
            <div key={index}>
              {sectionKey === "education" && (
                <>
                  <input
                    placeholder="Degree"
                    value={entry.degree}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "degree", e.target.value)
                    }
                  />
                  <input
                    placeholder="Institution"
                    value={entry.institution}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "institution", e.target.value)
                    }
                  />
                  <input
                    placeholder="Year"
                    value={entry.year}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "year", e.target.value)
                    }
                  />
                </>
              )}

              {sectionKey === "experience" && (
                <>
                  <input
                    placeholder="Job Title"
                    value={entry.title}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "title", e.target.value)
                    }
                  />
                  <input
                    placeholder="Company"
                    value={entry.company}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "company", e.target.value)
                    }
                  />
                  <input
                    placeholder="Duration"
                    value={entry.duration}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "duration", e.target.value)
                    }
                  />
                </>
              )}

              {sectionKey === "projects" && (
                <>
                  <input
                    placeholder="Project Name"
                    value={entry.name}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "name", e.target.value)
                    }
                  />
                  <input
                    placeholder="Description"
                    value={entry.description}
                    onChange={(e) =>
                      updateSection(sectionKey, index, "description", e.target.value)
                    }
                  />
                </>
              )}

              {sectionKey === "skills" && (
                <input
                  placeholder="Skill"
                  value={entry}
                  onChange={(e) =>
                    updateSection(sectionKey, index, null, e.target.value)
                  }
                />
              )}

              <button className="remove-btn" onClick={() => removeEntry(sectionKey, index)}>
                Remove
              </button>
            </div>
          ))}

          <button onClick={() => addEntry(sectionKey)}>Add {sectionKey}</button>
        </div>
      ))}
    </div>
  );
};

export default ResumeEditor;
