import React from 'react'
import logo from "../../assets/logoHorizontalBlanco.png"

const logoSection = () => {
  return (
    <div className='flex justify-center items-center p-2'>
        <img src={logo} alt="logo" className="w-12/13"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))" }}
        />
    </div>
  )
}

export default logoSection
