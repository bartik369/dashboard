import React from 'react';
import "./devices.css"
import { categoryDevice } from '../../../utils/data-arrays/arrays';

export default function CategoryMenu({sortCategory}) {

  const sortDevice = (value) => {
    sortCategory(value)
  }

  return (
    <nav className="category-menu">
        <ul>
          {categoryDevice.map((item) => (
            <li className="category-menu__item" onClick={() => sortDevice(item.value)}>{item.name}</li>
          )
          )}
      </ul>
    </nav>
  )
}

