import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = (bookId, aggiornaCommenti) =>{
  const [commentObject, setCommentObject] = useState({
    comment: '',
      rate: '1',
      elementId: bookId,
  })

  const sendNewReview = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTljMjljZGUwZGQxZDAwMTgyZDE4YjQiLCJpYXQiOjE3MDQ3MzMxMzMsImV4cCI6MTcwNTk0MjczM30.iQcrWjbTsWpnknSarl5aGt0OIZdVmCV9H_Zgypx-EKE',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentObject),
        }
      )
      if (response.ok) {
        alert('commento salvato!');
        aggiornaCommenti()
        setCommentObject({
          comment: '',
          rate: '1',
          elementId: bookId,
        })
      } else {
        const error = await response.json();
        console.error('Error saving comment:', error)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

    return (
      <Form onSubmit={sendNewReview}>
        <Form.Group className="mb-1 mt-4">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            type="text"
            value={commentObject.comment}
            onChange={(e) => {
              setCommentObject({
                commentObject: {
                  ...commentObject,
                  comment: e.target.value,
                },
              })
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            aria-label="comment rating"
            value={commentObject.rate}
            onChange={(e) => {
              setCommentObject({
                commentObject: {
                  ...commentObject,
                  rate: e.target.value,
                },
              })
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    )
  }


export default AddComment
