import React, { Component } from 'react';
import {escape_html} from './utils/html-escape';
import {customfilterSyntax, filters} from '../../constants/constants';
import Prism from 'prismjs';

class CustomEditor extends Component {
  constructor(props) {
    super(props);

    this.opts = {
      tabSize: 2,
    }
    this.languageSyntax = 'customfilter';
    let syntaxRegex = {
      keyword: this.updateCustomFilterKeyWords(),
      ...customfilterSyntax,
    }
    this.addLanguage(this.languageSyntax, syntaxRegex);

    this.elTextarea = null;
    this.elCode = null;

    this.handleNewCode = this.handleNewCode.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.code = null;
    this.codeHTML = null;
  }

  updateCustomFilterKeyWords() {
    let regexpress = `\\b(?:${filters.join('|')})\\b`;
    return new RegExp(regexpress);
  }

  addLanguage(name, options) {
    Prism.languages[name] = options;
  }

  updateTextCode(newCode) {
    this.code = newCode;
    this.elTextarea.value = newCode;
  }

  updateCode(newCode) { // TODO
    this.updateTextCode(newCode);
    // this.elCode.innerHTML = escape_html(newCode);
  }

  updateWhiteSpaceAndPreventDefault(e, count) {
    // SPAN the previous 
    e.preventDefault();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = `${this.code.substring(0, selectionStart)}${' '.repeat(count)}${this.code.substring(selectionEnd)}`;
    this.updateCode(newCode);
    this.elTextarea.selectionEnd = selectionEnd + count;
  }

  handleTabs(e) {
    const tabCode = 9;
    if (e.keyCode !== tabCode) {
      return;
    }
    this.updateWhiteSpaceAndPreventDefault(this.opts.tabSize);
  }

  handleSpace(e) {
    const spaceCode = 32;
    if (e.keyCode !== spaceCode) {
      return;
    }
    this.updateWhiteSpaceAndPreventDefault(1);
  }

  updateSVGandPreventDefault(e, code, svgFile) {
    e.preventDefault();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    this.codeHTML = this.codeHTML.substring(0, selectionStart) + '<img src=' + svgFile + '/>' + this.code.substring(selectionEnd);
    this.elCode.innerHTML = this.codeHTML;
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
    }
  }

  handleInputCode(e) { // TODO
    this.code = e.target.value;
    let codeHTML = escape_html(e.target.value);
    this.elCode.innerHTML = codeHTML;
  }

  handleKeyDown(e) {
    this.handleTabs(e);
    this.handleClosingCharacters(e);
    this.handleOperators(e);
    this.handleSpace(e);
  }

  render() {
    return (
      <div> 
        <textarea ref={(e) => this.elTextarea = e} onInput={this.handleInputCode} onKeyDown={this.handleKeyDown}> </textarea>
        <pre> 
          <code ref={(e) => this.elCode = e} className={`language-${this.languageSyntax}`}> </code>
        </pre>
        <div> </div>
      </div>
    );
  }
}

export default CustomEditor;