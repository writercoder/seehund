import React from "react";
import PostsIndex from "./PostsIndex";
import {usePosts} from "../../../../domain/posts/PostsContext";
import {useMessages} from "../../../../domain/messages";

export default function PostsIndexContainer() {
  const {posts, deletePost} = usePosts()
  const {pushMessage} = useMessages()

  const handleDeletePost = async post => {
    const {error} = deletePost(post)
    if(error) {
      pushMessage({type: 'error', message: error})
    } else {
      pushMessage({type: 'error', message: 'Post deleted' })
    }
  }

  return <PostsIndex posts={posts.posts} onDeletePost={handleDeletePost} />
}