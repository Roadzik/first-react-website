import './Home.css'
import React, { useEffect, useState } from 'react'
import PostList from '../PostList'

import useFirstRender from '../../hooks/useFirstRender'

const Home = () => {
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([
    { text: 'dasdasdasdasdasdas', id: 1 }
  ])

  const handleClick = (e, arr) => {
    e.preventDefault()
    setText(e.target.parentElement[0].value)
  }

  const firstRender = useFirstRender()
  useEffect(() => {
    if (!firstRender) { setPosts([...posts, { text, id: 2 }]) }
  }, [text])

  return (
    <div className='home'>
      <div className='menu' />
      <div className='main'>
        <div className='post-creator'>
          <img src='user.svg' alt='User' />
          <form action=''>
            <textarea name='post' id='post' cols='60' rows='10' />
            <input type='submit' value='ClickMe' onClick={(e) => handleClick(e, posts)} />
          </form>
        </div>
        <PostList posts={posts} />
      </div>
      <div className='idk' />
    </div>
  )
}

export default Home
