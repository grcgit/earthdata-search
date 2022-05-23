import React from 'react'
import PropTypes from 'prop-types'
import { ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import { getApplicationConfig } from '../../../../../sharedUtils/config'

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
            const domain = window.location.origin.split(':')
            const { secureDDS } = getApplicationConfig()
            var protocol = "http"
            if(secureDDS){
                protocol = "https"
            }
            keys.forEach(key => {
                if (collectionGranules[key].browseUrl){
                    let localimageSrc = `${protocol}://${domain[1]}:8081/browse-scaler/browse_images/granules/${collectionGranules[key].id}?h=512&w=512`
                    if(collectionGranules[key].boxes){
                        if(collectionGranules[key].boxes.length > 0){
                            let boundstext = collectionGranules[key].boxes[0].split(" ")
                            let lat1 = parseFloat(boundstext[0])
                            let lon1 = parseFloat(boundstext[1])
                            let lat2 = parseFloat(boundstext[2])
                            let lon2 = parseFloat(boundstext[3])
                            let bounds = new L.LatLngBounds([lat1, lon1], [lat2, lon2])
                            overlays.push(<ImageOverlay url={localimageSrc} bounds={bounds} opacity={0.5} zIndex={10} />)
                        }
                    }else if (collectionGranules[key].polygons){
                        if (collectionGranules[key].polygons.length > 0){
                            //need to get bounds from polygon points
                            let latmin = 90
                            let latmax = -90
                            let lonmin = 180
                            let lonmax = -180
                            collectionGranules[key].polygons.forEach( function(poly) {
                                let polytext = poly[0].split(" ")
                                for(let i = 0; i < polytext.length; i=i+2){
                                    let lat = parseFloat(polytext[i])
                                    if(lat < latmin) latmin = lat
                                    if(lat > latmax) latmax = lat
                                }
                                for(let i = 1; i < polytext.length; i=i+2){
                                    let lon = parseFloat(polytext[i])
                                    if(lon < lonmin) lonmin = lon
                                    if(lon > lonmax) lonmax = lon
                                }
                            })
                            let bounds = new L.LatLngBounds([latmax, lonmin], [latmin, lonmax])
                            overlays.push(<ImageOverlay url={localimageSrc} bounds={bounds} opacity={0.5} zIndex={10} />)
                        }
                    }
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
