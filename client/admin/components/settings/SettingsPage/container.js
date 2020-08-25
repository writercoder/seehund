import React from 'react'
import SettingsPage from "./SettingsPage";
import {useMetadata} from "../../../../domain/metadata";
import {useMessages} from "../../../../domain/messages";

export default function SettingsPageContainer() {
  const {metadata, setMetadata} = useMetadata()
  const {pushMessage} = useMessages()

  const handleUpdate = async update => {
    const {error} = await setMetadata(update)
    if(error) {
      pushMessage({level: 'critical', text: `Error saving metadata: ${error}`})
    } else {
      pushMessage({level: 'success', text: 'Settings updated'})
    }
  }

  return (
    <SettingsPage blog={metadata.value} onUpdateSettings={handleUpdate} />
  )
}