import {
  CLEAR_FILTERS,
  EXCLUDE_GRANULE_ID,
  INITIALIZE_COLLECTION_GRANULES_QUERY,
  RESTORE_FROM_URL,
  UNDO_EXCLUDE_GRANULE_ID,
  UPDATE_COLLECTION_QUERY,
  UPDATE_GRANULE_FILTERS,
  UPDATE_GRANULE_SEARCH_QUERY,
  UPDATE_REGION_QUERY,
  TOGGLE_GRANULE_VISIBILITY,
  CLEAR_GRANULE_VISIBILITY
} from '../constants/actionTypes'

const initialState = {
  collection: {
    byId: {},
    keyword: '',
    hasGranulesOrCwic: true,
    pageNum: 1,
    spatial: {},
    temporal: {},
    sortKey: ['-usage_score']
  },
  region: {
    exact: false
  },
  granuleVisiblity:{
    hiddenGranules: []
  }
}

export const initialGranuleState = {
  excludedGranuleIds: [],
  gridCoords: '',
  pageNum: 1,
  sortKey: '-start_date'
}

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COLLECTION_QUERY: {
      return {
        ...state,
        collection: {
          ...state.collection,
          ...action.payload
        }
      }
    }
    case CLEAR_GRANULE_VISIBILITY:{
      const { granuleVisiblity = {} } = state
      return{
        ...state,
        granuleVisiblity:{
          hiddenGranules: []
        }
      }
    }
    case TOGGLE_GRANULE_VISIBILITY: {
      const granuleId = action.payload

      const { granuleVisiblity = {} } = state

      if(granuleVisiblity.hiddenGranules.includes(granuleId)){
        const newHiddenGranules = granuleVisiblity.hiddenGranules.filter(granule => granule !== granuleId)
        return {
          ...state,
          granuleVisiblity:{
            hiddenGranules: newHiddenGranules
          }
        }
      }else{
        return {
          ...state,
          granuleVisiblity:{
            hiddenGranules: [...granuleVisiblity.hiddenGranules, granuleId]
          }
        }
      }
    }
    case INITIALIZE_COLLECTION_GRANULES_QUERY: {
      const collectionId = action.payload

      const { collection = {} } = state
      const { byId = {} } = collection
      const { [collectionId]: focusedCollection = {} } = byId
      const { granules: focusedCollectionGranules = {} } = focusedCollection

      return {
        ...state,
        collection: {
          ...state.collection,
          byId: {
            ...state.collection.byId,
            [collectionId]: {
              ...focusedCollection,
              granules: {
                ...initialGranuleState,
                ...focusedCollectionGranules
              }
            }
          }

        }
      }
    }
    // Updates the granule search query, throwing out all existing values
    case UPDATE_GRANULE_FILTERS: {
      const { payload } = action
      const {
        collectionId
      } = payload

      const { collection = {} } = state
      const { byId: collectionQueryById = {} } = collection
      const { [collectionId]: currentCollection = {} } = collectionQueryById

      return {
        ...state,
        collection: {
          ...state.collection,
          byId: {
            ...collectionQueryById,
            [collectionId]: {
              ...currentCollection,
              granules: {
                ...initialGranuleState,
                ...payload
              }
            }
          }
        }
      }
    }
    // Updates the granule search query, keeping existing values
    case UPDATE_GRANULE_SEARCH_QUERY: {
      const { payload } = action
      const {
        collectionId
      } = payload

      const { collection = {} } = state
      const { byId: collectionQueryById = {} } = collection
      const { [collectionId]: currentCollection = {} } = collectionQueryById
      const { granules = {} } = currentCollection

      return {
        ...state,
        collection: {
          ...state.collection,
          byId: {
            ...collectionQueryById,
            [collectionId]: {
              ...currentCollection,
              granules: {
                ...initialGranuleState,
                ...granules,
                ...payload
              }
            }
          }
        }
      }
    }
    case EXCLUDE_GRANULE_ID: {
      const { collectionId, granuleId } = action.payload

      const { collection = {} } = state
      const { byId = {} } = collection
      const { [collectionId]: focusedCollection = {} } = byId
      const { granules = {} } = focusedCollection
      const { excludedGranuleIds = [] } = granules

      return {
        ...state,
        collection: {
          ...collection,
          byId: {
            ...byId,
            [collectionId]: {
              ...focusedCollection,
              granules: {
                ...granules,
                excludedGranuleIds: [
                  ...excludedGranuleIds,
                  granuleId
                ],
                pageNum: 1
              }
            }
          }
        }
      }
    }
    case UNDO_EXCLUDE_GRANULE_ID: {
      const collectionId = action.payload

      const { collection = {} } = state
      const { byId = {} } = collection
      const { [collectionId]: focusedCollection = {} } = byId
      const { granules = {} } = focusedCollection
      const { excludedGranuleIds = [] } = granules

      excludedGranuleIds.pop()

      return {
        ...state,
        collection: {
          ...collection,
          byId: {
            ...byId,
            [collectionId]: {
              ...focusedCollection,
              granules: {
                ...granules,
                excludedGranuleIds
              }
            }
          }
        }
      }
    }
    case UPDATE_REGION_QUERY: {
      return {
        ...state,
        region: {
          ...state.region,
          ...action.payload
        }
      }
    }
    case RESTORE_FROM_URL: {
      const { query } = action.payload

      return {
        ...state,
        ...query,
        collection: {
          ...initialState.collection,
          ...query.collection
        }
      }
    }
    case CLEAR_FILTERS: {
      return initialState
    }
    default:
      return state
  }
}

export default queryReducer
