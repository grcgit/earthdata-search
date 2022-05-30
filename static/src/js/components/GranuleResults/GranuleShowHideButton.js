import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import actions from '../../actions/index'
import Button from '../Button/Button'

import { FaEyeSlash, FaEye } from 'react-icons/fa'

import './GranuleResultsDataLinksButton.scss'

const mapDispatchToProps = dispatch => ({
    onToggleGranuleVisibility:
      payload => dispatch(actions.toggleGranuleVisibilty(payload))
  })
  
const mapStateToProps = state => ({
    hiddenGranules: state.query.granuleVisiblity.hiddenGranules
})

export const GranuleShowHideButton = (props) => {
  const {
    granuleId,
    onToggleGranuleVisibility,
    hiddenGranules
  } = props

  const toggleVisibility = () => {
    onToggleGranuleVisibility(granuleId)
  }

  const hidden = () => {
    return hiddenGranules.includes(granuleId)
  }

  let label
  let icon
  if(hidden()){
    label = "Show"
    icon = FaEye
  }else{
    label = "Hide"
    icon = FaEyeSlash
  }

  return (
    <Button
      className="button granule-results-data-links-button__button"
      icon={icon}
      onClick={toggleVisibility}
      label={label}
    />
  )
}

GranuleShowHideButton.propTypes = {
  granuleId: PropTypes.string.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GranuleShowHideButton)
)
