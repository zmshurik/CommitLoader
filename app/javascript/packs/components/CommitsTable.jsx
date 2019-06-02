import React from 'react'
import { fetch } from './Fetch'

export default class CommitsTable extends React.Component {
  state = {
    idsForDelete: []
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
        this.props.reloadCommits();
        this.setState({ idsForDelete: [] });
      });
  };

  loadRows = () => {
    return this.props.commits.map(commit => (
      <tr key={commit.id}>
        <th scope="row">
          <input type="checkbox" onClick={this.markClickHandle(commit.id)} />
        </th>
        <td>{commit.sha}</td>
        <td>{commit.author}</td>
        <td>{commit.committer}</td>
        <td>{commit.message}</td>
      </tr>
    ));
  };

  loadig = (
    <div className="d-flex align-items-center mb-2">
      <strong>Loading...</strong>
      <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  );

  deleteButton = (
    <div className="d-flex justify-content-end mb-2">
      <button type="button" className="btn btn-danger" data-confirm="are you shoure?" onClick={this.deleteClickHandle}>Delete</button>
    </div>
  );

  render() {
    return (
      <div>
        {this.props.isReloading ? this.loadig : this.deleteButton}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sha</th>
              <th scope="col">Author</th>
              <th scope="col">Committer</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {this.loadRows()}
          </tbody>
        </table>
      </div>
    );
  }
}