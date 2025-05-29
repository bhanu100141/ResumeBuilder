# Resume Builder 

A dynamic resume builder web app built with **React** that allows users to:

-  Add, edit, and remove resume sections
-  Reorder sections via drag-and-drop
-  Export the resume as downloadable JSON
-  Live preview of resume layout

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Custom CSS (Single file)
- **State Management**: Context API
- **Drag & Drop**: [`react-beautiful-dnd`](https://github.com/bhanu100141/ResumeBuilder/tree/main/resume-builder)

##  Features

- Add multiple entries for:
  - Personal Info
  - Education
  - Experience
  - Projects
  - Skills
- Live resume preview updates in real-time
- Drag-and-drop to reorder sections
- JSON export that respects section order

## Install dependencies

npm install

## Run the app locally

npm run dev


## Exported JSON Sample

{
  "personalInfo": {
    "name": "Karan Dev",
    "email": "karan@example.com"
  },
  "sectionOrder": ["education", "experience", "projects"],
  "education": [
    {
      "degree": "B.Tech",
      "institution": "Goa University",
      "year": "2020"
    }
  ],
  "experience": [
    {
      "title": "Frontend Developer",
      "company": "Lightning Leap",
      "duration": "2023–2025"
    }
  ],
  "projects": [],
  "skills": []
}


## Github Link

https://github.com/bhanu100141/ResumeBuilder/tree/main/resume-builder