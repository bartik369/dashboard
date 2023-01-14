import React, { useState } from 'react';
import "./devices.css"
import { categoryDevice } from '../../../utils/data-arrays/arrays';


export default function CategoryMenu({sortCategory, reset}) {

  const [activeLi, setActiveLi] = useState("")

  const sortDevice = (value) => {
    setActiveLi(value);
    sortCategory(value);

    if (!value) {
      reset();
    }
  }

  return (
    <nav className="category-menu">
        <ul>
          {categoryDevice.map((item, index) => (
            <li
            className={`category-menu__item ${activeLi === item.value ? 'item-active' : ""}`}
            key={index}
            icon={item.iconClassName}
            onClick={() => sortDevice(item.value)}>{item.name}</li>
          )
          )}
      </ul>
    </nav>
  )
}


