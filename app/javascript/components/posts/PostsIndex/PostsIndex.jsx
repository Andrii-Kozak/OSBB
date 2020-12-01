import React from 'react'
import { Pagination } from 'semantic-ui-react'
import styles from './PostsIndex.module.scss'
//import ItemPost from '../Posts/ItemPost/ItemPost'


class PostsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: [],
      pages: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/posts')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({
        posts: data.posts,
        page: data.current_page,
        pages: data.total_pages
      }) });
  }
  

  handlePage = (e, {activePage}) => {
    let gotopage = { activePage }
    let pagenum = gotopage.activePage
    let pagestring = pagenum.toString()
    this.setState({
      loading: true
    })
    fetch('/api/v1/posts/?page='+pagestring)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ 
        posts: data.posts
       }) });
  }

  render () {
    /* var posts = this.state.posts.map((posts) => {
      return(
        <ItemPost attributes={posts} />
      ) 
    }) */

    return (
      <div className={styles.itemsContainer}>
        {posts}
        <div>Lorem ipsum sit amet i t d</div>
        {/* <div className={styles.pagination}>
          <Pagination
            onPageChange={this.handlePage}
            siblingRange='8'
            defaultActivePage={this.state.page}
            totalPages={this.state.pages}
          />
          
        </div> */}
        <p> Return bottom</p>
      </div>
    )
  }
}

export default PostsIndex


