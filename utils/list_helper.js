const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
  var likes = blogs.reduce((like, blog) => {
    return like+blog.likes
    
    
  }, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes
}