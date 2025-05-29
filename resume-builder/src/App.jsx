// src/App.jsx
import { ResumeProvider } from "./context/ResumeContext";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";

function App() {
  return (
    <ResumeProvider>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="w-full md:w-1/2">
          <ResumeEditor />
        </div>
        <div className="w-full md:w-1/2">
          <ResumePreview />
        </div>
      </div>
    </ResumeProvider>
  );
}

export default App;
