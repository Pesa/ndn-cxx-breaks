import React from 'react';
import ProjectsList from './ProjectsList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updatePatchset = this.updatePatchset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      projects: [],
      settings: {}
    };
  }

  componentWillMount() {
    fetch('projects.json').then(resp => resp.json())
    .then(projects => {
      var patchsets = {};
      projects.forEach(p => patchsets[p.name] = 'master');
      this.setState({
        projects: projects,
        patchsets: patchsets
      });
    });
  }

  updatePatchset(project, patchset) {
    this.setState(prevState => ({
      patchsets: Object.assign(prevState.patchsets, {[project.name]: patchset})
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    fetch('submit-job.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        patchsets: this.state.patchsets
      })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp));
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <ProjectsList
          projects={this.state.projects}
          patchsets={this.state.patchsets}
          updatePatchset={this.updatePatchset}
        />
        <input type="submit" className="primary" value="OK"/>
      </form>
    );
  }
}
