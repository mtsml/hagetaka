import React from 'react';
import { MDBContainer, MDBCardHeader, MDBCardFooter, MDBListGroup } from 'mdbreact' 
import Footer from './Footer'
import Contents from './Contents.js'
import MessageToast from './MessageToast.js'
import Player from './Player.js'
import Point from './Point.js'
import MessageModal from './MessageModal'
import './../css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.socket = props.socket

        this.state = {
            name: props.name,
            point: 0,
            players: props.players,
            toast: [],
            onGame: false,
            headerMessage: '待機中'
        }
    }

    componentDidMount() {
        this.socket.on('INIT', (data) => {
            console.log('INIT')
            this.notify(data.message)
            this.setState({ players: data.players })
        })
        this.socket.on('UPDATE_PLAYER', (data) => {
            console.log('UPDATE_PLAYER')
            this.setState({ players: data.players })
        })
        this.socket.on('UPDATE_COUNT', (data) => {
            console.log('UPDATE_COUNT')
            this.setState({ point: data })
        })
        this.socket.on('GAME_START', (data) => {
            console.log('GAME_START')
            this.setState({ 
                headerMessage: data.title,
                onGame: true,
                point: data.point
            })
        })
    }

    componentWillUnmount() {
        this.socket.off('INIT')
        this.socket.off('UPDATE_PLAYER')
        this.socket.off('UPDATE_COUNT')
        this.socket.off('GAME_START')
    }

    notify(message) {
        const toast = this.state.toast
        toast.push(message)
        this.setState({ toast: toast })
    }

    render() {
        return (
            <div className="App">
                <MDBCardHeader>
                    <Contents>
                        {this.state.headerMessage}　得点カード
                        <Point point={this.state.point} />
                    </Contents>
                </MDBCardHeader>

                <Contents title='プレイヤー'>
                    <MDBListGroup>
                        {this.state && this.state.players.map((player, idx) => {
                            return (
                                <Player
                                    key={idx}
                                    name={player.name}
                                    point={player.point}
                                    hand={player.hand}
                                    color={player.color}
                                />
                            )
                        })}
                    </MDBListGroup>
                </Contents>

                <div className="fixed-bottom">
                    <MDBCardFooter>
                        <Contents title='手札'>
                            <Footer socket={this.socket} name={this.state.name} />
                        </Contents>
                    </MDBCardFooter>
                </div>
                
                <MessageModal socket={this.socket} />
                <MDBContainer
                    style={{
                    width: "auto",
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999
                    }}
                >
                    {this.state.toast && this.state.toast.map((message, idx) => {
                        return <MessageToast key={idx} message={message} show={true} />
                    })}
                </MDBContainer>
            </div>
        );
    }
}

export default App;