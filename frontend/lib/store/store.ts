import { configureStore } from '@reduxjs/toolkit';
import { kitchenApi } from '../services/api';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [kitchenApi.reducerPath]: kitchenApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(kitchenApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];