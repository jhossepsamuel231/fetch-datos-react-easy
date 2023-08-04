import { useEffect, useState } from "react";
import { getCatImageUrl } from "../services/facts";

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {

    if (!fact) return

    const threeFirstWord = fact.split(' ', 3).join(' ')
    console.log(threeFirstWord)

    getCatImageUrl(threeFirstWord).then(url => setImageUrl(url));

  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}//devuelve la imagen 