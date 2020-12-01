import React from "react"
import { NavLink } from "react-router-dom"
import styles from './Sidebar.module.scss'

class Sidebar extends React.Component {
  render () {
    return (
      <div className={styles.tab}>
          <NavLink className={styles.tablinks} to='/en/account/posts/' activeClassName={styles.activeLink} >Posts</NavLink>
          <NavLink className={styles.tablinks} to='/en/account/neighbors/'  activeClassName={styles.activeLink}>Neighbors</NavLink>
          <NavLink className={styles.tablinks} to='/en/account/ossb_info/'  activeClassName={styles.activeLink}>OSBB Info Page</NavLink>
      </div>
    );
  }
}

export default Sidebar
