import {db} from "../firebase/config"

import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 updateProfile,
 signOut

} from 'firebase/auth';
import { trace } from 'firebase/performance';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // clenup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkListCancelled() {
        if (cancelled) {
            return;
        }
    } 
    const createUser = async (data) => {
        checkListCancelled();

        setLoading(true);
        setError(null)

        try{
          const {user} = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          )

          await updateProfile(user, {
            displayName: data.displayName
          })
          setLoading(false);

          return user
          
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage 

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ter no minimo 6 caraccteres"
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Houve um erro, tente mais tarde."
            }
            setLoading(false);
            setError(systemErrorMessage);
        }
        
    };

   useEffect(() => {
    return () => setCancelled(true);
  }, []);


    return {
        auth,
        createUser,
        error,
        loading,
    };
};