import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

// Thunk để tạo comment
export const createCommentParent = createAsyncThunk(
    'comment/CreateParentComment',
    async ({ documentId, content }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/comment', {
                document_id: documentId,
                body: content,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

export const createReplyComment = createAsyncThunk(
    'comment/createReplyComment',
    async ({ commentId, documentId, contentReplyComment }, { rejectWithValue, getState }) => {
        try {

            const response = await axios.post(`/comment/${commentId}`, {
                documents_id: documentId,
                body: contentReplyComment,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Something went wrong');
        }
    }
);

// Slice quản lý comment
const commentSlice = createSlice({
    name: 'Comment',
    initialState: {
        commentId: '',
        replyCommentItems: [],
        allComment: [],
        commentParentItems: [],
        contentCommentParent: '',
        contentReplyComment: '',
        error: null,
    },
    reducers: {
        setAllComment: (state, action) => {
            state.allComment = action.payload
        },
        setCommentParentItems: (state, action) => {
            state.commentParentItems = action.payload
        },
        setContentCommentParent: (state, action) => {
            state.contentCommentParent = action.payload;
        },
        setCommentId: (state, action) => {
            state.commentId = action.payload;
        },
        toggleReplyItems: (state, action) => {
            const { id } = action.payload;
            state.commentParentItems = state.commentParentItems.map(comment =>
                comment.id === id ? { ...comment, ReplyItems: !comment.ReplyItems } : comment
            );
        },
        setDocumentId: (state, action) => {
            state.documentId = action.payload;
        },
        toggleShowInputReply: (state, action) => {
            const { id } = action.payload;
            state.commentParentItems = state.commentParentItems.map(comment =>
                comment.id === id
                    ? { ...comment, showInputReply: !comment.showInputReply }
                    : { ...comment, showInputReply: false }
            );
        },
        toggleShowInputReplyCommentItems: (state, action) => {
            const { id } = action.payload;
            state.replyCommentItems = state.replyCommentItems.map(comment =>
                comment.id === id ? { ...comment, showInputReplyCommentItem: !comment.showInputReplyCommentItem }
                    :
                    { ...comment, showInputReplyCommentItem: false }
            );
        },
        setReplyCommentItems: (state, action) => {
            state.replyCommentItems = action.payload;
        },
        setContentReplyComment: (state, action) => {
            state.contentReplyComment = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(createCommentParent.fulfilled, (state, action) => {
                state.allComment = [
                    { ...action.payload },
                    ...state.allComment
                ];
                state.contentCommentParent = '';
            })
            .addCase(createCommentParent.rejected, (state, action) => {
                state.error = action.payload;
            })
        builder
            .addCase(createReplyComment.fulfilled, (state, action) => {
                state.replyCommentItems = [
                    { ...action.payload, showInputReplyCommentItem: false },
                    ...state.replyCommentItems.map(item => ({
                        ...item,
                        showInputReplyCommentItem: false
                    }))
                ];
                const id = action.payload.parent_id;
                state.commentParentItems = state.commentParentItems.map(comment =>
                    comment.id === id ? { ...comment, ReplyItems: true, showInputReply: false } : comment
                );
            })
            .addCase(createReplyComment.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Xuất các action
export const {
    setAllComment,
    setReplyCommentItems,
    setCommentParentItems,
    setContentCommentParent,
    toggleReplyItems,
    setDocumentId,
    toggleShowInputReply,
    setCommentId,
    setContentReplyComment,
    toggleShowInputReplyCommentItems,
} = commentSlice.actions;

// Xuất reducer
export default commentSlice.reducer;
