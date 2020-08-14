import { useEffect, useState } from "react"
import AppLayout from "components/AppLayout"
import Button from "components/Button"
import { addDevit, onAuthStateChanged } from "firebase/client"
import { useRouter } from "next/router"

export default function ComposeTweetPage() {
  const [user, setUser] = useState(undefined)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    }).then(() => router.push("/home"))
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="¿Qué está pasando?"
            value={message}
          />
          <div>
            <Button disabled={message.length === 0}>Twittear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          border: 0;
          font-family: system-ui;
          font-size: 21px;
          min-height: 150px;
          padding: 32px;
          resize: none;
          width: 100%;
        }

        div {
          padding: 8px 32px;
        }
      `}</style>
    </>
  )
}
