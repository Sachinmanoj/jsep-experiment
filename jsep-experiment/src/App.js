import React, { Component } from 'react';
import ContentEditable from './components/ContentEditor/ContentEditor';
import constants from './constants/constants';
import jsep from 'jsep';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.configureJSEP();
    this.content = '';
    this.state = {
      html: ''
    };
  };

  configureJSEP () {
    var binaryExp = constants.allowedBinaryExpression;
    jsep.removeAllUnaryOps();
    jsep.removeAllBinaryOps();
    Object.keys(binaryExp).forEach(exp => {
      jsep.addBinaryOp(exp, binaryExp[exp].precedence);
    });
  }

  evaluate(str) {
    try{
      return JSON.stringify(jsep(str));
    }
    catch (err) {
      return JSON.stringify(err);
    }
  }

  handleChange = data => {
    if(data.target.key === " ") {

    }
    else if(this.state.html !== data.target.value) {
      
    }
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
