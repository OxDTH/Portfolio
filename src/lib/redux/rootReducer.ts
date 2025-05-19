/* Instruments */
import { expandableSlice, explorerSlice, sectionSlice, tabsSlice, themeSlice } from './slices';

export const reducer = {
  expandable: expandableSlice.reducer,
  explorer: explorerSlice.reducer,
  sections: sectionSlice.reducer,
  tabs: tabsSlice.reducer,
  theme: themeSlice.reducer,
};
