// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import LoadForm from './LoadForm'
import CommitsTable from './CommitsTable'
import { fetch } from './Fetch';

export default class App extends React.Component {
  state = {
    isReloading: false,
    commits: []
  };

  reloadCommits = () => {
    this.setState({ isReloading: true });
    fetch('GET', Routes.commits_path(), {}).then(response => {
      this.setState({
        isReloading: false,
        commits: response.data
      });
    });
  }

  componentDidMount = () => {
    this.reloadCommits();
  }

  render() {
    return (
      <div className="container">
        <div className="bg-light p-4">
          <h2 className="text-center">Load commits from github repository</h2>
          <LoadForm reloadCommits={this.reloadCommits} />
        </div>
        <hr />
        <h2 className="text-center m-2">Loaded commits</h2>
        <CommitsTable reloadCommits={this.reloadCommits} commits={this.state.commits} isReloading={this.state.isReloading} />
      </div>
    )
  }
}
