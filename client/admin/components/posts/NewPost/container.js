import React, {useState} from 'react'
import NewPost from "./NewPost";
import {usePosts} from "../../../../domain/posts";
import {useHistory} from "react-router";
import {useMessages} from "../../../../domain/messages";

export default function NewPostContainer() {
  const {createPost} = usePosts()
  const [error, setError] = useState()
  const {pushMessage} = useMessages()
  const history = useHistory()

  const handleCreatePost = async newPost => {
    const {error: createError} = await createPost(newPost)

    if(error) {
      setError(createError)
    } else {
      pushMessage({level: 'success', text: 'Post created'})
      history.push('/posts')
    }
  }

  return <NewPost onCreatePost={handleCreatePost} error={setError} />
}
