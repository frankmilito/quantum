import React from "react"

const Header = () => {
  return (
    <ul className="flex ml-auto w-full font-bold">
      <li className="text-xs text-grey-800 ml-auto mr-6 border-b-2 border-green-400 border-t-1">
        Header
      </li>
      <li className="text-xs text-grey-800 mr-6 alert-notice cursor-pointer border-b-2">
        Alerts
      </li>
      <li className="text-xs text-grey-800 cursor-pointer border-b-2 hover:border-green-400">
        Map
      </li>
      <li className="text-xs text-grey-800 mr-6 cursor-pointer border-b-2 hover:border-green-400">
        Satelite
      </li>
      <li className="text-xs text-grey-800 cursor-pointer border-b-2 hover:border-green-">
        News
      </li>
    </ul>
  )
}

export default Header