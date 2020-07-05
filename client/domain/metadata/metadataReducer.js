export const initialState = {
  isLoading: false,
  isLoaded: false,
  isSaving: false,
  value: null
}

export default function metadataReducer(state, {type, payload}) {
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      }
    case 'LOADED':
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isSaving: false,
        value: payload
      }
    case 'SET_VALUE':
      return {
        ...state,
        value: {
          ...state.value,
          ...payload
        }
      }
    case 'SAVING':
      return {
        ...state,
        isSaving: true
      }
    default:
      return state
  }
}