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
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [frameImage, setFrameImage] = useState("");
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
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });

    const roundedCanvas = document.createElement("canvas");
    const ctx = roundedCanvas.getContext("2d");
  
    roundedCanvas.width = canvas.width;
    roundedCanvas.height = canvas.height;
  
    const radius = 36;
  
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(roundedCanvas.width - radius, 0);
    ctx.quadraticCurveTo(
      roundedCanvas.width,
      0,
      roundedCanvas.width,
      radius
    );
  
    ctx.lineTo(
      roundedCanvas.width,
      roundedCanvas.height - radius
    );
  
    ctx.quadraticCurveTo(
      roundedCanvas.width,
      roundedCanvas.height,
      roundedCanvas.width - radius,
      roundedCanvas.height
    );
  
    ctx.lineTo(radius, roundedCanvas.height);
  
    ctx.quadraticCurveTo(
      0,
      roundedCanvas.height,
      0,
      roundedCanvas.height - radius
    );
  
    ctx.lineTo(0, radius);
  
    ctx.quadraticCurveTo(0, 0, radius, 0);
  
    ctx.closePath();
    ctx.clip();
  
    ctx.drawImage(canvas, 0, 0);
  
    const link = document.createElement("a");
    link.download = `${characterName || "character"}-card.png`;
    link.href = roundedCanvas.toDataURL("image/png");
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
        backgroundImage={backgroundImage}
        profileImage={profileImage}
        frameImage={frameImage}
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
        backgroundImage={backgroundImage}
        onBackgroundImageChange={setBackgroundImage}
        profileImage={profileImage}
        onProfileImageChange={setProfileImage}
        frameImage={frameImage}
        onFrameImageChange={setFrameImage}
      />

      <footer className="page-footer">
        FINAL FANTASY XIV © SQUARE ENIX. Unofficial, non-commercial, fan-made —
        not affiliated with or endorsed by Square Enix.
      </footer>
    </div>
  );
}