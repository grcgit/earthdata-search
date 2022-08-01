import CmrRequest from './cmrRequest'

import { getEnvironmentConfig, getEarthdataConfig } from '../../../../../sharedUtils/config'

/**
 * Request object for timeline specific requests
 */
export default class TimelineRequest extends CmrRequest {
  constructor(authToken, earthdataEnvironment) {
    if (authToken && authToken !== '') {
      super(getEnvironmentConfig().apiHost, earthdataEnvironment)

      this.authenticated = true
      this.authToken = authToken
      this.searchPath = 'granules/timeline'
    } else {
      super(getEarthdataConfig(earthdataEnvironment).cmrHost, earthdataEnvironment)
      // const domain = window.location.origin.split(':')
      // const cmrdomain = `http:${domain[1]}:3003`
      // super(cmrdomain, earthdataEnvironment)

      this.searchPath = 'search/granules/timeline'
    }
  }

  permittedCmrKeys() {
    return [
      'concept_id',
      'end_date',
      'interval',
      'start_date'
    ]
  }

  nonIndexedKeys() {
    return [
      'concept_id'
    ]
  }
}
