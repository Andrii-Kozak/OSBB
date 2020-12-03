import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ShowPost from './ShowPost/ShowPost'
import PostsIndex from './PostsIndex/PostsIndex'
import CreatePost from './CreatePost/CreatePost'

const Posts = () => {
  return (
    <Switch>
      <Route exact path='/:locale/account/posts' component={PostsIndex}/>
      <Route exact path='/:locale/account/posts/:id' component={ShowPost}/>
      <Route exact path='/:locale/account/posts/create' component={CreatePost}/>
    </Switch>
  );
}

export default Posts
