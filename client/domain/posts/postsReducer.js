export const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  posts: []
}

export default function postsReducer(state, {type, payload}) {
  switch(type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'LOADED':
      return {
        isLoading: false,
        isLoaded: true,
        posts: payload
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [
          ...state.posts,
          payload
        ]
      }
    case 'UPDATE_POST':
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map(post => (
          post.id === payload.id ? {...post, ...payload } : post
        ))
      }
    case 'DELETE_POST':
      console.log('DELETE_POST')
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        posts: state.posts.filter(post => post.id !== payload)
      }
    default:
      return state
  }
}