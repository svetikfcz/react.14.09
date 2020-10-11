import { createSelector } from "@reduxjs/toolkit";

const getChatsByIds = state => state.chats.byIds;
const getChatsIds = state => state.chats.ids;

/* export const getCurrentChat = (state, id) => {

    return chatsIds.map(id => chats[id]);
}; */

export const getChatsList = createSelector(getChatsByIds, getChatsIds, (byId, ids) => 
    ids.map(id => byId[id]),
);

export const getCurrentMessages = (state, id) => {
    //const currentChat = getCurrentChat(state, id);   
    const chats = state.chats.byIds;
    const messages = state.messages.byIds;
    if (id in chats) {
        return chats[id].messageList.map(messId => messages[messId]);
      }
    return [];
};