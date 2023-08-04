import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()


  
  //para recuperar la cita al cargar la pagina
  useEffect(() => {
    //*con fetch*
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        if (!res.ok){
          setFactError('No se ha podido recuperar la cita')
        }
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(data.fact)
      })
  }, [])

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {

    if (!fact) return

    const threeFirstWord = fact.split(' ', 3).join(' ')
    //para coger las 3 primeras palabras: const firstWord = fact.split(' ').splice(0, 3).join(' ')
    //o sino: const firstWord = fact.split(' ', 3)
    console.log(threeFirstWord)

    fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        //primera opcion:
        //setImageUrl(`https://cataas.com${url}`)

        //Segunda opcion: se cambia en el html tmbn(return)
        setImageUrl(url)
      })
  }, [fact]);

  /* useEffect(() => {
    *Con async await*
      async function getRandomFact() {
          const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
          const json = await res.json()
          setFact(json.fact)
      }

      getRandomFact()
  }, []) */

  return (
    <main>
      <h1>App de gatitas del Sur</h1>
      {/* <button onClick={} > Get new fact</button> */}
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first trhee words for ${fact}`} />}

    </main>
  )
}