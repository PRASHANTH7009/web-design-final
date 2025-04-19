import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { gsap } from 'gsap'

export default function Likebutton({ pizzaId }) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['likes', pizzaId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/likes/${pizzaId}`)
      return res.data // expected: { count: number }
    },
    initialData: { count: 0 },
  })

  const currentLikes = data?.count || 0

  const mutation = useMutation({
    mutationFn: async (newCount) => {
      await axios.post(`http://localhost:3000/likes/${pizzaId}`, { newCount })
    },
    onMutate: async (newCount) => {
      await queryClient.cancelQueries({ queryKey: ['likes', pizzaId] })
      const previousData = queryClient.getQueryData(['likes', pizzaId])
      queryClient.setQueryData(['likes', pizzaId], { count: newCount })
      return { previousData }
    },
    onError: (err, newCount, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['likes', pizzaId], context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', pizzaId] })
    },
  })

  const handleLike = () => {
    mutation.mutate(currentLikes + 1)
    // Trigger GSAP bounce effect on button click
    gsap.fromTo(
      '.like-button', 
      { scale: 1 }, 
      { scale: 1.2, duration: 0.2, ease: 'bounce.out', yoyo: true, repeat: 1 }
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        className="like-button"
        onClick={handleLike}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0'
        }}
        aria-label="Like this pizza"
      >
        👍
      </button>
      <span style={{ fontSize: '1rem' }}>{currentLikes}</span>
      {mutation.isError && <p style={{ color: 'red', margin: 0 }}>Error updating likes</p>}
    </div>
  )
}
