import commentSlice from './CommentSlice'
import { configureStore } from '@reduxjs/toolkit';
import fileSlice from './FileSlice';

const store = configureStore({
    reducer: {
        file: fileSlice,
        comment: commentSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
