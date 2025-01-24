import React from "react";
import style from '@/styles/item.module.css'

interface Skill {
  level: number;
  type: string;
}

interface Requirements {
  skills?: Skill[];
  level?: number;
}

interface Props {
  requirements: Requirements | null;
}

const RequirementsDisplay: React.FC<Props> = ({ requirements }) => {
  if (!requirements) {
    return <div>No requirements available.</div>;
  }

  const { skills, level } = requirements;

  return (
    <div className="requirements-container">
      {/* Display Level Requirement if available */}
      {level !== undefined && (
        <div className="requirement-level">
          <p>Level {level}</p>
        </div>
      )}

      {/* Display Skills Requirements if available */}
      {skills && skills.length > 0 && (
        <div className="requirement-skills">
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.type}</strong>: Level {skill.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no requirements are available */}
      {!level && (!skills || skills.length === 0) && (
        <div>No specific requirements for this item.</div>
      )}
    </div>
  );
};

export default RequirementsDisplay;
