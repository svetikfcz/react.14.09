import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { v4 as uuidv4} from 'uuid';
import FormMessage from '../../components/FormMessage';
import MessageList from '../../components/MessageList';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import { addMessage } from '../../reducers/messagesReducer';

class Chats extends Component {
          
      /* componentDidUpdate(prevProps, prevState) {
        const lastMessages = this.messages;
        if (lastMessages[lastMessages.length - 1]?.author !== 'Bot') {
          setTimeout(() => {
            this.addMessage({ author: "Bot", message: "Hello, I'm Bot" });
          }, 500);
        }
      }

      get messages() {
        const { 
          match: {
            params: { id },
           },
          } = this.props;
        const { chats, messages } = this.state;
        if (id in chats) {
          return chats[id].messageList.map(messId => messages[messId]);
        }
        return [];
      } */

      get messages() {
        const { 
          match: {
            params: { id },
           }, 
           chats, 
           messages,
          } = this.props;
        if (id in chats) {
          return chats[id].messageList.map(messId => messages[messId]);
        }
        return [];
      } 
    
      addMessage = ({ author, message }) => {
        const { 
          match: {
            params: { id },
           },
          } = this.props;
        const newId = uuidv4();

        this.setState(({ chats, messages }) => ({
          chats: {
            ...chats,
            [id]: { ...chats[id], messageList: [...chats[id].messageList, newId] },
          },
          messages: { 
            ...messages, 
            [newId]: { id: newId, author, message } },
        }));

        //Immer.js
        /* this.setState(prevState =>
             produce(prevState, draft => {
              draft.chats[id].messageList.push(newId);
              draft.messages[newId] = { id: newId, author, message };
          }),
        ); */

      };

      addChat = () => {
        const newId = uuidv4();
        this.setState(({ chats }) => ({ 
          chats: {...chats, [newId]: { id: newId, title: `Chat ${newId}`, messageList: [] }},
        }) );
      }

      render() {
    
          return (
              <Layout>
                <MessageList messages={this.messages} />
                <FormMessage addMessage={this.addMessage} />
                <button type="button" onClick={() => this.props.addMessage()}>add message</button>
            </Layout>
          );
      }
}

Chats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.any)}).isRequired};

/* const mapStateToProps = store => ({
  chatsFromRedux: store.chats,
}); */

const mapStateToProps = state => ({
  chats: state.chats.byIds,
  messages: state.messages.byIds,
});
    
const mapDispatchToProps = {
  addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
