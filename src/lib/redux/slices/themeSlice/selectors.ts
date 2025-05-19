/* Instruments */
import type { ReduxState } from '../../store';
import { Theme, ThemeConfig } from './themeSlice';

// Selectors
export const selectTheme = (state: ReduxState): Theme => state.theme.currentTheme;
export const selectThemeConfig = (state: ReduxState): ThemeConfig => state.theme.themeConfig;
export const selectThemeMenuOpen = (state: ReduxState): boolean => state.theme.themeMenuOpen;
