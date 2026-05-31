import { forwardRef } from "react";
import { CATEGORIES, CONTENT_GROUPS } from "../data/jobs";
import JobIcon from "./JobIcon";

// One labelled row of icons (a combat role or a high-end content group).
function GroupRow({ group, checkedJobs, displayMode, onToggle }) {
  const checkedOnly = displayMode === "checked-only";
  const visible = checkedOnly
    ? group.jobs.filter((j) => checkedJobs.has(j.id))
    : group.jobs;
  if (visible.length === 0) return null;

  return (
    <div className="role-row">
      <span className="role-label" style={{ color: group.color }}>
        {group.role}
      </span>
      <div className="jobs-row">
        {group.jobs.map((job) => (
          <JobIcon
            key={job.id}
            job={job}
            checked={checkedJobs.has(job.id)}
            displayMode={displayMode}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

// Uses forwardRef so App can hand the ref to html2canvas for PNG export.
const CharacterCard = forwardRef(function CharacterCard(
  { checkedJobs, displayMode, onToggle, characterName, characterWorld },
  ref
) {
  const checkedOnly = displayMode === "checked-only";
  const anyContentChecked = CONTENT_GROUPS.some((g) =>
    g.jobs.some((j) => checkedJobs.has(j.id))
  );
  const showContent = !checkedOnly || anyContentChecked;

  return (
    <div className="character-card" ref={ref}>
      <div className="card-header">
        <div className="character-avatar">
          <img
            src="/screen.png"
            alt=""
            onError={(e) => {
              // Missing avatar -> fall back to the empty styled circle.
              e.target.style.display = "none";
            }}
          />
        </div>
        <div className="character-identity">
          <div className="character-name">{characterName || "Adventurer"}</div>
          <div className="character-world">{characterWorld || "Home World"}</div>
        </div>
      </div>

      <div className="card-columns">
        {/* Left column: jobs grouped by category */}
        <div className="card-col card-col-jobs">
          {CATEGORIES.map((cat) => {
            const catJobs = cat.roles.flatMap((r) => r.jobs);
            if (checkedOnly && !catJobs.some((j) => checkedJobs.has(j.id))) {
              return null;
            }
            return (
              <div className="card-category" key={cat.category}>
                <div className="category-title">{cat.category}</div>
                <div className="roles-container">
                  {cat.roles.map((roleGroup) => (
                    <GroupRow
                      key={roleGroup.role}
                      group={roleGroup}
                      checkedJobs={checkedJobs}
                      displayMode={displayMode}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: high-end / high-difficulty content */}
        <div className="card-col card-col-content">
          {showContent && (
            <div className="card-category content-right">
              <div className="category-title">High-End Content</div>
              <div className="roles-container">
                {CONTENT_GROUPS.map((group) => (
                  <GroupRow
                    
                    group={group}
                    checkedJobs={checkedJobs}
                    displayMode={displayMode}
                    onToggle={onToggle}
                    key={group.role}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CharacterCard;