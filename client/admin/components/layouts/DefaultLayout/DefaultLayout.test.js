import React from 'react'
import { render } from '@testing-library/react'
import DefaultLayout from './container'
import {MetadataContextProvider} from "../../../../domain/metadata/mocks";
import {loadedMetadata} from '../../../../domain/metadata/fixtures'
import '@testing-library/jest-dom/extend-expect'

describe('DefaultLayout', () => {
  it('renders with title', () => {
    const {getByText} = render(
      <MetadataContextProvider value={loadedMetadata}>
        <DefaultLayout><p>Children</p></DefaultLayout>
      </MetadataContextProvider>
    )
    expect(getByText(/Seal times/i)).toBeInTheDocument()
  })
})



