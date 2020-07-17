import {useEffect, useReducer} from "react";
import {useUser} from "../user/UserContext";
import metadataReducer, {initialState} from "./metadataReducer";
import {loadMetadata} from './metadataHelper'


export default function useProvideMetadata(initialValue = null) {
  const [state, dispatch] = useReducer(metadataReducer, initialValue || initialState)
  const {user} = useUser()

  useEffect( () => {
    dispatch({type: 'LOADING'})
    const fetchMetadata = async () => {
      const metadata = await loadMetadata()
      dispatch({type: 'LOADED', payload: metadata})
    }
    fetchMetadata()
  }, [state.isLoaded])

  const saveMetadata = async () => {
    dispatch({type: 'SAVING'})
    const savedMetadata = await saveMetadata(user.userToken, state.value)
    dispatch({type: 'LOADED', payload: savedMetadata})
  }

  return {
    ...state,
    setMetadata: update => dispatch({type: 'SET_VALUE', payload: update}),
    saveMetadata
  }
}
