import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

const AboutUs = props => {
  const [about, setAbout] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAbout(response.data)
      })
      .catch(err => {
        setError(JSON.stringify(err, null, 2))
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {about && (
        <section className="AboutUs-content">
          <img
            className="AboutUs-photo"
            src={about.imageUrl}
            alt={`A photo of ${about.name}`}
          />
          <h2>{about.name}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>
      )}
    </>
  )
}

export default AboutUs
