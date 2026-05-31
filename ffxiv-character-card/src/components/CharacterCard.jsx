import { forwardRef, useState, useEffect } from "react";
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

  const [backgroundPosX, setBackgroundPosX] = useState(0);
  const [backgroundPosY, setBackgroundPosY] = useState(0);
  const [backgroundZoom, setBackgroundZoom] = useState(100);

  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e) => {
    if (!backgroundImage) return;

  e.preventDefault();
  setDragging(true);
  setStartX(e.clientX);
  setStartY(e.clientY);
  };

  // Fonction pour mouvement souris
  const handleMouseMove = (e) => {
  if (!dragging) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  setBackgroundPosX((prev) =>
    Math.max(0, Math.min(100, prev - deltaX * 0.2))
  );

  setBackgroundPosY((prev) =>
    Math.max(0, Math.min(100, prev - deltaY * 0.2))
  );

  setStartX(e.clientX);
  setStartY(e.clientY);
  };

  // FONTIONC POUR LA MOLLETTE
  const handleWheel = (e) => {
  if (!backgroundImage) return;

  e.preventDefault();

  const delta = e.deltaY > 0 ? -5 : 5;

  setBackgroundZoom((prev) =>
    Math.max(50, Math.min(300, prev + delta))
  );
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
  const card = ref?.current;

  if (!card) return;

  const wheelHandler = (e) => {
    if (!backgroundImage) return;

    e.preventDefault();
    handleWheel(e);
  };

  card.addEventListener("wheel", wheelHandler, {
    passive: false,
  });

  return () => {
    card.removeEventListener("wheel", wheelHandler);
  };
  }, [ref, backgroundImage]);

  return (

    // BACKGROUND
    <div
      ref={ref}
      className="character-card"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: `${backgroundZoom}%`,
        backgroundPosition: `${backgroundPosX}% ${backgroundPosY}%`,
        backgroundRepeat: "no-repeat",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
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