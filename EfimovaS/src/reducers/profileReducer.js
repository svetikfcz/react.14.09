import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        firstName: 'Svetlana',
        lastName: 'Efimova',
    },
});

export default profileSlice.reducer;