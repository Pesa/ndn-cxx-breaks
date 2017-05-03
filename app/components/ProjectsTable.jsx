import React from 'react';
import ProjectRow from './ProjectRow';

export default function ProjectsTable(props) {
  const projectRows = props.projects.map(proj =>
    <ProjectRow key={proj.name} project={proj} setting={props.settings[proj.name]} onChange={props.updateSetting}/>
  );

  return (
    <table>
      <thead>
        <tr><th>project</th><th>patchset</th><th>info</th></tr>
      </thead>
      <tbody>
        {projectRows}
      </tbody>
    </table>
  );
}
