import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { featuresApi } from './apis/featuresApi';
import { testimonialsApi } from './apis/testimonialsApi';
import { servicesApi } from './apis/servicesApi';

import authSlice from './authSlice';
import { projectApi } from './apis/projectsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [featuresApi.reducerPath]: featuresApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    
    
      auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      featuresApi.middleware,
      testimonialsApi.middleware,
      servicesApi.middleware,
      projectApi.middleware,

    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;