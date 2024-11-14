import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showOverview: true,
    showUserManagement: false,
    showSettings: false,
    showCategoryManagement: false,
    showDropdownDocument: false,
    showDocumentNeedReview: false,
    showDocumentNeedDelete: false,
};

const AdminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        setActiveSection: (state, action) => {
            // Đặt tất cả các trạng thái về false
            Object.keys(state).forEach(key => {
                state[key] = false;
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
        }
    },
});

// Export action và reducer
export const { setActiveSection, setShowDropdownDocument } = AdminDashboardSlice.actions;
export default AdminDashboardSlice.reducer;
