import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}

const UpdateReducer = (state, action) => {
    switch(action.type) {
        case "LOADING" :
            return {loading: true, error: null};
        case "UPDATE_DOC" :
            return {loading: false, error: null};
        case "ERROR" :
            return {loading: false, error: action.payload};
        default:
        return state;
    }
  
}

export const useUpdateDocument = (docCollection) => {

        const [response, dispatch] = useReducer(UpdateReducer, initialState);

        // deal with memory leak

        const [cancelled, setCancelled] = useState(false);

        const checkcancellBeforeDispatch = (action) => {
            if(!cancelled) {
                return
            } else {
                dispatch(action)
            }
        }

        const updateDocument = async(id, data) => {
            checkcancellBeforeDispatch({
                type: "LOADING",
            })

            try {
                
                const docRef = await doc(db, docCollection, id);

                const updateDocument = await updateDoc(docRef, data);
        
                checkcancellBeforeDispatch({
                    type: "DELETE_DOC",
                    payload: updateDocument
                })
            } catch(error) {
                checkcancellBeforeDispatch({
                    type: "ERROR",
                    payload: error.message
                })
            }
        }

        useEffect(() => {
            return () => setCancelled(true);
        }, [])

        return {updateDocument, response};
};