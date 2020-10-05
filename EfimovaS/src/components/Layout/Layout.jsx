import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4} from 'uuid';
import { Container, Paper, withStyles } from '@material-ui/core';
import Header from '../Header';
import Message from '../Message';
import FormMessage from '../FormMessage';
import ChatList from '../ChatList';
import MessageList from '../MessageList';

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
      },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: theme.spacing(9),
    }
});

class Layout extends Component {
  state = {
    messages: [
      {
        id: uuidv4(),
        author: "Bot",
        message: "Hello from Bot",
      },
    ],
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    if (messages.length % 2 === 0) {
      setTimeout(() => {
        this.addMessage({ author: "Bot", message: "Hello, I'm Bot" });
      }, 500);
    }
  }

  addMessage = (message) => {
    const { messages } = this.state;
    this.setState({ messages: [...messages, { ...message, id: uuidv4() }] });
  };

    render() {
        const { classes } = this.props;
        const { messages } = this.state;
        return (
            <div className={classes.root}>
            <Header />
            <ChatList />
            <Container maxWidth="md" classes={{ root: classes.container }}>
                <MessageList messages={messages}/>
                <FormMessage addMessage={this.addMessage} />
            </Container>
            </div>
        );
    };
}

Layout.PropTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        container: PropTypes.string,
    }).isRequired,
};

export default withStyles(styles)(Layout);