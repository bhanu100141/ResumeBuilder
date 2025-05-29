// src/utils/downloadJSON.js
export const downloadJSON = (data, filename = "resume.json") => {
  const file = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
};
