import React, { Component } from 'react'

import './style.css'

const fetch = require('node-fetch');

class ContactModal extends Component {

    constructor(props) {
      super(props)
      this.state = {
        name: '',
        email: '',
        message: ''
      }
    }
  
    requestData = async () => { 
      const response = await fetch(this.props.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      const data = await response.json();
    };
  
    render() {
      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
      // const showHideClassName = "modal display-block"
      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            <p>
            {this.props.url}
            </p>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
            </div>
            <button onClick={this.props.closeCallback}>Close</button>
            <button onClick={this.requestData}>Request Data</button>
          </section>
        </div>
      );
    }
  
    onNameChange(event) {
      this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
      this.setState({email: event.target.value})
    }
  
    onMessageChange(event) {
      this.setState({message: event.target.value})
    }
}

export default ContactModal