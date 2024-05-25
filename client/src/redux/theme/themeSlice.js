import {createSlice } from '@reduxjs/toolkit'
import { ToggleSwitch } from 'flowbite-react'

const initialState ={
    theme: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }, 
    }
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;