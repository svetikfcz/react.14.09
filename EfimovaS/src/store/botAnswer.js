import { v4 as uuidv4} from 'uuid';
import { addMessage } from '../reducers/messagesReducer';
import { BOT_NAME } from '../utils/costants';


const botAnswer = ({ dispatch }) => next => action => {
    const { type, payload } = action;
    if(type === addMessage.toString()) {
        const { author, chatId } = payload;
        if(author !== BOT_NAME) {
            setTimeout(() => {
                dispatch(
                    addMessage({ author: BOT_NAME, message: 'Whats up?', chatId, id: uuidv4() })
                );
            }, 500);
           
        }
    }
    return next(action);
};

export default botAnswer;