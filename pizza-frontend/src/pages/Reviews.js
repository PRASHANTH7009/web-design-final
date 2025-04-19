import React, { useState } from 'react'
import axios from 'axios'

export default function Reviews() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [error, setError] = useState('') // to show error messages
  const [success, setSuccess] = useState('') // optional success message

  async function handleclick() {
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!desc.trim()) {
      setError('Please enter your review.')
      return
    }

    try {
      await axios.post('http://localhost:3000/reviews', {
        username: name,
        description: desc,
      })
      setSuccess('Review submitted successfully!')
      setName('')
      setDesc('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Write a Review</h2>

      {error && (
        <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>
      )}
      {success && (
        <div style={{ color: 'green', fontSize: '14px' }}>{success}</div>
      )}

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type='text'
        placeholder='Review'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleclick}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </div>
  )
}
