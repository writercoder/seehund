import React from "react";
import {useParams} from "react-router";
import EditPost from "./EditPost";
import {usePosts} from "../../../../domain/posts";
import {getPostById} from "../../../../domain/posts/postsSelectors";
import {useMessages} from "../../../../domain/messages";

export default function EditPostContainer() {
  const {posts, updatePost} = usePosts()
  const {pushMessage} = useMessages()
  const {id} = useParams()

  const handleUpdatePost = async updatedPost => {
    const {error} = await updatePost(updatedPost)
    if(error) {
      pushMessage({level: 'critical', text: error})
    } else {
      pushMessage({level: 'success', text: 'Post updated'})
    }
  }

  return (
    <EditPost
      onUpdatePost={handleUpdatePost}
      post={getPostById(posts.posts, id)}
      loading={posts.isLoading}
    />
  )
}