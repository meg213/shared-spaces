import React, {createContext, useState} from 'react';
import firebase from 'firebase/app'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
   
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          register: async (email, password) => {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                return firebase.collection('users').doc(cred.user.uid).set({
                  firstname: "George Burdell",
                  email: email 
                })
              });
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await firebase.auth().signOut();
            } catch (e) {
              console.log(e);
            }
          },
        }}>
        {children}
      </AuthContext.Provider>
    );
};