import React, { useState } from 'react';
import "./devices.css"
import { categoryDevice } from '../../../utils/data-arrays/arrays';


export default function CategoryMenu({sortCategory, reset}) {

  const [activeLi, setActiveLi] = useState("")

  console.log(activeLi)

  const sortDevice = (value) => {
    sortCategory(value);
    setActiveLi(value);
  }

  return (
    <nav className="category-menu">
        <ul>
          <li onClick={reset}>All devices</li>
          {categoryDevice.map((item, index) => (
            <li
            className={`category-menu__item ${activeLi === item.name && 'item-active'}`}
            key={index} 
            onClick={() => sortDevice(item.name)}>{item.name}</li>
          )
          )}
      </ul>
    </nav>
  )
}


