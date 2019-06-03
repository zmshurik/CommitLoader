import React from 'react'
import Alert from './Alert'
import { fetch } from './Fetch'

export default class LoadForm extends React.Component {

  state = {
    isLoading: false,
    owner: '',
    repo: '',
    author: '',
    alert: {
      isShow: false,
      message: ''
    }
  };

  handleOwnerChange = ({ target: { value } }) => {
    this.setState({ owner: value });
  }

  handleRepoChange = ({ target: { value } }) => {
    this.setState({ repo: value });
  }

  handleAuthorChange = ({ target: { value } }) => {
    this.setState({ author: value });
  }

  handleCommitsLoad = e => {
    e.preventDefault();
    this.setState({
      isLoading: true,
      owner: '',
      repo: '',
      author: '',
      alert: {
        isShow: false,
        message: ''
      }
    });
    const { owner, author, repo } = this.state;
    fetch('POST', Routes.commits_path(), { owner, author, repo })
      .then(response => {
        this.setState({ isLoading: false })
        const { message, status } = response.data;
        if (status == 'success') {
          const page = 1;
          this.props.reloadCommits(page);
        } else {
          this.setState({ alert: {
            isShow: true,
            message
          }});
        }
      });
  }

  render() {
    return (
      <div>
      {this.state.alert.isShow ? <Alert message={this.state.alert.message} /> : null}
      <form className="form-inline justify-content-center" onSubmit={ this.handleCommitsLoad }>
        <label className="sr-only" htmlFor="owner">Owner</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input
            type="text"
            className="form-control"
            id="owner"
            placeholder="Owner"
            required
            onChange={ this.handleOwnerChange }
            value={ this.state.owner }
          />
        </div>

        <label className="sr-only" htmlFor="repo">Repository</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input
            type="text"
            className="form-control"
            id="repo"
            placeholder="Repository"
            required
            onChange={ this.handleRepoChange }
            value={ this.state.repo }
          />
        </div>

        <label className="sr-only" htmlFor="author">Author</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Author email or login"
            onChange={ this.handleAuthorChange }
            value={ this.state.author }
          />
        </div>

        <button type="submit" className="btn btn-primary mb-2" disabled={this.state.isLoading}>
          {this.state.isLoading ?
            <span>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </span>
          : 'Load'}
        </button>
      </form>
      </div>
    )
  };
}