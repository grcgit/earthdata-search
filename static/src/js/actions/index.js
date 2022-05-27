/* eslint-disable import/no-cycle */
import { adminIsAuthorized } from './admin/isAuthorized'
import {
  adminViewRetrieval,
  fetchAdminRetrievals,
  fetchAdminRetrieval,
  updateAdminRetrievalsSortKey,
  updateAdminRetrievalsPageNum
} from './admin/retrievals'
import {
  updateAdvancedSearch
} from './advancedSearch'
import {
  getCollections,
  clearFocusedCollectionGranuleFilters,
  updateFocusedCollectionGranuleFilters,
  updateCollectionMetadata
} from './collections'
import {
  changeFocusedCollection,
  getFocusedCollection,
  getCollectionSubscriptions,
  updateFocusedCollection,
  viewCollectionGranules,
  viewCollectionDetails
} from './focusedCollection'
import {
  applyGranuleFilters,
  clearGranuleFilters,
  excludeGranule,
  fetchRetrievalCollectionGranuleLinks,
  getProjectGranules,
  getSearchGranules,
  initializeCollectionGranulesQuery,
  initializeCollectionGranulesResults,
  onExcludeGranule,
  undoExcludeGranule,
  updateGranuleMetadata,
  updateGranuleResults,
  toggleGranuleVisibilty,
  clearGranuleVisibilty
} from './granules'
import {
  logout,
  updateAuthToken
} from './authToken'
import {
  changeTimelineQuery,
  getTimeline
} from './timeline'
import {
  changeCollectionPageNum,
  changeGranulePageNum,
  changeProjectQuery,
  changeRegionQuery,
  changeQuery,
  clearFilters,
  removeSpatialFilter,
  removeTemporalFilter,
  updateGranuleSearchQuery,
  updateRegionQuery
} from './search'
import { changeMap } from './map'
import {
  changeUrl,
  changePath,
  updateStore
} from './urlQuery'
import {
  addCmrFacet,
  changeCmrFacet,
  changeFeatureFacet,
  removeCmrFacet,
  updateCmrFacet,
  updateFeatureFacet
} from './facets'
import {
  toggleAdvancedSearchModal,
  toggleAboutCSDAModal,
  toggleAboutCwicModal,
  toggleChunkedOrderModal,
  toggleDrawingNewLayer,
  toggleFacetsModal,
  toggleContactModal,
  toggleOverrideTemporalModal,
  toggleRelatedUrlsModal,
  toggleSecondaryOverlayPanel,
  toggleShapefileUploadModal,
  toggleSpatialPolygonWarning,
  toggleTooManyPointsModal,
  toggleKeyboardShortcutsModal,
  toggleTimeline
} from './ui'
import {
  applyViewAllFacets,
  getViewAllFacets,
  changeViewAllFacet,
  triggerViewAllFacets
} from './viewAllFacets'
import {
  changeFocusedGranule,
  getFocusedGranule,
  updateFocusedGranule
} from './focusedGranule'
import {
  togglePanels,
  setActivePanel,
  setActivePanelGroup,
  setActivePanelSection
} from './panels'
import {
  addAccessMethods,
  addCollectionToProject,
  addGranuleToProjectCollection,
  addProjectCollection,
  changeProjectGranulePageNum,
  getProjectCollections,
  removeCollectionFromProject,
  removeGranuleFromProjectCollection,
  restoreProject,
  selectAccessMethod,
  toggleCollectionVisibility,
  updateAccessMethod,
  updateProjectGranuleParams
} from './project'
import {
  fetchProviders
} from './providers'
import {
  getRegions
} from './regions'
import {
  fetchRetrieval,
  submitRetrieval,
  deleteRetrieval
} from './retrieval'
import { fetchRetrievalHistory } from './retrievalHistory'
import {
  fetchAccessMethods
} from './accessMethods'
import {
  clearShapefile,
  fetchShapefile,
  saveShapefile,
  shapefileErrored,
  shapefileLoading,
  updateShapefile
} from './shapefiles'
import { fetchRetrievalCollection } from './retrievalCollection'
import { loadPortalConfig } from './portals'
import { fetchDataQualitySummaries } from './dataQualitySummaries'
import { deleteSavedProject, updateProjectName, updateSavedProject } from './savedProject'
import { fetchSavedProjects, setSavedProjects } from './savedProjects'
import { handleError, removeError } from './errors'
import { updateBrowserVersion } from './browser'
import { collectionRelevancyMetrics } from './relevancy'
import {
  fetchContactInfo,
  setContactInfoFromJwt,
  updateNotificationLevel
} from './contactInfo'
import {
  cancelAutocomplete,
  clearAutocompleteSelected,
  clearAutocompleteSuggestions,
  deleteAutocompleteValue,
  fetchAutocomplete,
  removeAutocompleteValue,
  selectAutocompleteSuggestion
} from './autocomplete'
import {
  setIsSubmitting,
  setPreferences,
  setPreferencesFromJwt,
  updatePreferences
} from './preferences'
import {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
  deleteCollectionSubscription,
  updateSubscription,
  updateCollectionSubscription
} from './subscriptions'
import { setUserFromJwt } from './user'
import { exportSearch } from './exportSearch'
import { fetchSotoLayers } from './handoffs'

