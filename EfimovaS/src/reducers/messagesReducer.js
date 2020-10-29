import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4} from 'uuid';
import { BOT_NAME } from '../utils/costants';
import { fetchChats } from './chatReducer';

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
        active: [],
    },
    reducers: {
        addMessage(state, action) {
            const { author, message, id } = action.payload;
            
            state.byIds[id] = { id, author, message };
            state.ids.push(id);   
            
        },
        addNewMessageID(state, { payload }) {
            state.active.push(payload);
        },
        deleteNewMessageID(state, { payload }) {
            state.active = state.active.filter(i => i != payload);
        },
    },
    extraReducers: {
        /* [fetchChats.fulfilled]: (state, { payload }) => {
            payload.forEach(item => {
                const { messageList } = item;
                messageList.forEach(i => {
                    state.byIds[i.id] = i;
                    state.ids.push(i.id);
                });
            });
            
        }, */
    },
});

export const { addMessage, addNewMessageID, deleteNewMessageID } = messagesSlice.actions;

export const asyncAddMessage = payload => (dispatch, getState) => {
    const { author, chatId } = payload;
  
    if (author !== BOT_NAME) {
      setTimeout(() => {
        dispatch(
          addMessage({ author: BOT_NAME, message: 'Hello from BOT', chatId, id: uuidv4() }),
        );
      }, 500);
    }
  
    dispatch(addMessage(payload));
};

export default messagesSlice.reducer;