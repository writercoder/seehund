import {useEffect, useReducer} from "react";
import {useUser} from "../user/UserContext";
import metadataReducer, {initialState} from "./metadataReducer";
import {loadMetadata, update} from './metadataHelper'


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

  const setMetadata = async (value) => {
    console.log('setMetadata', value)
    dispatch({type: 'SAVING'})
    try {
      const savedMetadata = await update(user.userToken, value)
      dispatch({type: 'LOADED', payload: savedMetadata})
      return {metadata: savedMetadata}
    } catch (e) {
      console.log('error', e)
      dispatch({type: 'ERROR', payload: e.message})
      return {error: e}
    }
  }

  return {
    metadata: state,
    setMetadata
  }
}
