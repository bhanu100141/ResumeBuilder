import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

const initialSections = {
  personalInfo: { name: "", email: "" },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

const initialSectionOrder = [
  "personalInfo",
  "education",
  "experience",
  "projects",
  "skills",
];

export const ResumeProvider = ({ children }) => {
  const [sections, setSections] = useState(initialSections);
  const [sectionOrder, setSectionOrder] = useState(initialSectionOrder);

  const updatePersonalInfo = (field, value) => {
    setSections((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addEntry = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  };

  const removeEntry = (section, index) => {
    setSections((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateEntry = (section, index, field, value) => {
    setSections((prev) => {
      const updated = [...prev[section]];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, [section]: updated };
    });
  };

  const reorderSections = (newOrder) => {
    setSectionOrder(newOrder);
  };

  const value = {
    sections,
    sectionOrder,
    updatePersonalInfo,
    addEntry,
    removeEntry,
    updateEntry,
    reorderSections,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
