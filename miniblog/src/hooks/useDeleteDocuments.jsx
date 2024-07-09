import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case "LOADING" :
            return {loading: true, error: null};
        case "DELETE_DOC" :
            return {loading: false, error: null};
        case "ERROR" :
            return {loading: false, error: action.payload};
        default:
        return state;
    }   
  
}

export const useDeleteDocument = (docCollection) => {

        const [response, dispatch] = useReducer(deleteReducer, initialState);

        // deal with memory leak

        const [cancelled, setCancelled] = useState(false);

        const checkcancellBeforeDispatch = (action) => {
            if(!cancelled) {
                return
            } else {
                dispatch(action)
            }
        }

        const deleteDocument = async(id) => {

            checkcancellBeforeDispatch({
                type: "LOADING",
            })

            try {
                const delteDocument = await deleteDoc(doc(db, docCollection, id))
                
                checkcancellBeforeDispatch({
                    type: "DELETE_DOC",
                    payload: delteDocument
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

        return {deleteDocument, response};
};