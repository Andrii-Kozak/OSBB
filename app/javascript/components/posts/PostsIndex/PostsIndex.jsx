import React, { useState, useEffect, Fragment } from 'react'
import Pagination from 'react-js-pagination'
import { Link, Route, Switch } from 'react-router-dom'
import styles from './PostsIndex.module.scss'
import Loading from '../shared/Loading'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import Post from './Post'
import CreatePost from '../CreatePost/CreatePost'
import ShowPost from '../ShowPost/ShowPost'



const PostsIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  useEffect(()=> {
    const fetchPosts = async () => {
      setLoading(true);
      const resp = await axios.get('/api/v1/posts');
      setPosts(resp.data);
      setLoading(false);
    };

    fetchPosts();

  }, [posts.length])

  const indexOfLastPost  = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts     = posts.slice( indexOfFirstPost, indexOfLastPost );

  const paginationWisible = () => {
    if (!loading) {
      return (
        <div className='paginationBox'>
          <Pagination
            activePage={ activePage }
            itemsCountPerPage={ postsPerPage }
            totalItemsCount={ posts.length }
            pageRangeDisplayed={ Math.ceil(posts.length / postsPerPage) }
            onChange={ handlePageChange }
          />
        </div>
      )
    }
  }

  const ifLoading = () => {
    if (loading)
      return (
        <Loading />
      )
  }
  
  const list = currentPosts.map( item => {
    return (
      <Post
        key={item.id}
        data={item}
      />
    )
  })

  const handlePageChange = ( pageNumber ) => {
    setCurrentPage( pageNumber )
  };

  return (
    <Fragment>
      <div className={styles.posts}>
        <CreatePost />
        {/* <div className={styles.createPost}>
          <Button title='Add New Post' icon='add' />
        </div> */}
        {ifLoading()}
        {list}
        {paginationWisible()}
      </div>
    </Fragment>
  );
}

export default PostsIndex