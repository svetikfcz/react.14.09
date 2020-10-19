import { createSlice } from '@reduxjs/toolkit';
import { BOT_NAME } from '../utils/costants';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: { 
        byIds: {
            1: {
            id: 1,
            author: BOT_NAME,
            message: "Hello from Bot",
            },
            2: {
            id: 2,
            author: BOT_NAME,
            message: "How are you",
            },
            3: {
            id: 3,
            author: BOT_NAME,
            message: "Hi, How are you",
            },
        },
        ids: [1, 2, 3],
    },
    reducers: {
        addMessage(state, action) {
            const { author, message, id } = action.payload;
            
            state.byIds[id] = { id, author, message };
            state.ids.push(id);   
            
        },
    },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;