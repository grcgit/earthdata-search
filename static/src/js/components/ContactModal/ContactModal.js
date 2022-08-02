import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form
} from 'react-bootstrap'

import './style.css'

const fetch = require('node-fetch')

class ContactModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userEmail: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ userEmail: event.target.value })
  }

  requestData = async () => {
    const {
      url,
      closeCallback
    } = this.props

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })

    if (response.ok) {
      closeCallback()
    }
  }

  render() {
    const {
      show,
      name,
      closeCallback
    } = this.props

    const {
      userName,
      userEmail
    } = this.state

    const showHideClassName = show ? 'modal display-block' : 'modal display-none'
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <p className="modal-title-group">
            {' '}
Submit Request for
            {' '}
            {name}
          </p>
          <div className="modal-form-d">
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
                value={userName}
                onChange={this.onNameChange}
              />
            </Form.Group>
          </div>
          <div className="modal-form-d">
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
                value={userEmail}
                onChange={this.onEmailChange}
              />
            </Form.Group>
          </div>
          <div className="modal-button-d">
            <button className="modal-button-request modal-button" type="button" onClick={this.requestData}>Request Data</button>
            <button className="modal-button-cancel modal-button" type="button" onClick={closeCallback}>Close</button>
          </div>
        </section>
      </div>
    )
  }
}

ContactModal.propTypes = {
  url: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  closeCallback: PropTypes.func.isRequired
}

export default ContactModal
