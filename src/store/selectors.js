import { createSelector } from 'reselect';
import { find, get } from 'lodash';

export const getChecklistsState = state => state.checklists;
export const getBaseState = state => state.base;
export const getAuthState = state => state.auth;
export const getXlsxImportedState = state => state.xlsxImported;
export const getxlsxOpportunityImportedState = state => state.xlsxOpportunityImported;
export const getSearchCriteriaState = state => state.searchCriteria;
export const getExportPDFState = state => state.exportPdf;
export const getStoreSearch = state => state.stores;
export const getCountries = state => state.countries;
export const getAreas = state => state.areas;
export const getLocale = state => state.localizations;
export const getCurrentLocale = state => state.selectedLocales.selectedLocale;
export const getAvailableLocales = state => state.locale;
export const getSelectedLocales = state => state.selectedLocales;
export const getEquipment = state => state.equipment;
export const addedEquipment = state => state.newEquipment;

export const selectAllChecklists = createSelector(getChecklistsState, checklistsState => checklistsState.data);
export const selectCurrentChecklistId = createSelector(
  getChecklistsState,
  checklistsState => checklistsState.currentChecklistId,
);
export const selectCurrentChecklist = createSelector(
  [selectAllChecklists, selectCurrentChecklistId],
  (checklists, id) => find(checklists, checklist => checklist.id === id),
);

export const selectXlsxImportState = createSelector(getXlsxImportedState, state => state.base64Excel);
export const selectXlsxValidation = createSelector(getXlsxImportedState, state => state.validation);

export const selectXlsxOpportunityImportState = createSelector(
  getxlsxOpportunityImportedState,
  state => state.base64Excel,
);
export const selectXlsxOpportunityValidation = createSelector(
  getxlsxOpportunityImportedState,
  state => state.validation,
);
export const selectSearchCriteriaCategories = createSelector(
  getSearchCriteriaState,
  searchCriteriaState => searchCriteriaState.names,
);

export const selectExportPdfValidation = createSelector(getExportPDFState, exportPDFState => exportPDFState.validation);
export const selectExportPdfFile = createSelector(getExportPDFState, exportPDFState =>
  get(exportPDFState, 'file.presignedUrl'),
);
export const selectExportPdfStatus = createSelector(getExportPDFState, exportPDFState => exportPDFState.loadingStatus);

export const selectStores = createSelector(getStoreSearch, state => state.data);

export const selectCountries = createSelector(getCountries, state => state.data);
export const selectAreas = createSelector(getAreas, state => state.data);

export const selectLocales = createSelector(getAvailableLocales, state => state.data || []);
export const selectEquipment = createSelector(getEquipment, state => state.data);

export const selectNewEquipment = createSelector(addedEquipment, getEquipment);

export const selectLocale = createSelector(getLocale, locales => locales);
export const selectAdminLocale = createSelector(getLocale, locales => locales.selectedLocale);
const RTL_LOCALES = ['he-', 'ar-'];
export const selectIsRTL = createSelector(
  selectAdminLocale,
  selectedLocale => Boolean(selectedLocale) && Boolean(RTL_LOCALES.find(locale => selectedLocale.includes(locale))),
);

export const selectPermissions = state => get(state, 'permissions.data', []);

export const selectDownloadedLocale = createSelector(
  getSelectedLocales,
  getCurrentLocale,
  (locales, current) => locales[current],
);
