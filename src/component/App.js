import React from 'react';
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import NotificationContainer from './NotificationContainer'
import MessageModal from './MessageModal'
import './../css/App.css';


const App = () => {
    return (
        <div className="App">
            <Header />
            <Body />
            <Footer />

            <MessageModal />
            <NotificationContainer />
        </div>
    )
}

export default App;