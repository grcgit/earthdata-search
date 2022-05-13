import { replace } from 'lodash';
import React, { Component } from 'react'
import {
  Form
} from 'react-bootstrap'

import './style.css'

const fetch = require('node-fetch');

class ContactModal extends Component {

    constructor(props) {
      super(props)
      this.state = {
        newname: '',
        name: '',
        email: ''
      }
    }
  
    requestData = async () => {
      const domain = window.location.origin.split(':')
      let url = this.props.url
      url = url.replace('http:','https:')
      let new_url = url.replace('//localhost',domain[1])
      const response = await fetch(new_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      
      if(response.ok){
        this.props.closeCallback();
      }
    };
  
    render() {
      const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            <p className='modal-title-group'> Submit Request for {this.props.name}</p>
            <div className='modal-form-d'>
                <Form.Group
                  controlId="contact-modal-name"
                >
                  <Form.Label className="modal-form" sm="auto">
                    Name
                  </Form.Label>
                  <Form.Control
                    name="Name"
                    size="m"
                    type="text"
                    placeholder="Your Name"
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)}
                  />
                </Form.Group>
            </div>
            <div className='modal-form-d'>
                <Form.Group
                  controlId="contact-modal-email"
                >
                  <Form.Label className="modal-form" sm="auto">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    name="Email Address"
                    size="m"
                    type="email"
                    placeholder="Your Email"
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                  />
                </Form.Group>
            </div>
            <div className='modal-button-d'>
              <button className='modal-button-request' onClick={this.requestData}>Request Data</button>
              <button className='modal-button-cancel' onClick={this.props.closeCallback}>Close</button>
            </div>
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
  
}

export default ContactModal