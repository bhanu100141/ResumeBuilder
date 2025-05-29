// src/context/ResumeContext.jsx
import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [data, setData] = useState({
    personalInfo: { name: "", email: "" },
    sectionOrder: ["personalInfo", "education", "experience", "projects", "skills"],
    education: [],
    experience: [],
    projects: [],
    skills: [],
  });

  const defaultFields = {
    education: { degree: "", institution: "", year: "" },
    experience: { title: "", company: "", duration: "" },
    projects: { name: "", description: "" },
    skills: "",
  };

const updateSection = (section, index, field, value) => {
  setData((prev) => {
    const updated = [...prev[section]];
    if (section === "skills") {
      updated[index] = value;
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    return { ...prev, [section]: updated };
  });
};

  const addEntry = (section) => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultFields[section]],
    }));
  };

  const removeEntry = (section, index) => {
    setData((prev) => {
      const updated = [...prev[section]];
      updated.splice(index, 1);
      return { ...prev, [section]: updated };
    });
  };

  const setPersonalInfo = (field, value) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const reorderSections = (newOrder) => {
    setData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{ data, updateSection, addEntry, removeEntry, setPersonalInfo, reorderSections }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
