import React from 'react'
import { TileLayer } from 'react-leaflet'

const LayerBuilderOpen = () => (
  <TileLayer
    url={'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
    bounds={[
      [-89.9999, -179.9999],
      [89.9999, 179.9999]
    ]}
    tileSize={512}
    noWrap
    continuousWorld
  />
)

export default LayerBuilderOpen
