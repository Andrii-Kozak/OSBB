import React, { useState, useEffect, Fragment } from "react"
import Pagination from "react-js-pagination"
import styles from './Posts.module.scss'
import ItemPost from './Posts/ItemPost/ItemPost'
import Loading from './shared/Loading'
import axios from 'axios'


const Posts = () => {
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
      <ItemPost
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
        {ifLoading()}
        {list}
        {paginationWisible()}
      </div>
    </Fragment>
  );
}

export default Posts
