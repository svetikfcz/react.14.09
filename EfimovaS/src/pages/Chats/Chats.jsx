import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { v4 as uuidv4} from 'uuid';
import FormMessage from '../../components/FormMessage';
import MessageList from '../../components/MessageList';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { addMessage, asyncAddMessage } from '../../reducers/messagesReducer';
import { fetchChats } from '../../reducers/chatReducer';
import { getActiveMessages, getCurrentMessages, getIsFetching } from '../../selectors/chatsSelectors';
import Preloader from '../../components/Preloader/Preloader';

class Chats extends Component {
  componentDidMount() {
    const { fetchChats: asyncFetchChats } = this.props;
    asyncFetchChats();
  }

  submitMessage = ({ author, message }) => {
    const { 
      asyncAddMessage, 
      match: {
        params: { id },
      }, 
    } = this.props;
    asyncAddMessage({ author, message, chatId: id, id: uuidv4() });
  }

      addChat = () => {
        const newId = uuidv4();
        this.setState(({ chats }) => ({ 
          chats: {...chats, [newId]: { id: newId, title: `Chat ${newId}`, messageList: [] }},
        }) );
      }

      render() {
        const { messages, activeMessages, isFetching } = this.props;
    
          return (
              <Layout>
                <Preloader open={isFetching} />
                <MessageList messages={messages} activeMessages={activeMessages} />
                <FormMessage addMessage={this.submitMessage} />
            </Layout>
          );
      }
}

Chats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.any)}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
  //addMessage: PropTypes.func.isRequired,
  activeMessages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  asyncAddMessage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchChats: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { 
    match: {
      params: { id },
     },
    } = ownProps;
    return {
      messages: getCurrentMessages(state, id),
      activeMessages: getActiveMessages(state),
      isFetching: getIsFetching(state),
    };
  
};
    
const mapDispatchToProps = {
  //addMessage,
  asyncAddMessage,
  fetchChats
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
