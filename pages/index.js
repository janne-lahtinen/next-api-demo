import { useRef, useState } from "react"

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value // could use validation
    const enteredFeedback = feedbackInputRef.current.value // could use validation
    const reqBody = { email: enteredEmail, text: enteredFeedback }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedbackItems(data.feedback)
      })
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea rows='5' id="email" ref={feedbackInputRef} />
        </div>
        <button onClick={submitFormHandler}>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  )
}

export default HomePage