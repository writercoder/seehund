import {useReducer, useEffect} from "react";
import postsReducer, {initialState} from "./postsReducer";
import {useUser} from "../user/UserContext";
import {load, create, update, destroy} from "./postsHelper";

export default function useProvidePosts() {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  const {user} = useUser()

  useEffect( () => {
    if(user.userToken) {
      return
    }
    dispatch({type: 'LOADING'})
    const fetchPosts = async () => {
      const posts = await load(user.userToken)
      dispatch({type: 'LOADED', payload: posts})
    }
    fetchPosts()
  }, [user.userToken])

  const createPost = async post => {
    try {
      dispatch({type: 'LOADING'})
      const createdPost = await create(user.userToken, post)
      dispatch({type: 'ADD_POST', payload: createdPost})
      return {post: createdPost}
    } catch(e) {
      dispatch({type: 'ERROR', payload: e.message})
      return {error: e.message}
    }
  }

  const updatePost = async post => {
    try {
      dispatch({type: 'LOADING'})
      const updatedPost = await update(user.userToken, post)
      dispatch({type: 'UPDATE_POST', payload: updatedPost})
      return {post: updatedPost}
    } catch(e) {
      dispatch({type: 'ERROR', payload: e.message})
      return {error: e.message}
    }
  }

  const deletePost = async post => {
    try {
      dispatch({type: 'LOADING'})
      await destroy(user.userToken, post)
      dispatch({type: 'DELETE_POST', payload: post.id})
      return {}
    } catch(e) {
      dispatch({type: 'ERROR', payload: e.message})
      return {error: e.message}
    }
  }


  return {
    posts: state,
    createPost,
    updatePost,
    deletePost
  }
}