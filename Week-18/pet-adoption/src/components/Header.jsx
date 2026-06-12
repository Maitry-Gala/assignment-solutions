import React from 'react'

const Header = ({ message }) => {
  return (
    <div className="w-full py-4 text-center bg-[#c59771bd]">
    <h1 className="text-4xl font-bold">
      {message}
    </h1>
</div>
  )
}

export default Header