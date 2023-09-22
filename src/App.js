import { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'

import './App.css'

const App = () => {
  const [number, setNumber] = useState('')
  const [loader, setLoader] = useState(true)
  const [text, setText] = useState('0 is the atomic number of the theoretical element tetraneutron.')

  useEffect(() => {
    setLoader(false) }, [])

  const onChangeInput = async (event) => {  
    setNumber(event.target.value)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let url = "https://apis.ccbp.in/numbers-fact?number=" + number;
    let options = {
        method: "GET"
    };
    const getData = await fetch(url, options)
    const data = await getData.json()

    const { fact } = data
    setText(fact)
  }

  return (
    <Container fluid>
      <Row>
        <div className='app-container d-flex flex-column justify-content-center'>
          <h1 className='app-title mb-4'>Enter a number to know interesting facts about the number</h1>
          <form className='form-container' onSubmit={onSubmitHandler}>
            <input 
              className='user-input'
              type='text'
              name='text'   
              placeholder='Enter your Number...' 
              value={number} 
              onChange={onChangeInput}
            />
            <Button type='submit'>Search</Button>
          </form>

          {loader ? 
            <><ClipLoader color='#00bfff' width={50} aria-label="Loading Spinner" data-testid="loader" /></> 
            : 
            <><p className="fact-text mt-4">{text}</p></>
          }
        </div>
      </Row>
    </Container>
  )
}

export default App