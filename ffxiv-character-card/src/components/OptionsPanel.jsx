import { CATEGORIES, CONTENT_GROUPS } from "../data/jobs";

export default function OptionsPanel({
  displayMode,
  onDisplayModeChange,
  characterName,
  onCharacterNameChange,
  characterWorld,
  onCharacterWorldChange,
  checkedJobs,
  onToggle,
  onExport,
}) {
  const allJobs = CATEGORIES.flatMap((cat) => cat.roles.flatMap((r) => r.jobs));
  const allContent = CONTENT_GROUPS.flatMap((g) => g.jobs);
  const everything = [...allJobs, ...allContent];

  const toggleAll = (jobs, forceState) => {
    jobs.forEach((job) => {
      const isChecked = checkedJobs.has(job.id);
      if (forceState === true && !isChecked) onToggle(job.id);
      if (forceState === false && isChecked) onToggle(job.id);
    });
  };

  return (
    <div className="options-panel">
      <h3 className="options-title">Options</h3>

      {/* Identity */}
      <div className="option-section">
        <p className="section-label">Character</p>

        <div className="option-group">
          <label>Name</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => onCharacterNameChange(e.target.value)}
            placeholder="Your Character"
          />
        </div>

        <div className="option-group">
          <label>Home World</label>
          <input
            type="text"
            value={characterWorld}
            onChange={(e) => onCharacterWorldChange(e.target.value)}
            placeholder="e.g. Carbuncle"
          />
        </div>
      </div>

      {/* Display mode */}
      <div className="option-section">
        <p className="section-label">Display</p>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="all"
              checked={displayMode === "all"}
              onChange={() => onDisplayModeChange("all")}
            />
            Show all (unchecked = greyed out)
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="checked-only"
              checked={displayMode === "checked-only"}
              onChange={() => onDisplayModeChange("checked-only")}
            />
            Show checked jobs only
          </label>
        </div>
      </div>

      {/* Jobs by category */}
      {CATEGORIES.map((cat) => {
        const catJobs = cat.roles.flatMap((r) => r.jobs);
        return (
          <div className="option-section" key={cat.category}>
            <div className="section-header">
              <p className="section-label">{cat.category}</p>
              <div className="section-actions">
                <button onClick={() => toggleAll(catJobs, true)}>All</button>
                <button onClick={() => toggleAll(catJobs, false)}>None</button>
              </div>
            </div>

            {cat.roles.map((roleGroup) => (
              <div className="role-check-group" key={roleGroup.role}>
                <span
                  className="role-check-label"
                  style={{ color: roleGroup.color }}
                >
                  {roleGroup.role}
                </span>
                <div className="jobs-check-row">
                  {roleGroup.jobs.map((job) => (
                    <button
                      key={job.id}
                      className={`job-pill ${checkedJobs.has(job.id) ? "active" : ""}`}
                      onClick={() => onToggle(job.id)}
                      title={job.name}
                    >
                      {job.abbr}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* High-end content */}
      <div className="option-section">
        <div className="section-header">
          <p className="section-label">High-End Content</p>
          <div className="section-actions">
            <button onClick={() => toggleAll(allContent, true)}>All</button>
            <button onClick={() => toggleAll(allContent, false)}>None</button>
          </div>
        </div>

        {CONTENT_GROUPS.map((group) => (
          <div className="role-check-group" key={group.role}>
            <span className="role-check-label" style={{ color: group.color }}>
              {group.role}
            </span>
            <div className="jobs-check-row">
              {group.jobs.map((job) => (
                <button
                  key={job.id}
                  className={`job-pill ${checkedJobs.has(job.id) ? "active" : ""}`}
                  onClick={() => onToggle(job.id)}
                  title={job.name}
                >
                  {job.abbr}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Global actions (jobs + content) */}
      <div className="option-section">
        <div className="section-header">
          <p className="section-label">Select all</p>
          <div className="section-actions">
            <button onClick={() => toggleAll(everything, true)}>All</button>
            <button onClick={() => toggleAll(everything, false)}>None</button>
          </div>
        </div>
      </div>

      <button className="export-btn" onClick={onExport}>
        Export as image
      </button>
    </div>
  );
}