import React from 'react'

export default class LoadForm extends React.Component {
  render() {
    return (
      <form className="form-inline">
        <label className="sr-only" for="owner">Owner</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input type="text" className="form-control" id="owner" placeholder="Owner" />
        </div>

        <label className="sr-only" for="repo">Repository</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input type="text" className="form-control" id="repo" placeholder="Repository" />
        </div>

        <label className="sr-only" for="author_email">Author email</label>
        <div className="input-group mb-2 mr-sm-2">
          <div className="input-group-prepend">
            <div className="input-group-text">></div>
          </div>
          <input type="text" className="form-control" id="author_email" placeholder="Author email" />
        </div>

        <button type="submit" className="btn btn-primary mb-2">Load</button>
      </form>
    )
  }
}