import React, {useEffect} from 'react'
import {Layer} from "grommet";

export default function Toast({
  children,
  timeout = 5000,
  position = 'top',
  onClose
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, timeout);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layer
      position={position}
      modal={false}
      margin="none"
    >
      {children}
    </Layer>
  )
}