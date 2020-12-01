import React, { Fragment } from 'react'
import styles from './ItemPost.module.scss'

const ItemPost = (props) => {
  return (
    <div className={styles.lightContainer}>
      <div className={styles.postSubBox}>
        <h1 className={styles.title}>
          <a href={`/account/posts/${props.data.id}`}>{props.data.title}</a>
        </h1>
        <p>{props.data.short_description}</p>
      </div>
      <img className={styles.subBoxImg} src={props.data.image.url} alt={props.data.title} />
    </div>
  );
}

export default ItemPost

