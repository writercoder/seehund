export const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
  images: []
}

export default function imagesReducer(state, {type, payload}) {
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
        images: payload
      }
    case 'ADD_IMAGE':
      return {
        ...state,
        images: [
          ...state.images,
          payload
        ]
      }
    case 'UPDATE_IMAGE':
      return {
        ...state,
        isLoading: false,
        images: state.images.map(post => (
          post.id === payload.id ? {...post, ...payload } : post
        ))
      }
    case 'DELETE_IMAGE':
      return {
        ...state,
        isLoading: false,
        images: state.images.filter(post => post.id !== payload)
      }
    default:
      return state
  }
}