import React from 'react';
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import NotificationContainer from './NotificationContainer'
import InputModal from './InputModal'
import JudgeModal from './JudgeModal'
import './../css/App.css';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Body />
            <Footer />

            <InputModal />
            <JudgeModal />
            <NotificationContainer />
        </div>
    )
}

export default App;