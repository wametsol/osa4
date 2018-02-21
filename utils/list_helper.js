const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
  var likes = blogs.reduce((like, blog) => {
    return like+blog.likes
    
    
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {

  
  var favblog=blogs[0]
   
  favblogid = blogs.map(blog => {
    
    if(+favblog.likes < +blog.likes){
       favblog = blog
      return blog._id
    }
    else{
      return
    }
    
    
  })
  
  return favblog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}