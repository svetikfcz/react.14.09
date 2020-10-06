import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import { v4 as uuidv4} from 'uuid';
import FormMessage from '../../components/FormMessage';
import MessageList from '../../components/MessageList';
import Layout from '../../components/Layout/Layout';

class Chats extends Component {
    state = {
      chats: {
        1: { id: 1, title: 'Chat 1', messageList: [1, 2] },
        2: { id: 2, title: 'Chat 2', messageList: [1, 2] },
        3: { id: 3, title: 'Chat 3', messageList: [1, 3] },
      },
      messages: {
        1: {
          id: 1,
          author: "Bot",
          message: "Hello from Bot",
        },
        2: {
          id: 2,
          author: "Bot",
          message: "How are you",
        },
        3: {
          id: 3,
          author: "Bot",
          message: "Hi, How are you",
        },
      },
    }
      
      componentDidUpdate(prevProps, prevState) {
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
        const { chats } = this.state;

          return (
              <Layout chats={Object.values(chats)} addChat={this.addChat}>
                <MessageList messages={this.messages}/>
                <FormMessage addMessage={this.addMessage} />
            </Layout>
          );
      }
}

Chats.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.any)}).isRequired};

export default Chats
