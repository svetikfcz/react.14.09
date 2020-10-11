import { v4 as uuidv4} from 'uuid';
import produce from 'immer';
import { ADD_CHAT } from "../actions/chatActions";
import { addMessage } from "./messagesReducer";

const initialState = {
    byIds: {
        1: { id: 1, title: 'Chat 1', messageList: [1, 2] },
        2: { id: 2, title: 'Chat 2', messageList: [1, 2] },
        3: { id: 3, title: 'Chat 3', messageList: [1, 3] },
      },
    ids: [1, 2, 3],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT: {
            const newId = uuidv4();
            return {...state,
                byIds: {
                    ...state.byIds,
                    [newId]: { id: newId, title: `Chat ${newId}`, messageList: [] },
                },
                ids: [...state.ids, newId],
            };
        }
        case addMessage.toString(): {
            const { id, chatId } = action.payload;
            return produce(state, draft => {
                draft.byIds[chatId].messageList.push(id);
            });
        }
        default:
            return state;
    }
};

export default reducer;