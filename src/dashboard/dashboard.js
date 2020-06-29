import React from 'react'
import ChatListComponent from '../chatlist/chatList'
import ChatViewComponent from '../chatview/chatview'
import { withStyles, Button } from '@material-ui/core'
import styles from './styles'
const firebase = require("firebase")

class DashboardComponent extends React.Component {

    constructor(){
        super()
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        }
    }

    render(){

        const { classes } = this.props
        return(
            <div>
            <div>Hello From DashboardComponent</div>
            <ChatListComponent 
                history={this.props.history}
                newChatBtnFn={this.newChatBtnClicked}
                selectChatFn={this.selectChat} 
                chat={this.state.chats}
                email={this.state.email}
                selectedChatIndex={this.state.selectedChat}/>
                {
                    this.state.newChatFormVisible? 
                    null :
                    <ChatViewComponent
                    user={this.state.email}
                    chat={this.state.chats[this.state.selectedChat]}
                    ></ChatViewComponent>
                }
                <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
            </div>
        ) 
    }

    signOut = () => firebase.auth().signOut();

    selectChat = (chatIndex) => {
        console.log('index:', chatIndex)
        this.setState({ selectedChat: chatIndex })
    }

    newChatBtnClicked = () => this.setState({newChatFormVisible: true, selectedChat: null})

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr)
                this.props.history.push('/login');
                else{
                    await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data())
                        await this.setState({
                            email: _usr.email,
                            chats: chats
                        })
                        console.log(this.state)
                    })

                }
        })
    }
}

export default withStyles(styles)(DashboardComponent)