const actions = {
  addAccessMethods,
  addCmrFacet,
  addCollectionToProject,
  addGranuleToProjectCollection,
  addProjectCollection,
  adminIsAuthorized,
  adminViewRetrieval,
  applyGranuleFilters,
  applyViewAllFacets,
  cancelAutocomplete,
  changeCmrFacet,
  changeCollectionPageNum,
  changeFeatureFacet,
  changeFocusedCollection,
  changeFocusedGranule,
  changeGranulePageNum,
  changeMap,
  changePath,
  changeProjectGranulePageNum,
  changeProjectQuery,
  changeQuery,
  changeRegionQuery,
  changeTimelineQuery,
  changeUrl,
  changeViewAllFacet,
  clearAutocompleteSelected,
  clearAutocompleteSuggestions,
  clearFocusedCollectionGranuleFilters,
  clearGranuleFilters,
  clearGranuleVisibilty,
  clearFilters,
  clearShapefile,
  collectionRelevancyMetrics,
  createSubscription,
  deleteAutocompleteValue,
  deleteCollectionSubscription,
  deleteRetrieval,
  deleteSavedProject,
  deleteSubscription,
  excludeGranule,
  exportSearch,
  fetchAccessMethods,
  fetchAdminRetrieval,
  fetchAdminRetrievals,
  fetchAutocomplete,
  fetchContactInfo,
  fetchDataQualitySummaries,
  fetchProviders,
  fetchRetrieval,
  fetchRetrievalCollection,
  fetchRetrievalCollectionGranuleLinks,
  fetchRetrievalHistory,
  fetchSotoLayers,
  fetchSavedProjects,
  fetchShapefile,
  getCollections,
  getFocusedCollection,
  getCollectionSubscriptions,
  getFocusedGranule,
  getProjectCollections,
  getProjectGranules,
  getRegions,
  getSearchGranules,
  getSubscriptions,
  getTimeline,
  getViewAllFacets,
  handleError,
  initializeCollectionGranulesQuery,
  initializeCollectionGranulesResults,
  loadPortalConfig,
  logout,
  onExcludeGranule,
  removeAutocompleteValue,
  removeCmrFacet,
  removeCollectionFromProject,
  removeError,
  removeGranuleFromProjectCollection,
  removeSpatialFilter,
  removeTemporalFilter,
  restoreProject,
  saveShapefile,
  selectAccessMethod,
  selectAutocompleteSuggestion,
  setActivePanel,
  setActivePanelGroup,
  setActivePanelSection,
  setContactInfoFromJwt,
  setIsSubmitting,
  setPreferences,
  setPreferencesFromJwt,
  setSavedProjects,
  setUserFromJwt,
  shapefileErrored,
  shapefileLoading,
  submitRetrieval,
  toggleAboutCSDAModal,
  toggleAboutCwicModal,
  toggleAdvancedSearchModal,
  toggleChunkedOrderModal,
  toggleCollectionVisibility,
  toggleDrawingNewLayer,
  toggleFacetsModal,
  toggleGranuleVisibilty,
  toggleContactModal,
  toggleKeyboardShortcutsModal,
  toggleOverrideTemporalModal,
  togglePanels,
  toggleRelatedUrlsModal,
  toggleSecondaryOverlayPanel,
  toggleShapefileUploadModal,
  toggleSpatialPolygonWarning,
  toggleTimeline,
  toggleTooManyPointsModal,
  triggerViewAllFacets,
  undoExcludeGranule,
  updateAccessMethod,
  updateAdminRetrievalsPageNum,
  updateAdminRetrievalsSortKey,
  updateAdvancedSearch,
  updateAuthToken,
  updateBrowserVersion,
  updateCmrFacet,
  updateCollectionMetadata,
  updateCollectionSubscription,
  updateFeatureFacet,
  updateFocusedCollection,
  updateFocusedCollectionGranuleFilters,
  updateFocusedGranule,
  updateGranuleMetadata,
  updateGranuleResults,
  updateGranuleSearchQuery,
  updateNotificationLevel,
  updatePreferences,
  updateProjectGranuleParams,
  updateProjectName,
  updateRegionQuery,
  updateSavedProject,
  updateShapefile,
  updateStore,
  updateSubscription,
  viewCollectionDetails,
  viewCollectionGranules
}

export default actions
