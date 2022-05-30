import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import actions from '../../actions/index'
import Button from '../Button/Button'
import { getFocusedCollectionGranuleResults } from '../../selectors/collectionResults'
import { getGranulesMetadata } from '../../selectors/granuleMetadata'

import { FaEyeSlash, FaEye } from 'react-icons/fa'

import './GranuleResultsDataLinksButton.scss'

const mapDispatchToProps = dispatch => ({
    onToggleGranuleVisibility:
      payload => dispatch(actions.toggleGranuleVisibilty(payload)),
    onClearGranuleVisibility:
      () => dispatch(actions.clearGranuleVisibilty())
  })
  
const mapStateToProps = state => ({
    granuleSearchResults: getFocusedCollectionGranuleResults(state)
})

export const GranuleShowHideAll = (props) => {
  const {
    onToggleGranuleVisibility,
    onClearGranuleVisibility,
    granuleSearchResults
  } = props

  const {allIds} = granuleSearchResults

  const showAll = () => {
    onClearGranuleVisibility()
  }

  const hideAll = () => {
    if(allIds){
      onClearGranuleVisibility()
      allIds.forEach((granuleId) => {
        onToggleGranuleVisibility(granuleId)
      })
    }
  }

  if(allIds && allIds.length > 0){
    return (
      <div>
        <Button
          className="button granule-results-data-links-button__button"
          icon={FaEye}
          onClick={showAll}
          label="Show All"
        />
        <Button
          className="button granule-results-data-links-button__button"
          icon={FaEyeSlash}
          onClick={hideAll}
          label="Hide All"
        />
      </div>
    )
  }else{
    return(<div />)
  }
}

GranuleShowHideAll.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GranuleShowHideAll)
