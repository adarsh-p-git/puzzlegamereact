import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <>
        <Navbar className=" bg-dark-subtle">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://th.bing.com/th/id/R.9d9b2cb4d94a9b8c62ca5315a722c38b?rik=wzP6FWbNq6AA%2fg&riu=http%3a%2f%2fclipart-library.com%2fimg%2f1223500.png&ehk=Ls92VMe2npezrx%2fIxwj%2bbQMzrkAdcasL2fKNfseK0EI%3d&risl=&pid=ImgRaw&r=0"
              
              height="35"
              className="d-inline-block align-top"
            />{' '}
            MEMORIZE PLEX : "Train Your Brain, Match the Gain"
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header