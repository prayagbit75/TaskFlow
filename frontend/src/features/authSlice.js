import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticate: false,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticate = true;
            state.loading = false;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticate = false;
            state.loading = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const {
    login,
    logout,
    setLoading,
} = authSlice.actions;

export default authSlice.reducer;