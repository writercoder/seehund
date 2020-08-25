import {useEffect, useReducer} from 'react'
import imagesReducer, {initialState} from "./imagesReducer";
import {useUser} from "../user";
import {load, upload} from "./imagesHelper";

export default function useProvideImages() {
  const [state, dispatch] = useReducer(imagesReducer, initialState)
  const {user} = useUser()

  useEffect( () => {
    if(user.userToken) {
      return
    }
    dispatch({type: 'LOADING'})
    const fetchImages = async () => {
      const images = await load(user.userToken)
      dispatch({type: 'LOADED', payload: images})
    }
    fetchImages()
  }, [user.userToken])

  const uploadImage = async image => {
    try {
      dispatch({type: 'LOADING'})
      const image = await upload(user.userToken, image)
      dispatch({type: 'ADD_IMAGE', payload: image})
    } catch(e) {
      dispatch({type: 'ERROR', payload: e.message})
      return {error: e.message}
    }
  }

  return {
    images: state,
    uploadImage: (image) => dispatch('LOA')
  }
}