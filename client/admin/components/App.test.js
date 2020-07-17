import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {loadedMetadata} from '../../domain/metadata/fixtures'
import {MetadataContextProvider} from '../domain/metadata'
import {UserContextProvider} from "../../domain/user"

import App from './App';

const renderLoggedOut = () => render(
  <MetadataContextProvider initialValue={loadedMetadata}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </MetadataContextProvider>
)

describe('<App />', () => {
  it('can render', () => {
    const {getByText} = renderLoggedOut()

    expect(getByText(loadedMetadata.value.title)).toBeInTheDocument()
  })
})