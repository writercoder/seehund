import React, {useState} from 'react'

import Toast from '../Toast'
import MessageBox from "../MessageBox";

export default function Message({level, text, onClose}) {
  return <Toast onClose={onClose}><MessageBox level={level}>{text}</MessageBox></Toast>
}