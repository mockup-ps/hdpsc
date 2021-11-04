import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a rel="noopener noreferrer">Mockup Helpdesk PSC</a>
        <span className="ml-1">per 24/06/2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Lembaga National Single Window</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
