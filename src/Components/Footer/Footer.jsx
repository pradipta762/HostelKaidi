import React from 'react'
import { MdQrCodeScanner } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex justify-between items-center px-4'>
      <MdQrCodeScanner />
      <FaUserAlt />
    </div>
  )
}

export default Footer