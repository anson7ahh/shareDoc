import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

// Tạo async thunk để gọi API lấy dữ liệu userManagement
export const fetchUserManagement = createAsyncThunk(
    'adminDashboard/fetchUserManagement',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/admin/userManagement');
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi khi gọi API");
        }
    }
);

const initialState = {
    showOverview: true,
    showUserManagement: false,
    showSettings: false,
    showCategoryManagement: false,
    showDropdownDocument: false,
    showDocumentNeedReview: false,
    showDocumentNeedDelete: false,
    userManagement: null,
    CategoryManagement: {}
};

const AdminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            // Đặt tất cả các trạng thái về false
            Object.keys(state).forEach(key => {
                if (key.startsWith('show')) {
                    state[key] = false;
                }
            });

            if (state.hasOwnProperty(action.payload)) {
                state[action.payload] = true;
            }
            if (state.showDocumentNeedReview || state.showDocumentNeedDelete) {
                state.showDropdownDocument = true;
            }
        },
        setShowDropdownDocument: (state, action) => {
            state.showDropdownDocument = action.payload;
        },
        setUserManagement: (state, action) => {
            state.userManagement = action.payload; // Đảm bảo action.payload nhận đúng dữ liệu từ API
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserManagement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserManagement.fulfilled, (state, action) => {
                state.loading = false;
                state.userManagement = action.payload;
            })
            .addCase(fetchUserManagement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export action và reducer
export const { setActiveSection, setShowDropdownDocument, setUserManagement } = AdminDashboardSlice.actions;
export default AdminDashboardSlice.reducer;
