import React from 'react'
import './BlogDetails.css'
import BlogDetailsSection from '../../Components/BlogDetailsSection/BlogDetailsSection'
import BlogDetailsHero from '../../Components/BlogDetailsHero/BlogDetailsHero'
import BlogBreadcrum from '../../Components/BlogBreadcrum/BlogBreadcrum'

const BlogDetails = () => {
  return (
    <>
    <BlogBreadcrum />
    <BlogDetailsHero/>
    <BlogDetailsSection/>
    </>
  )
}

export default BlogDetails