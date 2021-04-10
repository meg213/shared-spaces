import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
import {db} from '../config/keys';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen ({route}) {
  const userID = route.params.currUser.uid
  const displayName = route.params.currUser.displayName
  const spaceID = route.params.spaceID
  console.log(spaceID)
  console.log(route.params.currUser)
  const messagesRef = db.collection('messages');
  const [messages, setMessages] = useState([]);

  function handleSend(messages) {
    const text = messages[0]
    messagesRef.add({
        text,
        createdAt: new Date().getTime(),
        user: {
            _id: userID,
            spaceID: spaceID,
            name: displayName
            }
        })
    }

    useEffect(() => {
        const subscriber = messagesRef
        .orderBy('createdAt', 'desc')
        .where('user.spaceID', '==', spaceID)
        .limit(25)
        .onSnapshot(documentSnapshot => {createMessagesData(documentSnapshot)});
        async function createMessagesData(documentSnapshot) {
          console.log('snapshot:', documentSnapshot.docs)
          var messages = [];
          for (let i = 0; i < documentSnapshot.docs.length; i++) {
              let m = await documentSnapshot.docs[i].data()
              let data = {
                  _id: m.text._id,
                  text: m.text.text,
                  createdAt: m.createdAt,
                  user: {
                      _id: m.user._id,
                      name: displayName,
                      spaceID: m.spaceID
                  }
              }
              messages.push(data)
          }
          setMessages(messages)
        }
        return () => subscriber;
      }, []);
  console.log(messages)
    
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user ={{
          _id: userID,
          name: displayName
      }}
    />
  );
  
  
}