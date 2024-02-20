import { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';
import Header from './Header';


// const cardImages = [
//   { "src": "/img/helmet-1.png", matched:false},
//   { "src": "/img/potion-1.png", matched:false},
//   { "src": "/img/ring-1.png", matched:false},
//   { "src": "/img/scroll-1.png", matched:false},
//   { "src": "/img/shield-1.png", matched:false},
//   { "src": "/img/sword-1.png", matched:false}
// ]
const cardImages = [
  { id: 1, src: 'https://th.bing.com/th/id/OIP.XppO3gwdF2NDvRZyRe7MYwHaHa?rs=1&pid=ImgDetMain', matched: false },
  { id: 2, src: 'https://th.bing.com/th/id/R.b3e690b667971fba9a5d34d386448e60?rik=qEWrZ3YmJE%2bHTg&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f1%2fCitrus-Fruit-PNG-Stock-Images.png&ehk=28PQU%2fT1gHEqOthhTnbdabRaWKBmYHtzUga90imL%2fvY%3d&risl=&pid=ImgRaw&r=0', matched: false },
  { id: 3, src: 'https://th.bing.com/th/id/OIP.MKP4hfpbJiRNH4gZqUhptQHaG8?rs=1&pid=ImgDetMain', matched: false },
  { id: 4, src: 'https://www.pngplay.com/wp-content/uploads/6/Green-Cut-Apple-Fruit-Transparent-PNG.png', matched: false },
  { id: 5, src: 'https://www.pngplay.com/wp-content/uploads/1/Common-Citrus-Fruit-PNG-Free-Image.png', matched: false },
  { id: 6, src: 'https://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Free-Commercial-Use-Images-362x279.png', matched: false },

  // Repeat the pattern for as many images as needed
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

      //Shuffle Cards

      const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))
        

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
      }

      //Handle card choice

      const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      }

      //Compare cards selected

      useEffect(() => {
        if (choiceOne && choiceTwo) {
          setDisabled(true)

          //If cards match, 
          if(choiceOne.src === choiceTwo.src) {
            //Update card state
            setCards(prevCards => {
              //Take in Previous card state to update state 
              return prevCards.map(card => {
                //return new array of cards
                if (card.src === choiceOne.src) {
                //if card src matches choice src
                //return a new object
                //spread card props
                //Changed matched prop to true
                 return {...card, matched:true}
                } else {
                  return card
                }
              })
            })
            resetTurn()
          } else {
            setTimeout(() => resetTurn(), 500)
          }
        }
      }, [choiceOne, choiceTwo])


      // Start Game automatically 

      useEffect(() => {
        shuffleCards()
      }, [])

      //Reset cards

      const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
      }



  return (
    <div className="App">
      <Header/>
      <div className="App1">
      
      
      <button onClick={shuffleCards}>Start New Game</button>
     
      <h4>Moves: {turns}</h4>
      
      <div className="card-grid">
        {cards.map(card => (
          <Card 
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;