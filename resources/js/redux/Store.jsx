import AdminDashboardSlice from './AdminDashboardSlice';
import commentSlice from './CommentSlice'
import { configureStore } from '@reduxjs/toolkit';
import fileSlice from './FileSlice';

const store = configureStore({
    reducer: {
        file: fileSlice,
        comment: commentSlice,
        adminDashboard: AdminDashboardSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
