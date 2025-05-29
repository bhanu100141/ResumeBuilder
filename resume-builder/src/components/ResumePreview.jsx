// src/components/ResumePreview.jsx
import { useResume } from "../context/ResumeContext";

const ResumePreview = () => {
  const { data } = useResume();

  return (
    <div className="p-4 border bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Live Resume Preview</h2>
      {data.sectionOrder.map((section) => (
        <div key={section} className="mb-4">
          <h3 className="text-lg font-semibold capitalize">
            {section.replace(/([A-Z])/g, ' $1')}
          </h3>
          {section === "personalInfo" ? (
            <p>{data.personalInfo.name} — {data.personalInfo.email}</p>
          ) : (
            <ul className="list-disc ml-5">
              {data[section]?.map((item, index) => (
                <li key={index}>
                  {typeof item === "string"
                    ? item
                    : Object.values(item).filter(Boolean).join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumePreview;
