import React from 'react';
import { Tag } from 'carbon-components-react';

export const runnerTimeFormat = 'mm:ss';
export const pbTag = (<Tag className="PB-tag" type="ibm" title="Personal Best">PB</Tag>);

export const normaliseAgeGrade = (ageGrade) => {
  let normalAge = ageGrade;
  if (typeof ageGrade === 'number' && ageGrade < 1) {
    normalAge = (ageGrade * 100).toFixed(2);
  }
  return normalAge;
};

export const formatAgeGrade = ageGrade => `${normaliseAgeGrade(ageGrade)}%`;
