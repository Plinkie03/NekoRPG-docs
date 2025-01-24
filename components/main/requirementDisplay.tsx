import { Tooltip } from "@/components/ui/tooltip"
import React from "react";
import style from '@/styles/item.module.css'
import Image from "next/image";

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
    <div className={style.requirements}>
      <div>
        <p className={style.nglIRanOutOfClassNames}>Requirements</p>
      </div>
      <div className={style.requirementsList}>
        {/* Display Level Requirement if available */}
        {level !== undefined && (
          <Tooltip content={'Requires: "Character level ' + level + '"'} showArrow={true} openDelay={0} closeDelay={0}>
            <div className={style.theDevIsGayAF}>
              <div className={style.requirementLevel}>
                <p className={style.level}>{level}</p>
                <div className={style.skillImage}>
                  <Image src={'/' + 'User' + '.svg'} alt="" height={14} width={14}></Image>
                </div>
              </div>
            </div>
          </Tooltip>
        )}

        {/* Display Skills Requirements if available */}
        {skills && skills.length > 0 && (
          <>
          {skills.map((skill, index) => (
            <div className={style.theDevIsGayAF} key={index}>
              <Tooltip content={'Requires: "' + skill.type + ' level ' + skill.level + '"'} showArrow={true} openDelay={0} closeDelay={0}>
                <div className={style.requirementLevel}>
                  <p className={style.level}>{skill.level}</p>
                  <div className={style.skillImage}>
                    <Image src={'/' + skill.type + '.svg'} alt="" height={14} width={14}></Image>
                  </div>
                </div>
              </Tooltip>
            </div>
          ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RequirementsDisplay;
