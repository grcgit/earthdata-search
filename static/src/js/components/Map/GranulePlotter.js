import React from 'react'
import PropTypes from 'prop-types'
import { ImageOverlay } from 'react-leaflet'
import L from 'leaflet'

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

const GranulePlotter = (props) => {
    const {
        collectionsMetadata,
        focusedCollectionId,
        granules,
        granulesMetadata,
        isProjectPage,
        project
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

        projectIds.forEach((collectionId, index) => {
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
        if (layers[focusedCollectionId].granules.byId){
            var collectionGranules = layers[focusedCollectionId].granules.byId
            var keys = Object.keys(collectionGranules)
            keys.forEach(key => {
                if (collectionGranules[key].browseUrl){
                    let localimageSrc = `http://localhost:8081/browse-scaler/browse_images/granules/${collectionGranules[key].id}?h=512&w=512`
                    let boundstext = collectionGranules[key].boxes[0].split(" ")
                    let lat1 = parseFloat(boundstext[0])
                    let lon1 = parseFloat(boundstext[1])
                    let lat2 = parseFloat(boundstext[2])
                    let lon2 = parseFloat(boundstext[3])
                    let bounds = new L.LatLngBounds([lat1, lon1], [lat2, lon2])
                    overlays.push(<ImageOverlay url={localimageSrc} bounds={bounds} opacity={0.5} zIndex={10} />)
                }
            });
        }
    }

    return (
        <div>{overlays}</div>
    )
}

GranulePlotter.defaultProps = {
  time: false
}

GranulePlotter.propTypes = {
  time: PropTypes.bool
}

export default GranulePlotter
