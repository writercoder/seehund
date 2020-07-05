import {useEffect, useReducer} from "react";
import {useUser} from "../user/UserContext";
import metadataReducer, {initialState} from "./metadataReducer";
import {loadMetadata} from './metadataHelper'


export default function useProvideMetadata() {
  const [state, dispatch] = useReducer(metadataReducer, initialState)
  const user = useUser()

  useEffect( () => {
    dispatch({type: 'LOADING'})
    const fetchMetadata = async () => {
      const metadata = await loadMetadata(user.userToken)
      dispatch({type: 'LOADED', payload: metadata})
    }
    fetchMetadata()
  }, [user.userToken])

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
