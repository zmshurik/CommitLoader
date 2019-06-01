import React from 'react'

export default class LoadForm extends React.Component {

  state = {
    owner: '',
    repo: '',
    author: '',
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
  }

  render() {
    return (
      <form className="form-inline" onSubmit={ this.handleCommitsLoad }>
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

        <button type="submit" className="btn btn-primary mb-2">Load</button>
      </form>
    )
  };
}