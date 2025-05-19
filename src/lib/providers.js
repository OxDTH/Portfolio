'use client';

/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { reduxStore } from '@/lib/redux';
import ThemeProvider from '@/components/ThemeProvider';

export const Providers = (props) => {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        {props.children}
      </ThemeProvider>
    </Provider>
  );
};
