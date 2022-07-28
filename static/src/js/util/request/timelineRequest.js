import CmrRequest from './cmrRequest'

import { getEarthdataConfig, getEnvironmentConfig } from '../../../../../sharedUtils/config'

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
      const { remoteCMR } = getApplicationConfig()
      if(remoteCMR){
        super(getEarthdataConfig(earthdataEnvironment).cmrHost, earthdataEnvironment)
      }else{
        const domain = window.location.origin.split(':')
        let cmrdomain = 'http:' + domain[1] + ':3003' 
        super(cmrdomain, earthdataEnvironment)
      }
      this.searchPath = 'granules/timeline'
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
