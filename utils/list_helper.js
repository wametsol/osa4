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
const mostBlogs = (blogs) => {
  var bloggers = []
  blogs.map(blog => {
    if(bloggers.find(blogger => 
    blogger.author === blog.author)){/*
      console.log('FIND : ',bloggers.find(blogger => 
        blogger.author === blog.author));
      
      var blogger = bloggers.find(blogger => 
        blogger.author === blog.author)
      var maara = blogger.blogs +1
      //console.log('maara ', maara);
      //console.log('blogger: ', blogger);
      
      var i = bloggers.indexOf[blogger]
      //console.log(bloggers.indexOf(blogger));
      
      blogger = {
        author: blog.author,
        blogs: +2
      }
      bloggers[bloggers.indexOf(blogger)] = blogger
      */
      var blogger = bloggers.find(blogger => 
        blogger.author === blog.author)
        //console.log(bloggers[bloggers.indexOf(blogger)])
        bloggers[bloggers.indexOf(blogger)] = {
          author : blogger.author,
          blogs : blogger.blogs+1
        }
      //console.log('löytyi: ', blog.author, 'blogeja: ', blogger.blogs+1);
      
    }
    else{
      var blogger = {
        author : blog.author,
        blogs : 1
      }
    bloggers.push(blogger)

    }

    
    
    
    
  })
  var mostblogger=bloggers[0]
   
    bloggers.map(blogger => {
    
    if(+mostblogger.blogs < +blogger.blogs){
       mostblogger = blogger
       
    }
    else{
     
    }
    
    
  })
  
  //console.log('bloggers: ', bloggers);
  //console.log('mostblogger: ', mostblogger);
  
  
  return mostblogger
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}