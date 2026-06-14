import React, { useState } from 'react'
import DesignOne from './DesignOne'
import DesignTwo from './DesignTwo'

function App() {
  const [isDesignOne, setIsDesignOne] = useState(true)

  return (
    <>
      <DesignOne />
    </>
  )
}

export default App