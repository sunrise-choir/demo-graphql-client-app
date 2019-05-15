import React from 'react'

export const cursor = {
  cursor: null, // default is null, is a string when exists
  updateCursor: () => {}
}

export const CursorContext = React.createContext(cursor)
