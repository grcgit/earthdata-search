import React from 'react'
import PropTypes from 'prop-types'
import { TileLayer } from 'react-leaflet'
import moment from 'moment'

const LayerBuilderOpen = (props) => {
  const {
    projection,
    product,
    resolution,
    format,
    time
  } = props

  let date = ''
  if (time) {
    const yesterday = moment().subtract(1, 'days')

    date = yesterday.format('YYYY-MM-DD')
  }

  return (
    <TileLayer
      url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
      bounds={[
        [-89.9999, -179.9999],
        [89.9999, 179.9999]
      ]}
      tileSize={512}
      noWrap
      continuousWorld
    />
  )
}

LayerBuilderOpen.defaultProps = {
  time: false
}

LayerBuilderOpen.propTypes = {
  projection: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  resolution: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  time: PropTypes.bool
}

export default LayerBuilderOpen
