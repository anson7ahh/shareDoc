import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

// Tạo async thunk để xử lý việc upload file
export const updateFile = createAsyncThunk(
    'update/updateFile',
    async (title, description, source, point, category_id, { rejectWithValue }) => {
        try {
            const formUpdate = new FormData();
            formUpdate.append('title', title);
            formUpdate.append('description', description);
            formUpdate.append('source', source);
            formUpdate.append('point', point);
            formUpdate.append('category_id', category_id);

            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const uploadSlice = createSlice({
    name: 'update',
    initialState: {

        uploadStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload;
            state.uploadStatus = 'idle';
            state.error = null;
        },
        resetUpload: (state) => {
            state.file = null;
            state.uploadStatus = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.uploadStatus = 'loading';
            })
            .addCase(uploadFile.fulfilled, (state) => {
                state.uploadStatus = 'succeeded';
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setFile, resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
