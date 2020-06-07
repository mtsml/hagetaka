import React from 'react';
import Navbar from './Navbar'
import Body from './Body'
import NotificationContainer from './NotificationContainer'
import InputModal from './InputModal'
import JudgeModal from './JudgeModal'
import './../css/App.css';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Body />

            <InputModal />
            <JudgeModal />
            <NotificationContainer />
        </div>
    )
}

export default App;