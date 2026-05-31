// Drop your icon images in /public/icons/{job-id}.png
// e.g. /public/icons/paladin.png

export default function JobIcon({ job, checked, displayMode, onToggle }) {
  const isHidden = displayMode === "checked-only" && !checked;

  if (isHidden) return null;

  return (
    <div
      className={`job-icon ${checked ? "checked" : "unchecked"}`}
      onClick={() => onToggle(job.id)}
      title={job.name}
    >
      <img
        src={`/icons/${job.id}.png`}
        alt={job.name}
        onError={(e) => {
          // Fallback to abbr text if no image
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <span className="abbr-fallback">{job.abbr}</span>
    </div>
  );
}
