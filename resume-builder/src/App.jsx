import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";

export default function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100 p-6 md:p-12 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 bg-white p-6 rounded shadow overflow-auto max-h-screen">
          <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
          <ResumeEditor />
        </div>
        <div className="md:w-1/2 bg-white p-6 rounded shadow overflow-auto max-h-screen">
          <h1 className="text-3xl font-bold mb-4">Resume Preview</h1>
          <ResumePreview />
        </div>
      </div>
    </ResumeProvider>
  );
}
