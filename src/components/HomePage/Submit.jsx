import React from 'react';

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
    axios.post(`/tickers/${this.state.current}`)
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="stockBar">
        <h5>Enter a stock:</h5>
        <input onChange={this.handleChange}></input>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}

export default SubmitBar;