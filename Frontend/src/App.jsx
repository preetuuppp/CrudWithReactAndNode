import { useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const fetchData = async() => {
    let response=await fetch ("https://fakestoreapi.com/products")
    let data= await response.json()
    console.log(data[0])
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      </>
  )
}

export default App
