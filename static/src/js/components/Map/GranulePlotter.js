import React from 'react'
import PropTypes from 'prop-types'
import { ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import { getEarthdataConfig } from '../../../../../sharedUtils/config'

const GranulePlotter = (props) => {
  const {
    collectionsMetadata,
    focusedCollectionId,
    granules,
    granulesMetadata,
    isProjectPage,
    project,
    earthdataEnvironment
  } = props

  const layers = {}
  const overlays = []

  if (isProjectPage) {
    // If we are on the project page, return data for each project collection
    const { collections: projectCollections } = project
    const {
      allIds: projectIds,
      byId: projectById
    } = projectCollections

    projectIds.forEach((collectionId) => {
      const { granules, isVisible } = projectById[collectionId]
      const { [collectionId]: metadata = {} } = collectionsMetadata

      if (!granules) return
      granules.byId = {}

      const { allIds = [] } = granules
      allIds.forEach((granuleId) => {
        if (granulesMetadata[granuleId]) {
          granules.byId[granuleId] = granulesMetadata[granuleId]
        }
      })

      layers[collectionId] = {
        collectionId,
        metadata,
        isVisible,
        granules
      }
    })
  } else if (focusedCollectionId && focusedCollectionId !== '') {
    // If we aren't on the project page, return data for focusedCollectionId if it exists
    const { [focusedCollectionId]: focusedCollectionIdMetadata = {} } = collectionsMetadata

    layers[focusedCollectionId] = {
      collectionId: focusedCollectionId,
      isVisible: true,
      metadata: focusedCollectionIdMetadata,
      granules
    }
    if (layers[focusedCollectionId].granules.byId) {
      const collectionGranules = layers[focusedCollectionId].granules.byId
      const keys = Object.keys(collectionGranules)
      keys.forEach((key) => {
        if (collectionGranules[key].browseUrl) {
          const localimageSrc = `${getEarthdataConfig(earthdataEnvironment).cmrHost}/browse-scaler/browse_images/granules/${collectionGranules[key].id}?h=512&w=512`
          if (collectionGranules[key].boxes) {
            if (collectionGranules[key].boxes.length > 0) {
              const boundstext = collectionGranules[key].boxes[0].split(' ')
              const lat1 = parseFloat(boundstext[0])
              const lon1 = parseFloat(boundstext[1])
              const lat2 = parseFloat(boundstext[2])
              const lon2 = parseFloat(boundstext[3])
              const bounds = new L.LatLngBounds([lat1, lon1], [lat2, lon2])
              overlays.push(<ImageOverlay
                url={localimageSrc}
                bounds={bounds}
                opacity={0.5}
                zIndex={10}
              />)
            }
          } else if (collectionGranules[key].polygons) {
            if (collectionGranules[key].polygons.length > 0) {
              // need to get bounds from polygon points
              let latmin = 90
              let latmax = -90
              let lonmin = 180
              let lonmax = -180
              collectionGranules[key].polygons.forEach((poly) => {
                const polytext = poly[0].split(' ')
                for (let i = 0; i < polytext.length; i += 2) {
                  const lat = parseFloat(polytext[i])
                  if (lat < latmin) latmin = lat
                  if (lat > latmax) latmax = lat
                }
                for (let i = 1; i < polytext.length; i += 2) {
                  const lon = parseFloat(polytext[i])
                  if (lon < lonmin) lonmin = lon
                  if (lon > lonmax) lonmax = lon
                }
              })
              const bounds = new L.LatLngBounds([latmax, lonmin], [latmin, lonmax])
              overlays.push(<ImageOverlay
                url={localimageSrc}
                bounds={bounds}
                opacity={0.5}
                zIndex={10}
              />)
            }
          }
        }
      })
    }
  }

  return (
    <div>{overlays}</div>
  )
}

GranulePlotter.propTypes = {
  earthdataEnvironment: PropTypes.string.isRequired,
  collectionsMetadata: PropTypes.shape({}).isRequired,
  focusedCollectionId: PropTypes.string.isRequired,
  granules: PropTypes.shape({}).isRequired,
  granulesMetadata: PropTypes.shape({}).isRequired,
  isProjectPage: PropTypes.shape({}).isRequired,
  project: PropTypes.shape({}).isRequired
}

export default GranulePlotter
