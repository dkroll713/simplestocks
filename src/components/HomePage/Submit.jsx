import React from 'react';

import currentStore from './submit.js'

const axios = require('axios');

class SubmitBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      current: e.target.value
    })
  }

  handleClick = (e) => {
    axios.post(`/tickers/${this.state.current.toUpperCase()}`)
    .then((res) => {
      if (res.status === 500) {
        console.log(res.data);
      } else {
        console.log(res)
        let input = document.getElementById('input')
        input.value = '';
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.current.length < 1 || this.state.current.length > 6) {
      return (
        <div className="stockBar">
        <h5>Enter a stock:</h5>
        <input id="input" onChange={this.handleChange} value={this.state.current}></input>
        <button onClick={this.handleClick} disabled="true">Submit</button>
      </div>
      )
    } else {
      return (
        <div className="stockBar">
          <h5>Enter a stock:</h5>
          <input id="input" onChange={this.handleChange} value={this.state.current}></input>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      )
    }
  }
}

export default SubmitBar;