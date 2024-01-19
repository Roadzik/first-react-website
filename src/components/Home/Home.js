import './Home.css'
import PostList from '../PostList'
import { useState } from 'react'

const Home = () => {
  
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([
    {text:'dasdasdasdasdasdas', id:1}
  ])

  const handleClick = (e) => {
    e.preventDefault()
    setText(e.target.parentElement[0].value)
    setPosts(...posts, { text: text, id:2 } )
  }
  
  return (
    <div className='home'>
      <div className='menu' />
      <div className='main'>
        <div className='post-creator'>
          <img src='user.svg' alt='User' />
          <form action=''>
            <textarea name='post' id='post' cols='60' rows='10' />
            <input type='submit' value='ClickMe' onClick={handleClick} />
          </form>
        </div>
        <div className="posts">
          <PostList posts={posts} />
        </div>
      </div>
      <div className='idk' />
    </div>
  )
}

export default Home
