import React from 'react'
import styles from './ShowItem.module.scss'
import Moment from 'moment'
import { Icon } from 'semantic-ui-react'
import { BrouserRouter, Link } from 'react-router-dom'



const ShowItem = (props)=> {
  const {
    title, short_description, image, long_description, is_visible,
    is_private, created_at, updated_at, osbb_id, user_id
  } = props.data

  console.log(props);


  return (
    <div className={styles.postBlock}>
      <img src={image.url} alt={title} />
      <div className={styles.middleContainer}>
        <h5>Posted at {Moment(created_at).format('MMMM Do YYYY, hh:mm:ss')}</h5>
        <div className={styles.buttons}>
          <Icon link title='Edit Post' name='edit outline' />
          <Icon link title='Delete Post' name='trash alternate outline' />
          <Link to='/:locale/account/posts'>
            <Icon link title='Back' name='step backward' />
          </Link>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.longDescription}>{long_description}</p>
      </div>
    </div>
  )
}

export default ShowItem