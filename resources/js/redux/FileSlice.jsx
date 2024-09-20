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
            console.log('id', response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Upload failed');
        }
    }
);

export const updateFile = createAsyncThunk(
    'update/updateFile',
    async (fileData, { rejectWithValue, getState }) => {
        try {
            const { title, description, source, point } = fileData
            const { document_id, category_id } = getState().file;
            const formUpdate = new FormData();
            formUpdate.append('title', title);
            formUpdate.append('description', description);
            formUpdate.append('source', source);
            formUpdate.append('point', point);
            formUpdate.append('category_id', category_id);

            const response = await axios.post(`/upload/${document_id}`, formUpdate, {
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
        messageUpdate: null,
        document_id: null,
    },
    reducers: {
        setFile: (state, action) => {
            if (action.payload) {
                state.file = action.payload;
                state.title = action.payload.name;
                state.category_id = null;
                state.point = null;
                state.source = null;
                state.description = null;
                state.messageUpdate = null;
            } else {
                state.file = null;
                state.title = null;
            }
        },
        //
        setTitle: (state, action) => {
            state.title = action.payload;
        },

        setCategoryId: (state, action) => {
            state.category_id = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setPoint: (state, action) => {
            state.point = action.payload;
        },
        setSource: (state, action) => {
            state.source = action.payload;
        },
        //
        updateProgress: (state, action) => {
            state.progress = action.payload;
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.uploadStatus = 'loading';
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                if (action.payload.status === 'success') {
                    state.uploadStatus = 'success';
                    state.progress = 100;
                    state.message = action.payload.message || 'Upload completed successfully!';
                    state.document_id = action.payload.documentId;
                } else {
                    state.uploadStatus = 'error';
                    state.progress = 100;
                    state.message = action.payload.message || 'Upload failed!';
                }
            })

            .addCase(uploadFile.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload;
                state.progress = 0;
                state.message = action.payload.message || 'Upload failed!';
            });
        builder
            .addCase(updateFile.fulfilled, (state, action) => {
                state.uploadStatus = 'success';
                state.messageUpdate = action.payload.message || 'Upload success!';
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.payload;
                state.messageUpdate = action.payload.message || 'Upload failed!';
            });
    },

});




export const { setFile, resetUpload, updateProgress, setUpdateFile, setTitle, setCategoryId, setDescription,
    setPoint, setSource

} = fileSlice.actions;

export default fileSlice.reducer;
