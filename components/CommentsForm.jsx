import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])


  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if(storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
        .then((res) => {
          setShowSuccessMessage(true);
          setTimeout(()=>{
            setShowSuccessMessage(false)
          }, 3000)
        })

  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="border-bottom mb-8 pb-4 text-xl font-semibold">Leave a Comment</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          name="comment"
          className="outlline-none w-full rounded-lg bg-gray-200 p-4 text-gray-700 focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="outlline-none w-full rounded-lg bg-gray-200 py-2 px-4 text-gray-700 focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="outlline-none w-full rounded-lg bg-gray-200 py-2 px-4 text-gray-700 focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input ref={storeDataEl} type='checkbox'  id='storeData' name='storeData' value='true'/>
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Save my email and name for the next time I comment.</label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          onClick={handleCommentSubmission}
          type="button"
          className="ease inline-block cursor-pointer rounded-md bg-amber-500 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-700"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
