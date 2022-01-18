import React, { Component } from 'react';
import shortid from 'shortid';

class Form extends Component {
  state = {
    name: '',
    nickname: '',
    experience: 'junior',
    license: false,
  };

  nameInputId = shortid.generate();
  tagInputId = shortid.generate();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  handleLicenseChange = e => {
    this.setState({ license: e.currentTarget.checked });
  };

  reset = () => {
    this.setState({ name: '', nickname: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>
          Name{' '}
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>
        <label htmlFor={this.tagInputId}>
          Nickname{' '}
          <input
            type="text"
            name="nickname"
            value={this.state.nickname}
            onChange={this.handleChange}
            id={this.tagInputId}
          />
        </label>

        <p>Your developer lvl:</p>

        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.experience === 'junior'}
          />{' '}
          Junior
        </label>

        <label>
          {' '}
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />{' '}
          Middle
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />{' '}
          Senior
        </label>

        <label>
          <input
            type="checkbox"
            name="license"
            checked={this.state.license}
            onChange={this.handleLicenseChange}
          />{' '}
          Agree with conditions
        </label>

        <button type="submit" disabled={!this.state.license}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
