import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../reducers/chatReducer';
import messagesReducer from '../reducers/messagesReducer';
import profileReducer from '../reducers/profileReducer';

export default configureStore({
    reducer: {
        chats: chatReducer,
        messages: messagesReducer,
        profile: profileReducer,
    }
});