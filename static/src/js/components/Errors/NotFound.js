import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import { eventEmitter } from '../../events/events'
import LoggerRequest from '../../util/request/loggerRequest'
import { locationPropType } from '../../util/propTypes/location'

import { getApplicationConfig } from '../../../../../sharedUtils/config'

const { getPortalConfig } = require('../../util/portals')

const {
  defaultPortal,
} = getApplicationConfig()

const portalConfig = getPortalConfig(defaultPortal)

var supportEmail = "support@email.com"

if(portalConfig.supportEmail){
  supportEmail = portalConfig.supportEmail
}

class NotFound extends Component {
  componentWillMount() {
    eventEmitter.emit('error.global', true)
  }

  componentWillUnmount() {
    eventEmitter.emit('error.global', false)
  }

  render() {
    const { location } = this.props
    const guid = uuidv4()

    const requestObject = new LoggerRequest()
    requestObject.log({
      error: {
        guid,
        message: '404 Not Found',
        location
      }
    })

    const mailTo = `mailto:${supportEmail}`

    return (
      // <div className="wrap">
      <div>
        <h1>Sorry! The page you were looking for does not exist.</h1>
        <p>
          Please refer to the ID
          {' '}
          <strong>
            {guid}
          </strong>
          {' '}
          when contacting
          {' '}
          <a href={mailTo}>Support</a>
          .
        </p>
        <p>
          <a href="/">Click here</a>
          {' '}
          to return to the home page.
        </p>
        <div className="earth">
          <div className="orbit" />
        </div>
      </div>
    )
  }
}

NotFound.propTypes = {
  location: locationPropType.isRequired
}

export default NotFound
