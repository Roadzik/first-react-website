const PostList = (props) => {
  const posts = props.posts
  return (
    <div className='posts'>
      {posts.map((post) => (
        <div className='post-container' key={post.id}>
          <img src='user.svg' alt='User' />
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList
