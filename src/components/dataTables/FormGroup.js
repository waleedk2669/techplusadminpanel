import React from 'react'

const FormGroup = ({children}) => {
  return (
    <div style={{display:'flex',margin:'1px 10px',minHeight:'80px',padding:'0 20px', backgroundColor:'white',borderRadius:'1', alignItems: 'center'}} >
        {children}
    </div>      
  )
}

export default FormGroup
