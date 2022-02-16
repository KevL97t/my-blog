import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'

import { getComments } from '../services'


const Comments = ({ slug }) => {

  const [comments, setComments] = useState([]);

  useEffect(()=>{
    getComments(slug)
        .then((result) => setComments(result))
        console.log(comments);
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length}
            {' '}
            {
            comments.length === 1 
            ? <span>Comment</span>
            : <span>Comments</span>
            }
          </h3>
          {comments.map(item => (
            <div key={item.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
              <p className='mb-2'>
                <span className='font-semibold'>
                  {item.name}
                </span>
                {' '}
                on
                {' '}
                {moment(item.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className='whitespace-pre-line text-gray-700 w-full bg-slate-300 p-2 rounded-r-lg'>
                {parse(item.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments