import React from "react"
import PropTypes from "prop-types"
import { Route, BrowserRouter } from 'react-router-dom'
import styles from './MyOsbb.module.scss'
import MyUtilityProviders from './MyUtilityProviders/MyUtilityProviders'
import Menu from './Menu/Menu'
import News from './News/News'
import { Sidebar } from "semantic-ui-react"

const Posts = (props) => {
    return (
      <BrowserRouter>
        <div className={styles.posts}>
          <div className={styles.navbar}>
            <div className={styles.container}>
              <Sidebar />
            </div>
          </div>
          <Route path='/:locale/account/myosbb/' render={ () => <News />}/>
        </div>  
      </BrowserRouter>
    );
}

export default Posts
