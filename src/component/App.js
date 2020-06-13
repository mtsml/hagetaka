import React from 'react';
import Navbar from './Navbar'
import Body from './Body'
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
        </div>
    )
}

export default App;