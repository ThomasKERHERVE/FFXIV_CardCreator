import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import CharacterCard from "./components/CharacterCard";
import OptionsPanel from "./components/OptionsPanel";
import "./App.css";

export default function App() {
  const [checkedJobs, setCheckedJobs] = useState(new Set());
  const [displayMode, setDisplayMode] = useState("all");
  const [characterName, setCharacterName] = useState("");
  const [characterWorld, setCharacterWorld] = useState("");
  const cardRef = useRef(null);

  const toggleJob = (jobId) => {
    setCheckedJobs((prev) => {
      const next = new Set(prev);
      next.has(jobId) ? next.delete(jobId) : next.add(jobId);
      return next;
    });
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#13151f",
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `${characterName || "character"}-card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="app">
      <CharacterCard
        ref={cardRef}
        checkedJobs={checkedJobs}
        displayMode={displayMode}
        onToggle={toggleJob}
        characterName={characterName}
        characterWorld={characterWorld}
      />
      <OptionsPanel
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        characterName={characterName}
        onCharacterNameChange={setCharacterName}
        characterWorld={characterWorld}
        onCharacterWorldChange={setCharacterWorld}
        checkedJobs={checkedJobs}
        onToggle={toggleJob}
        onExport={handleExport}
      />

      <footer className="page-footer">
        FINAL FANTASY XIV © SQUARE ENIX. Unofficial, non-commercial, fan-made —
        not affiliated with or endorsed by Square Enix.
      </footer>
    </div>
  );
}