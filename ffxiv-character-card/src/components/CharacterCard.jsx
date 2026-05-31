import { forwardRef } from "react";
import { CATEGORIES, CONTENT_GROUPS } from "../data/jobs";
import JobIcon from "./JobIcon";

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

const CharacterCard = forwardRef(function CharacterCard(
  {
    checkedJobs,
    displayMode,
    onToggle,
    characterName,
    characterWorld,
    backgroundImage,
    profileImage,
    frameImage,
  },
  ref
) {
  const checkedOnly = displayMode === "checked-only";

  const anyContentChecked = CONTENT_GROUPS.some((g) =>
    g.jobs.some((j) => checkedJobs.has(j.id))
  );

  const showContent = !checkedOnly || anyContentChecked;

  return (
    <div
      ref={ref}
      className="character-card"
      style={{
       backgroundImage: backgroundImage
         ? `url(${backgroundImage})`
         : undefined,
       backgroundSize: "cover",
       backgroundPosition: "center",
      }}
    >
      {frameImage && (
        <img
          src={frameImage}
          alt=""
          className="card-frame"
        />
      )}
      <div className="card-header">
        <div className="character-avatar">
          {profileImage ? (
            <img src={profileImage} alt="profile" />
          ) : null}
        </div>

        <div className="character-identity">
          <div className="character-name">
            {characterName || "Adventurer"}
          </div>

          <div className="character-world">
            {characterWorld || "Home World"}
          </div>
        </div>
      </div>

      <div className="card-columns">
        <div className="card-col card-col-jobs">
          {CATEGORIES.map((cat) => {
            const catJobs = cat.roles.flatMap((r) => r.jobs);

            if (
              checkedOnly &&
              !catJobs.some((j) => checkedJobs.has(j.id))
            ) {
              return null;
            }

            return (
              <div className="card-category" key={cat.category}>
                <div className="category-title">
                  {cat.category}
                </div>

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

        <div className="card-col card-col-content">
          {showContent && (
            <div className="card-category content-right">
              <div className="category-title">
                High-End Content
              </div>

              <div className="roles-container">
                {CONTENT_GROUPS.map((group) => (
                  <GroupRow
                    key={group.role}
                    group={group}
                    checkedJobs={checkedJobs}
                    displayMode={displayMode}
                    onToggle={onToggle}
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