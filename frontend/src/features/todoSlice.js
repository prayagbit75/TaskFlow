import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    titles: [],
    selectedTodo: null,
};

const todoSlice = createSlice({
    name: "todo",

    initialState,

    reducers: {

        setTitles: (state, action) => {
            state.titles = action.payload;
        },

        addTitle: (state, action) => {
            state.titles.push(action.payload);
        },

        deleteTitle: (state, action) => {
            state.titles = state.titles.filter(
                (todo) => todo._id !== action.payload
            );

            if (state.selectedTodo?._id === action.payload) {
                state.selectedTodo = null;
            }
        },

        updateTitle: (state, action) => {

            const index = state.titles.findIndex(
                (todo) => todo._id === action.payload._id
            );

            if (index !== -1) {
                state.titles[index] = action.payload;
            }

            if (state.selectedTodo?._id === action.payload._id) {
                state.selectedTodo = action.payload;
            }
        },

        setSelectedTodo: (state, action) => {
            state.selectedTodo = action.payload;
        },

        clearTitles: (state) => {
            state.titles = [];
            state.selectedTodo = null;
        }

    },
});

export const {
    setTitles,
    addTitle,
    deleteTitle,
    updateTitle,
    setSelectedTodo,
    clearTitles
} = todoSlice.actions;

export default todoSlice.reducer;