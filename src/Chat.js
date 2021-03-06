import React, { useEffect, useState } from 'react';
import './Chat.css';

import { useParams } from 'react-router-dom';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { db } from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';

const Chat = () => {

    const { roomId } = useParams();

    const [roomDetails, setRoomDetails] = useState(null);

    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {

        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomDetails(snapshot.data()))
        }

        db.collection('rooms').doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(
                snapshot => (
                    setRoomMessages(snapshot.docs.map(doc => doc.data()))
                )
            )

        console.log(roomMessages);


    }, [roomId])


    return (
        <div className="chat">

            <div className="chat__header">

                <div className="chat__headerLeft">
                    <h4 className="chat__channelName">
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>

                <div className="chat__headerRight">

                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>

                </div>

            </div>

            <div className="chat__messages">
                {/* Message Component */}

                {
                    roomMessages.map(({ message, timestamp, user, userImage }) => (
                        <Message
                            key={Math.random() * 1000}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    ))}

            </div>

            <ChatInput
                channelName={roomDetails?.name}
                channelId={roomId}
            />


        </div>
    );
};

export default Chat;