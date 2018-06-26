
import React from 'react';

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
    this.htmlEl = null;
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this;
    if (!htmlEl) {
      return true;
    }
    if (stripNbsp(nextProps.html) !== stripNbsp(htmlEl.innerHTML) && nextProps.html !== props.html) {
      return true;
    }
    let optional = ['style', 'className', 'disabled', 'tagName'];
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(event) {
    console.log(event.key)
    var data = { ...event,
      target: { 
        value: this.htmlEl.innerHTML,
        key: event.key
      } 
    }
    this.props.onChange(data);
  }

  render() {
    var { tagName, html, ...props } = this.props;
    return ( <textarea {...props} ref={(e) => this.htmlEl = e} onInput={this.emitChange}
      onBlur={this.props.onBlur || this.emitChange} 
      value={'html'}>
      {this.props.children}
    </textarea>);
  }

}