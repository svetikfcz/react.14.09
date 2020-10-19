import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import chatReducer from '../reducers/chatReducer';
import messagesReducer from '../reducers/messagesReducer';
import profileReducer from '../reducers/profileReducer';
import botAnswer from './botAnswer';

/* const logger = ({ getState }) => next => action => {
    console.log('prevState: ', getState());
    const result = next(action);
    console.log('nextState: ', getState());
    return result;
}; */

export default configureStore({
    reducer: {
        chats: chatReducer,
        messages: messagesReducer,
        profile: profileReducer,
    },
    middleware: [botAnswer, ...getDefaultMiddleware(), logger],
});