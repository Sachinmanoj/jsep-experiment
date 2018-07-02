import React, { Component } from 'react';
import Prism from 'prismjs';
import getCaretCoordinates from 'textarea-caret';
import jsep from 'jsep';

import {escape_html} from './utils/html-escape';
import {
  customfilterSyntax, 
  filters, 
  separtors, 
  allowedBinaryExpression,
  errorsCodes,
} from '../../constants/constants';

import './CustomEditor.css'

class CustomEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      dropDownTop: 0,
      dropDownLeft: 0,
      searchList: [],
      selectedSearchListIndex: 0,
      searchText: null,
      searchTextPos: null,
      evalResult: ''
    }

    this.opts = {
      tabSize: 2,
    }
    this.activeToken = null;
    this.codeKeyHandle = {
      pasted: false,
      spaceEnteredOnSearch: false,
      isEnterKey: false,
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

    this.onTextSelection = this.onTextSelection.bind(this);
    this.handlePasteCode = this.handlePasteCode.bind(this);
    this.handleInputCode = this.handleInputCode.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);

    this.evalExpression = this.evalExpression.bind(this);

    this.code = null;
    this.codeHTML = null;
  }

  getFilterDisplay(filtersArr) {
    return filtersArr.map((fil) => {
      return fil.display;
    });
  }

  getFilterLabel(filtersArr, keyword) {
    const index = filtersArr.findIndex((fil) => fil.display === keyword);
    return filtersArr[index].label;
  }

  createFilterRegex(filtersArr) {
    filtersArr = this.getFilterDisplay(filtersArr);
    filtersArr.sort(function(a, b){
      return b.length - a.length;
    });
    return filtersArr.join('|');
  }

  updateCustomFilterKeyWords() {
    let regexpress = `(?:${this.createFilterRegex([...filters])})`;
    return new RegExp(regexpress);
  }

  updateCustomFilterErrors() {
    let regexpress = `([\\S]){1,61}`;     // MUST REPLACE TODO ON ACTUAL 61 -- 
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

  handleEnter(e) {
    const enterCode = 13;
    if(this.state.showDropdown || e.keyCode !== enterCode) {
      return;
    }
    this.codeKeyHandle.isEnterKey = true;
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

/**  
 * // activeRegexCode.lastIndex = searchTextObj.textPos; { --> PRISM JS is resetting the lastIndex to Zero always <-- }
  // TODO SO........... HACKY...... Avoiding the last close index reset operation in Prism JS

    activeCodeLastIndex(value) {
      var codeGram = {
        set lastIndex(settingValue) {
          this.val = value
        },
        val: value
      }
      return codeGram;
    }
 
    activeRegexGrammer(searchTextObj) {
      let activeRegexCode = new RegExp(`(?:${searchTextObj.searchText})`, 'y');
      activeRegexCode = Object.assign(activeRegexCode, this.activeCodeLastIndex(searchTextObj.textPos));  
      activeRegexCode.lastIndex = -12;
      return activeRegexCode;
    }
*/

  updateCodeWithSearchResult(value, searchTextObj) {
    this.updateCode(value);
    const syntaxGrammer = { 
      // active: this.activeRegexGrammer(searchTextObj),
      ...this.syntaxRegex 
    }
    this.elCode.innerHTML = Prism.highlight(value, syntaxGrammer);
  }

  handleInputCode(e) { 
    let value = e.target.value;
    const selectionStart = this.elTextarea.selectionStart;
    let searchTextObj = this.getSearchText(value, selectionStart);
    let searchTextResult = this.canSearch(searchTextObj.searchText) ? 
        this.getSearchResults(searchTextObj.searchText) : [];    
    var caret = getCaretCoordinates(this.elTextarea, this.elTextarea.selectionEnd);

    if(searchTextResult.length > 0) {
      this.setState({
        showDropdown: true,
        dropDownTop: (caret.top + caret.height) - this.elTextarea.scrollTop, // MUST REPLACE TODO ON ACTUAL 36 and others --
        dropDownLeft: caret.left - this.elTextarea.scrollLeft, //searchTextObj.textPos * 12.5 + 13, // MUST REPLACE TODO ON ACTUAL 13 -- 
        searchList: [...searchTextResult],
        selectedSearchListIndex: 0,
        searchText: searchTextObj.searchText,
        searchTextPos: searchTextObj.textPos,
      }, () => {
        this.updateCodeWithSearchResult(value, searchTextObj)
      });
    }
    else {
      this.hideDropdown(() => this.updateCodeAndHighlight(value));
    }
  }

  handleKeyDown(e) {
    this.codeKeyHandle.pasted = false;
    this.codeKeyHandle.spaceEnteredOnSearch = false;
    this.codeKeyHandle.isEnterKey = false;
    this.handleDropdownOptions(e);
    this.handleTabs(e);
    this.handleClosingCharacters(e);
    this.handleOperators(e);
    this.handleSpace(e);
    this.handleEnter(e);
  }

  handleOnScroll(e) {
    this.elCode.style.transform = `translate3d(-${e.target.scrollLeft}px, -${e.target.scrollTop}px, 0)`;
  };


  /** -------------- SEARCH OPERATIONS - START --------------- */

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
      tokenIndex: tokIndex,
      completeLengthParsed: sumLength
    };
  }

  getSearchText(text, selectionStart) {
    const currentChar = text.charAt(selectionStart-1)
    const isSeparator = separtors.includes(currentChar);
    if(isSeparator && this.activeToken === null) {
      return {};
    }
    let tokenValue = this.getTockenOfChar(text, selectionStart);
    if(this.activeToken === null && (!tokenValue.token || tokenValue.token.type === 'keyword')) {
      return {};
    }
    else if(this.activeToken !== null) {
      let tokStr = tokenValue.tokens.slice(this.activeToken, tokenValue.tokenIndex + 1);
      let isAllSearchable = tokStr.length > 1 && tokStr.every((tok) => (typeof tok === 'string' || tok.type !== 'keyword'));
      if(isAllSearchable) {
        const searchText = tokStr.reduce((str, tok) => tok.content ? str + tok.content : str + tok, '');
        const textPos = tokenValue.completeLengthParsed - searchText.length;
        return {
          searchText,
          textPos
        }
      }
    }
    this.activeToken = tokenValue.tokenIndex;
    const searchText = tokenValue.token.content ? tokenValue.token.content : tokenValue.token;
    const textPos = tokenValue.completeLengthParsed - searchText.length;
    return {
      searchText,
      textPos 
    }
  }

  canSearch(searchText) {
    return !this.codeKeyHandle.pasted
      && !this.codeKeyHandle.isEnterKey
      && typeof searchText !== 'undefined'
      && searchText.replace(/ /g, '').length > 0;
  }

  getSearchResults(searchText){
    const searchTextPattern = new RegExp(searchText.replace(/[^a-z A-Z 0-9 %]/g,''),'gi'); 
    let filterArray = filters.filter( childFilter => childFilter['display'].search(searchTextPattern)>-1 || (childFilter['def'] && childFilter['def'].search(searchTextPattern)>-1)  );
    return this.getFilterDisplay(filterArray);
  }

  /** -------------- SEARCH OPERATIONS - END --------------- */

  
  /** -------------- DROPDOWN LIST OPERATIONS - START --------------- */

  updateTheSearchOptionIndex(index) {
    if(index >= 0 && index < this.state.searchList.length) {
      this.setActiveTextOptionSelection(index, () => {
        let elem = document.getElementById("cust-editor__id-" + index);
        return elem ? elem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        }) : null;
      });
    }
  }

  handleDropdownOptions(e) {
    if(this.state.showDropdown) {
      switch(e.keyCode) {

        case 40: // ArrowDown
          this.updateTheSearchOptionIndex(this.state.selectedSearchListIndex + 1);
          e.preventDefault();
          return true;
  
        case 38: // ArrowUp
          this.updateTheSearchOptionIndex(this.state.selectedSearchListIndex - 1);
          e.preventDefault();
          return true;
  
        case 27: // Escape
          this.hideDropdown();
          e.preventDefault();
          return true;
  
        case 13: // Enter
          this.onTextSelection(this.state.selectedSearchListIndex);
          e.preventDefault();
          return true;
  
        default:
          return false;
      }
    }
    return false;
  }

  setActiveTextOptionSelection(index, callback = () => {}) {
    this.setState({
      selectedSearchListIndex: index
    }, callback);
  }

  onTextSelection(index) {
    let searchedStr = this.state.searchList[index];
    let newCode = this.code.slice(0, this.state.searchTextPos) + 
      this.code.slice(this.state.searchTextPos).replace(this.state.searchText, searchedStr);
    this.hideDropdown(() => this.updateCodeAndHighlight(newCode));
  }

  /** -------------- DROPDOWN LIST OPERATIONS - END --------------- */


  /** -------------- EXPRESSION EVALUATION - START --------------- */

  configureJSEP () {
    var binaryExp = allowedBinaryExpression;
    jsep.removeAllUnaryOps();
    jsep.removeAllBinaryOps();
    Object.keys(binaryExp).forEach(exp => {
      jsep.addBinaryOp(exp, binaryExp[exp].precedence);
    });
  }


  inOrderTraversalCheck(tree) {
    switch(tree.type) {

      case "Literal": 
        return;

      case "BinaryExpression": 
        if (!tree.left || !tree.right) {
          throw errorsCodes.unaryNotAllowed;
        }
        this.inOrderTraversalCheck(tree.left);
        this.inOrderTraversalCheck(tree.right);
        return;

      default:
        throw errorsCodes.invalidBodmas;
    }
  }

  checkExpressionEval(tree) {
    switch(tree.type) {

      case "Compound": 
        // return this.findCompoundExpressionError(tree.body); TODO MUST FOR PROD
        return { 
          success: false,
          errorCode: errorsCodes.compoundExpressionNotallowed
        };

      case "Literal": 
        return { success: true };

      case "BinaryExpression": 
        this.inOrderTraversalCheck(tree);
        return { success: true };

      default:
        return { // ------> Should never occur 
          success: false,
          errorCode: errorsCodes.invalidExpression
        };    
    }
  }

  bodmasEval(expression) {
    this.configureJSEP();
    let treeFormat = jsep(expression);
    let checkStatus = this.checkExpressionEval(treeFormat);
    if(!checkStatus.success) {
      throw checkStatus.errorCode;
    }
    return expression.replace(/"/g, '');
  }

  getParsedExression() {
    var expression = Prism.tokenize(this.code, this.syntaxRegex);
    return expression.reduce((expStr, token) => {
      
      if (typeof token === 'string') {
        return expStr;
      }
      else if (token.type === "error") { 
        throw errorsCodes.invalidFilters;
      }
      else if (token.type === "keyword") {
        return `${expStr}"${this.getFilterLabel(filters, token.content)}" `;
      }
      else {
        return expStr + token.content + ' ';
      }
      
    }, '');
  }

  removeEmptyBrackets(exp) {
    let expArr = exp.split('');
    let bracketStack = [];
    return expArr.reduce((str, char) => {
      switch(char){

        case '(': 
          bracketStack.push(char);
          return str;

        case ')':
          if(bracketStack.length > 0 ) {
            bracketStack.pop();
          }
          else {
            str = str + char;
          }
          return str;

        case ' ':
          return bracketStack.length > 0 ? str : str + char;

        default : 
          str = str + bracketStack.join(' ') + char;
          bracketStack = [];
          return str;
      }
    }, '');
  }
  
  evalExpression() {
    if(this.code === null || this.code.length < 1) {
      return;
    }
    try{
      var backEndExp = this.getParsedExression();
      var fianlExpression = this.bodmasEval(backEndExp);
      fianlExpression = this.removeEmptyBrackets(fianlExpression);
      this.hideDropdown(() => {
        this.setState({
          evalResult: fianlExpression
        });
      });
    }
    catch(err) {
      this.hideDropdown(() => {
        this.setState({
          evalResult: JSON.stringify(err) + "  <--->  " + backEndExp
        });
      });
    }
  }

  /** -------------- EXPRESSION EVALUATION - END --------------- */


  render() {
    return (
      <div>
        <div className="cust-editor__win">
          <div className="cust-editor__container" spellCheck="false"> 
            <textarea className="cust-editor__text-area cust-editor__flatten cust-editor__wrap"
              ref={(e) => this.elTextarea = e} 
              onInput={this.handleInputCode} 
              onPaste={this.handlePasteCode} 
              onKeyDown={this.handleKeyDown}
              onScroll={this.handleOnScroll}/>
            <pre className="cust-editor__pre cust-editor__flatten cust-editor__wrap" > 
              <code ref={(e) => this.elCode = e} className={`cust-editor__code language-${this.languageSyntax}`}> </code>
            </pre>
          </div>
          {
            this.state.showDropdown && 
            <div className="cust-editor__drop-down" style={{top: this.state.dropDownTop, left: this.state.dropDownLeft}}>
              <ul>
                {
                  this.state.searchList.map((filter, index) =>
                    <li id={'cust-editor__id-' + index} className={this.state.selectedSearchListIndex === index ? 'selected' : ''} 
                      onMouseEnter={() => this.setActiveTextOptionSelection(index)} 
                      onMouseDown={() => this.onTextSelection(index)} key={filter.replace(/ /g, '')}>
                      {filter}
                    </li>
                  )
                }
              </ul>
            </div>
          }
        </div>
        <div className="eval__div"> 
          <p className="eval__value">{this.state.evalResult}</p>
          <button className="eval__btn" onClick={this.evalExpression}> Evaluate </button>
        </div>
      </div>
    );
  }
}

export default CustomEditor;