import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div>
      <h2 style={{ "marginTop": "15px" }} > {props.title}</h2>

      <ul>
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/add">İşçi ekle</Link>
        </li>
        <li>
          <Link to="/github">Proje dosyaları</Link>
        </li>
      </ul>

    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired
}
Navbar.defaultProps = {
  title: "hamid app"
}

export default Navbar;