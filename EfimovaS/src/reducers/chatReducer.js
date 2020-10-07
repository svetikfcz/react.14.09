import { ADD_CHAT } from "../actions/chatActions";
import { v4 as uuidv4} from 'uuid';

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
        default:
            return state;
    }
};

export default reducer;