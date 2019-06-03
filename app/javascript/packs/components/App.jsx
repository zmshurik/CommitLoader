// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import Paginate from 'react-js-pagination'
import LoadForm from './LoadForm'
import CommitsTable from './CommitsTable'
import { fetch } from './Fetch';

export default class App extends React.Component {
  state = {
    isReloading: false,
    commits: [],
    idsForDelete: [],
    currentPage: 1,
    totalItems: 100
  };

  markClickHandle = id => ({ target }) => {
    const ids = this.state.idsForDelete;
    if (target.checked) {
      this.setState({ idsForDelete: [...ids, id] });
    } else {
      const newIds = ids.filter((item_id) => item_id != id);
      this.setState({ idsForDelete: newIds });
    }
  };

  deleteClickHandle = ({ target }) => {
    target.blur();
    fetch('DELETE', Routes.group_delete_path(), { ids: this.state.idsForDelete })
      .then(() => {
        this.reloadCommits();
      });
  };

  reloadCommits = (page = this.state.currentPage) => {
    this.setState({ 
      isReloading: true,
      currentPage: page,
    });
    fetch('GET', Routes.commits_path({ page }), {}).then(response => {
      this.setState({
        isReloading: false,
        commits: response.data.items,
        idsForDelete: [],
        totalItems: response.data.totalItems
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
        <CommitsTable
          reloadCommits={this.reloadCommits}
          markClickHandle={this.markClickHandle}
          deleteClickHandle={this.deleteClickHandle}
          commits={this.state.commits}
          isReloading={this.state.isReloading}
          idsForDelete={this.state.idsForDelete}
        />
        <Paginate
          totalItemsCount={this.state.totalItems}
          onChange={this.reloadCommits}
          activePage={this.state.currentPage}
          itemClass="page-item"
          linkClass="page-link"
          innerClass="pagination justify-content-center"
        />
      </div>
    )
  }
}
