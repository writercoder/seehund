import metadataReducer, { initialState } from "./metadataReducer";

const blog = {
  title: 'Seal times',
  description: 'Seal news from around the world'
}

export const initialMetadata = initialState;
export const loadingMetadata = metadataReducer(initialMetadata, {type: 'LOADING'})
export const loadedMetadata = metadataReducer(loadingMetadata, {type: 'LOADED', payload: blog})
