import React from 'react'

export const whoAmI = {
  whoAmI: null, // default is null, is a string when exists
  updateWhoAmI: () => {}
}

export const WhoAmIContext = React.createContext(whoAmI)
