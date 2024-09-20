import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const uploadFile = createAsyncThunk(
    'upload/uploadFile',
    async (file, { rejectWithValue, dispatch }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percentage = Math.floor((loaded * 100) / total);
                    dispatch(updateProgress(percentage));
                },

            });

            console.log(`Upload progress21:`, response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Upload failed');
        }
    }
);
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

            const response = await axios.post('/upload', formUpdate, {
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
const fileSlice = createSlice({
    name: 'file',
    initialState: {
        file: null,
        progress: 0,
        title: null,
        description: null,
        source: null,
        point: null,
        category_id: null,
        uploadStatus: 'idle',
        error: null,
        message: null,
    },
    reducers: {
        setFile: (state, action) => {
            if (action.payload) {
                state.file = action.payload;
                state.title = action.payload.name;
            } else {
                state.file = null;
                state.title = null;
            }
            state.uploadStatus = 'idle';
            state.description = null;
            state.source = null;
            state.point = null;
            state.category_id = null;
            state.error = null;
            state.progress = 0;
            state.message = null;
        },

        updateProgress: (state, action) => {
            state.progress = action.payload;
        },
        setUpdateFile: (state, action) => {
            const { field, value } = action.payload;
            if (field in state) {
                state[field] = value;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.uploadStatus = 'loading';
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.uploadStatus = 'succeeded';
                state.progress = 100;
                state.message = action.payload.message || 'Upload completed successfully!';
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload;
                state.progress = 0;
                state.message = action.payload.message || 'Upload failed!';
            });
    },
});

export const { setFile, resetUpload, updateProgress, setUpdateFile } = fileSlice.actions;

export default fileSlice.reducer;
