import React from 'react'

const CreateUser = ({handleSubmit,value,onChange}) => {
  return (
    <form onSubmit={() => handleSubmit()}>
              <label className='username-label fw-bold mb-2'>Enter your name</label>
              <input type="text" className='form-control' value={value} onChange={(e) => onChange(e.target.value)} style={{backgroundColor:"white"}}/>
             </form>
  )
}

export default CreateUser