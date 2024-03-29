import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import activityReducer  from './slices/activitySlice';
import bookmarkReducer  from './slices/bookmarkSlice';

export const store = configureStore({
    reducer: {
        activity: activityReducer,
        bookmark: bookmarkReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;