import './Home.css'
import React, { useEffect, useState } from 'react'
import PostList from '../../components/PostList'
import useFirstRender from '../../hooks/useFirstRender'

let id = 1
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
    if (!firstRender && text !== '') { setPosts([...posts, { text, id: ++id }]) }
  }, [text])

  return (
    <div className='home'>
      <div className='menu' />
      <div className='main'>
        <div className='post-creator'>
          <div>
            <img src='user.svg' alt='User' />
            <form action=''>
              <textarea name='post' id='post' cols='50' rows='8' maxLength={255} />
              <input type='submit' value='ClickMe' onClick={(e) => handleClick(e, posts)} />
            </form>
          </div>
        </div>
        <PostList posts={posts} />
      </div>
      <div className='idk' />
    </div>
  )
}

export default Home
