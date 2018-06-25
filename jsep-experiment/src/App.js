import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'
import jsep from 'jsep';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.configureJSEP();
    this.state = {
      html: "abc + 1 + 4 -",
      jsepOutput: this.getJSEP("abc + 1 + 4 -")
    };
  };

  configureJSEP () {
    jsep.removeAllUnaryOps();
  }

  getJSEP(str){
    try{
      return JSON.stringify(jsep(str))
    }
    catch (err) {
      return JSON.stringify(err)
    }
  }

  handleChange = evt => {
    this.setState({
      html: evt.target.value,
      jsepOutput: this.getJSEP(evt.target.value)
    });
  };

  render = () => {
    return (
      <div> 
        <ContentEditable className="center"
                  html={this.state.html} // innerHTML of the editable div
                  disabled={false}       // use true to disable edition
                  onChange={this.handleChange} // handle innerHTML change
                />
        <div>{this.state.jsepOutput}</div>
      </div>
    );
  };
};

export default App;
