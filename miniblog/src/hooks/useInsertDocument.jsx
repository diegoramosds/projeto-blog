import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}


const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING" :
            return {loading: true, error: null};
        case "INSERTED_DOC" :
            return {loading: false, error: null};
        case "ERROR" :
            return {loading: false, error: action.payload};
        default:
        return state;
    }
  
}

export const useInsertDocument = (docCollection) => {

        const [response, dispatch] = useReducer(insertReducer, initialState);

        const [cancelled, setCancelled] = useState(false);

        const [loading, setLoading] = useState();

        const checkcancellBeforeDispatch = (action) => {
            if(!cancelled) {
                return
            } else {
                dispatch(action)
            }
            setLoading(true);
        }

        const insertDocument = async(document) => {

            checkcancellBeforeDispatch({
                type: "LOADING",
            })

            try {
                const newDocument = {...document, createdAt: Timestamp.now()};

                const inserteDocument = await addDoc(
                    collection(db, docCollection), 
                    newDocument
                    
                )
                checkcancellBeforeDispatch({
                    type: "INSERTED_DOC",
                    payload: inserteDocument
                })
            setLoading(true);
            } catch(error) {
                checkcancellBeforeDispatch({
                    type: "ERROR",
                    payload: error.message
                })
             setLoading(false);
            }
        }

        useEffect(() => {
            return () => setCancelled(true);
        }, [])

        return {insertDocument, response, loading};
};