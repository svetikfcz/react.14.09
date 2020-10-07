const initialState = {
    chats: {
        1: { id: 1, title: 'Chat 1', messageList: [1, 2] },
        2: { id: 2, title: 'Chat 2', messageList: [1, 2] },
        3: { id: 3, title: 'Chat 3', messageList: [1, 3] },
      },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add_message':
            return {...state};
        default:
            return state;
    }
};

export default reducer;