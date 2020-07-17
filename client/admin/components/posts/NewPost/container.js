import React, {useState} from 'react'
import NewPost from "./NewPost";
import {usePosts} from "../../../../domain/posts";
import {useHistory} from "react-router";

export default function NewPostContainer() {
  const {createPost} = usePosts()
  const [error, setError] = useState()
  const history = useHistory()

  const handleCreatePost = async newPost => {
    const {error: createError} = await createPost(newPost)

    if(error) {
      setError(createError)
    } else {
      history.push('/posts')
    }
  }

  return <NewPost onCreatePost={handleCreatePost} error={setError} />
}
