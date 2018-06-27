import React, { Component } from 'react';
import {escape_html} from './utils/html-escape';
import {customfilterSyntax, filters, separtors} from '../../constants/constants';
import Prism from 'prismjs';
import './CustomEditor.css'

class CustomEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    }

    this.opts = {
      tabSize: 2,
    }
    this.languageSyntax = 'customfilter';
    this.syntaxRegex = {                        // The ORDER matters on this regex (Grammer) patter
      keyword: this.updateCustomFilterKeyWords(),
      ...customfilterSyntax,
      error: this.updateCustomFilterErrors(),
    }
    this.addLanguage(this.languageSyntax, this.syntaxRegex);

    this.elTextarea = null;
    this.elCode = null;

    this.handleInputCode = this.handleInputCode.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.code = null;
    this.codeHTML = null;
  }

  updateCustomFilterKeyWords() {
    let regexpress = `\\b(?:${filters.join('|')})\\b`;
    return new RegExp(regexpress);
  }

  updateCustomFilterErrors() {
    // let regexpress = `^/(?!${filters.join('|')})([\\S]+)`;
    let regexpress = `([\\S]+)`;
    return new RegExp(regexpress);
  }

  addLanguage(name, options) {
    Prism.languages[name] = options;
  }

  highlight() {
    Prism.highlightElement(this.elCode, false);
  }

  updateTextCode(newCode) {
    this.code = newCode;
    this.elTextarea.value = newCode;
  }

  updateUICode(newCode) {
    this.elCode.innerHTML = escape_html(newCode);
    this.codeHTML = this.elCode.innerHTML;
    this.highlight();
  }

  updateCode(newCode) { // TODO
    this.updateTextCode(newCode);
    this.updateUICode(newCode);
  }

  updateWhiteSpaceAndPreventDefault(e, count) {
    // SPAN the previous 
    e.preventDefault();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = this.code ? 
      `${this.code.substring(0, selectionStart)}${' '.repeat(count)}${this.code.substring(selectionEnd)}`
      : ' '.repeat(count);
    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd + count;
  }

  handleTabs(e) {
    const tabCode = 9;
    if (e.keyCode !== tabCode) {
      return;
    }
    this.updateWhiteSpaceAndPreventDefault(e, this.opts.tabSize);
  }

  handleSpace(e) {
    const spaceCode = 32;
    if (e.keyCode !== spaceCode) {
      return;
    }
    this.updateWhiteSpaceAndPreventDefault(e, 1);
  }

  updateSVGandPreventDefault(e, code, svgFile) {
    e.preventDefault();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    let newCode = this.code ? 
      this.code.substring(0, selectionStart) + code + /*'<img src=' + svgFile + '/>' +*/ this.code.substring(selectionEnd)
      : code;
    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd + 1;
  }

  handleClosingCharacters(e) {
    const key = e.key;
    switch(key) {
      case '(':
      case '[':
      this.updateSVGandPreventDefault(e, 'openBracket.svg');
      break;

      case ')':
      case ']':
      this.updateSVGandPreventDefault(e, 'closeBracket.svg');
      break;

      default: 
      break;
    }
  }

  handleOperators(e) {
    const key = e.key;
    switch(key) {
      case '+':
      this.updateSVGandPreventDefault(e, '+', 'add.svg');
      break;

      case '-':
      this.updateSVGandPreventDefault(e, '-', 'minus.svg');
      break;

      case '*':
      this.updateSVGandPreventDefault(e, '*', 'multiple.svg');
      break;

      case '/':
      this.updateSVGandPreventDefault(e, '/', 'divide.svg');
      break;
      
      default: 
      break;
    }
  }

  handleInputCode(e) { // TODO
    // let searchText = this.getSearchText(e.target.value);
    // if(e.target.value.length > 15) {

    // }
    // else {
      this.updateCode(e.target.value);
    // }
  }

  handleKeyDown(e) {
    this.handleTabs(e);
    this.handleClosingCharacters(e);
    this.handleOperators(e);
    this.handleSpace(e);
  }


  /** Search operation */

  getTockenOfChar(text, selectionStart) {
    let tokens = Prism.tokenize(text, this.syntaxRegex);
    let sumLength = 0;
    let tokIndex = tokens.findIndex((tok) => {
      sumLength = sumLength + tok.length;
      return sumLength < selectionStart;
    });
    return tokens[tokIndex];
  }

  getSearchText(text) {
    const selectionStart = this.elTextarea.selectionStart;
    const currentChar = text.charAt(selectionStart)
    const isSeparator = separtors.includes(currentChar);
    if(isSeparator) {
      return;
    }

    let tokenValue = this.getTockenOfChar(text, selectionStart);
    if(typeof tokenValue !== 'string') {
      return;
    }

    debugger;
    console.log(tokenValue);
    
  }

  updateFilterSearchText(searchText) {
    if(searchText.length>1){
      this.setState({ 
        filterSearchResults: this.getSearchResults(searchText,this.props.allFilters) 
      });   
    }
  }

  render() {
    return (
      <div className="cust-editor__win" spellCheck="false"> 
        <textarea className="cust-editor__text-area cust-editor__flatten" ref={(e) => this.elTextarea = e} onInput={this.handleInputCode} onKeyDown={this.handleKeyDown}/>
        <pre className="cust-editor__pre cust-editor__flatten" > 
          <code ref={(e) => this.elCode = e} className={`cust-editor__code language-${this.languageSyntax}`}> </code>
        </pre>
        <div className="cust-editor__drop-down" > </div>
      </div>
    );
  }
}

export default CustomEditor;