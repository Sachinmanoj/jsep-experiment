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
      dropDownTop: 0,
      dropDownLeft: 0,
      searchList: [],
    }

    this.opts = {
      tabSize: 2,
    }
    this.activeToken = null;
    this.codeKeyHandle = {
      pasted: false,
      spaceEnteredOnSearch: false
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

    this.handlePasteCode = this.handlePasteCode.bind(this);
    this.handleInputCode = this.handleInputCode.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.code = null;
    this.codeHTML = null;
  }

  updateCustomFilterKeyWords() {
    let regexpress = `(?:${filters.join('|')})`;
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
  }

  updateCode(newCode) { // TODO
    this.updateTextCode(newCode);
    this.updateUICode(newCode);
  }

  updateCodeAndHighlight(newCode) { // TODO
    this.updateCode(newCode);
    this.highlight();
  }

  updateWhiteSpaceAndPreventDefault(e, count, avoidHighlight = false) {
    // SPAN the previous 
    e.preventDefault();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    const newCode = this.code ? 
      `${this.code.substring(0, selectionStart)}${' '.repeat(count)}${this.code.substring(selectionEnd)}`
      : ' '.repeat(count);
    avoidHighlight ? this.updateCode(newCode) : this.updateCodeAndHighlight(newCode);
    this.elTextarea.selectionEnd = selectionEnd + count;
  }

  handleTabs(e) {
    const tabCode = 9;
    if (e.keyCode !== tabCode) {
      return;
    }
    this.hideDropdown();
    this.updateWhiteSpaceAndPreventDefault(e, this.opts.tabSize);
  }

  handleSpace(e) {
    const spaceCode = 32;
    if (e.keyCode !== spaceCode) {
      return;
    }
    if (this.activeToken !== null) {
      this.codeKeyHandle.spaceEnteredOnSearch = true;
      return;
    }
    this.updateWhiteSpaceAndPreventDefault(e, 1);
  }

  updateSVGandPreventDefault(e, code, svgFile) {
    e.preventDefault();
    this.hideDropdown();
    const selectionStart = this.elTextarea.selectionStart;
    const selectionEnd = this.elTextarea.selectionEnd;
    let newCode = this.code ? 
      this.code.substring(0, selectionStart) + code + /*'<img src=' + svgFile + '/>' +*/ this.code.substring(selectionEnd)
      : code;
    this.updateCodeAndHighlight(newCode);
    this.elTextarea.selectionEnd = selectionEnd + 1;
  }

  handleClosingCharacters(e) {
    const key = e.key;
    switch(key) {
      case '(':
      case '[':
      this.updateSVGandPreventDefault(e, '(', 'openBracket.svg');
      break;

      case ')':
      case ']':
      this.updateSVGandPreventDefault(e, ')', 'closeBracket.svg');
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

  hideDropdown(callback = () => {}) {
    this.activeToken = null;
    this.setState({
      showDropdown: false,
    },callback);
  }

  handlePasteCode() {
    this.codeKeyHandle.pasted = true;
  }

  handleInputCode(e) { // TODO
    let value = e.target.value;
    let searchText = this.getSearchText(value);
    let searchTextResult = this.canSearch(searchText) ? this.getSearchResults(searchText) : [];
    if(searchTextResult.length > 0) {
      this.setState({
        showDropdown: true,
        dropDownTop: 50,
        dropDownLeft: 50,
        searchList: [...searchTextResult]
      }, () => 
      this.updateCode(value));
      let v = Prism.highlight(value, this.syntaxRegex);
      console.log(v);
    }
    else {
      this.hideDropdown(() => this.updateCodeAndHighlight(value));
    }
  }

  handleKeyDown(e) {
    this.codeKeyHandle.pasted = false;
    this.codeKeyHandle.spaceEnteredOnSearch = false;
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
      return sumLength >= selectionStart;
    });
    return {
      tokens: tokens,
      token: tokens[tokIndex],
      tokenIndex: tokIndex
    };
  }

  getSearchText(text) {
    const selectionStart = this.elTextarea.selectionStart;
    const currentChar = text.charAt(selectionStart-1)
    const isSeparator = separtors.includes(currentChar);
    if(isSeparator && this.activeToken === null) {
      return;
    }
    let tokenValue = this.getTockenOfChar(text, selectionStart);
    if(this.activeToken === null && (!tokenValue.token || tokenValue.token.type === 'keyword')) {
      return;
    }
    else if(this.activeToken !== null) {
      let tokStr = tokenValue.tokens.slice(this.activeToken, tokenValue.tokenIndex + 1);
      let isAllSearchable = tokStr.every((tok) => (typeof tok === 'string' || tok.type !== 'keyword'));
      if(isAllSearchable) {
        return tokStr.reduce((str, tok) => tok.content ? str + tok.content : str + tok, '');
      }
    }
    this.activeToken = tokenValue.tokenIndex;
    return tokenValue.token.content;
  }

  canSearch(searchText) {
    return typeof searchText !== 'undefined' && searchText.replace(/ /g, '').length > 0 && !this.codeKeyHandle.pasted;
  }

  getSearchResults(searchText){
    const searchTextPattern = new RegExp(searchText.replace(/[^a-z A-Z 0-9 %]/g,''),'gi'); 
    return filters.filter( childFilter => childFilter.search(searchTextPattern)>-1 );
  }

  render() {
    return (
      <div className="cust-editor__win" spellCheck="false"> 
        <textarea className="cust-editor__text-area cust-editor__flatten" 
          ref={(e) => this.elTextarea = e} 
          onInput={this.handleInputCode} 
          onPaste={this.handlePasteCode} 
          onKeyDown={this.handleKeyDown}/>
        <pre className="cust-editor__pre cust-editor__flatten" > 
          <code ref={(e) => this.elCode = e} className={`cust-editor__code language-${this.languageSyntax}`}> </code>
        </pre>
        {
          this.state.showDropdown && 
          <div className="cust-editor__drop-down" style={{top: this.state.dropDownTop, left: this.state.dropDownLeft}}>
            <ul>
              {
                this.state.searchList.map((filter) =>
                  <li key={filter.replace(/ /g, '')}>{filter}</li>
                )
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default CustomEditor;