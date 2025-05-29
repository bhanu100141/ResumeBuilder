import React from "react";
import { useResume } from "../context/ResumeContext";

const titleCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1").trim();

export default function ResumePreview() {
  const { sections, sectionOrder } = useResume();

  return (
    <div className="prose max-w-none">
      {sectionOrder.map((sectionKey) => {
        const data = sections[sectionKey];
        if (sectionKey === "personalInfo") {
          return (
            <section key={sectionKey} className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{titleCase(sectionKey)}</h2>
              <p>
                <strong>Name: </strong> {data.name || "-"}
              </p>
              <p>
                <strong>Email: </strong> {data.email || "-"}
              </p>
            </section>
          );
        }

        if (!data.length) {
          return null;
        }

        return (
          <section key={sectionKey} className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{titleCase(sectionKey)}</h2>
            <ul className="list-disc list-inside space-y-2">
              {data.map((entry, i) => (
                <li key={i} className="bg-gray-50 p-3 rounded shadow-sm">
                  {Object.entries(entry).map(([key, value]) =>
                    value ? (
                      <p key={key}>
                        <strong>{titleCase(key)}: </strong>
                        {value}
                      </p>
                    ) : null
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
