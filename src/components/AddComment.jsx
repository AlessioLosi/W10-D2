
import { Button, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const AddComment = ({ asin }) => {
  const [comments, setComments] = useState({
    comment: '',
    rate: 1,
    elementId: asin,
  });

  useEffect(() => {
    setComments((prevComments) => ({
      ...prevComments,
      elementId: asin,
    }));
  }, [asin]);

  const sendComments = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comments),
          headers: {
            'Content-type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjODVkNWZkZWUzZDAwMTU5YmRmM2UiLCJpYXQiOjE3MjQ2Nzk2MzcsImV4cCI6MTcyNTg4OTIzN30.Wl7-JfDMd43mQNsMRRc1xtzuH16zVWLBMA6x9f2-Wts",
          },
        }
      );
      if (response.ok) {
        alert('Recensione inviata!');
        setComments({
          comment: '',
          rate: 1,
          elementId: asin,
        });
      } else {
        throw new Error('Qualcosa è andato storto');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComments}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comments.comment}
            onChange={(e) =>
              setComments({
                ...comments,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comments.rate}
            onChange={(e) =>
              setComments({
                ...comments,
                rate: parseInt(e.target.value),
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
