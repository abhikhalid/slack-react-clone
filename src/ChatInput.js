import { Button } from '@mui/material';
import React, { useState } from 'react';
import './ChatInput.css';

import { db } from './firebase';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { useStateValue } from './StateProvider';


const ChatInput = ({ channelName, channelId }) => {


    const [input, setInput] = useState('');
    const [{ user }, dispatch] = useStateValue();


    const sendMessage = (e) => {
        e.preventDefault();

        console.log("Channel Name : " + channelName + " Channel ID : " + channelId);

        if (channelId) {

            db
                .collection("rooms")
                .doc(channelId)
                .collection('messages')
                .add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL
                });


        }



    }

    return (
        <div className="chatInput">
            <form>
                <input
                    type="text"
                    placeholder={`Message #${channelName}`}
                    value={input}
                    onChange={e => setInput(e.target.value)} />

                <Button type="submit" onClick={sendMessage}>SEND</Button>

            </form>

        </div>
    );
};

export default ChatInput;