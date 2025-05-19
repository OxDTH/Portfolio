/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Theme types
export enum Theme {
  DARK = 'dark',
  MONOKAI = 'monokai',
  GITHUB_DARK = 'github-dark',
  COBALT = 'cobalt',
  DRACULA = 'dracula',
  RED_SUNSET = 'red-sunset',
  EMERALD = 'emerald',
  SOLAR = 'solar'
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  bgColor: string; // Now direct color values like '#1e1e1e'
  textColor: string; // Now direct color values like '#d4d4d4'
  accentColor: string; // Now direct color values like '#6a6a6a'
}

export const themeConfigs: Record<Theme, ThemeConfig> = {
  [Theme.DARK]: {
    name: Theme.DARK,
    displayName: 'Dark+ (default)',
    bgColor: '#1e1e1e',
    textColor: '#d4d4d4',
    accentColor: '#6a6a6a',
  },
  [Theme.MONOKAI]: {
    name: Theme.MONOKAI,
    displayName: 'Monokai',
    bgColor: '#272822',
    textColor: '#f8f8f2',
    accentColor: '#a6e22e',
  },
  [Theme.GITHUB_DARK]: {
    name: Theme.GITHUB_DARK,
    displayName: 'GitHub Dark',
    bgColor: '#0d1117',
    textColor: '#c9d1d9',
    accentColor: '#58a6ff',
  },
  [Theme.COBALT]: {
    name: Theme.COBALT,
    displayName: 'Cobalt 2',
    bgColor: '#193549',
    textColor: '#ffffff',
    accentColor: '#ff9d00',
  },
  [Theme.DRACULA]: {
    name: Theme.DRACULA,
    displayName: 'Dracula',
    bgColor: '#282a36',
    textColor: '#f8f8f2',
    accentColor: '#bd93f9',
  },
  [Theme.RED_SUNSET]: {
    name: Theme.RED_SUNSET,
    displayName: 'Red Sunset',
    bgColor: '#2d1a1e',
    textColor: '#f8e8e8',
    accentColor: '#ff5252',
  },
  [Theme.EMERALD]: {
    name: Theme.EMERALD,
    displayName: 'Emerald',
    bgColor: '#0f2318',
    textColor: '#e6f3ed',
    accentColor: '#4ade80',
  },
  [Theme.SOLAR]: {
    name: Theme.SOLAR,
    displayName: 'Solar',
    bgColor: '#261e15',
    textColor: '#fdf6e3',
    accentColor: '#f7b731',
  },
};

const initialState: ThemeSliceState = {
  currentTheme: Theme.DARK,
  themeConfig: themeConfigs[Theme.DARK],
  themeMenuOpen: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: Theme }>) => {
      state.currentTheme = action.payload.theme;
      // Ensure we're always getting the correct theme config
      if (themeConfigs[action.payload.theme]) {
        state.themeConfig = {...themeConfigs[action.payload.theme]};
      } else {
        console.error('Theme not found:', action.payload.theme);
        // Fallback to dark theme
        state.themeConfig = themeConfigs[Theme.DARK];
      }
    },
    toggleThemeMenu: (state) => {
      state.themeMenuOpen = !state.themeMenuOpen;
    },
    closeThemeMenu: (state) => {
      state.themeMenuOpen = false;
    },
  },
});

/* Types */
export interface ThemeSliceState {
  currentTheme: Theme;
  themeConfig: ThemeConfig;
  themeMenuOpen: boolean;
}
