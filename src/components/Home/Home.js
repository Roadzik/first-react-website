import './Home.css'
const Home = () => {
  const handleClick = (e) => {
    e.preventDefault()
  }

  return (
    <div className='home'>
      <div className='menu' />
      <div className='post-creator'>
        <div>
          <img src='user.svg' alt='User' />
          <form action=''>
            <textarea name='post' id='post' cols='60' rows='10' />
            <input type='submit' value='ClickMe' onClick={handleClick} />
          </form>
        </div>

      </div>
      <div className='idk' />
    </div>
  )
}

export default Home
