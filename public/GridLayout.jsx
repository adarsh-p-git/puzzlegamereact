import React from "react"; 
import Data from "./Data"; 
import Card from "../src/Card"; 
function GridLayout() { 
    const [cardsArray, setCardsArray] = React.useState([]);  
    const [moves, setMoves] = React.useState(0); 
    const [firstCard, setFirstCard] = React.useState(null); 
    const [secondCard, setSecondCard] = React.useState(null); 
    const [stopFlip, setStopFlip] = React.useState(false);  
    const [won, setWon] = React.useState(0); 
  
    const images = [
        { id: 1, img: 'https://th.bing.com/th/id/OIP.XppO3gwdF2NDvRZyRe7MYwHaHa?rs=1&pid=ImgDetMain', matched: false },
        { id: 2, img: 'https://th.bing.com/th/id/R.b3e690b667971fba9a5d34d386448e60?rik=qEWrZ3YmJE%2bHTg&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f1%2fCitrus-Fruit-PNG-Stock-Images.png&ehk=28PQU%2fT1gHEqOthhTnbdabRaWKBmYHtzUga90imL%2fvY%3d&risl=&pid=ImgRaw&r=0', matched: false },
        { id: 3, img: 'https://th.bing.com/th/id/OIP.MKP4hfpbJiRNH4gZqUhptQHaG8?rs=1&pid=ImgDetMain', matched: false },
        { id: 4, img: 'https://www.pngplay.com/wp-content/uploads/6/Green-Cut-Apple-Fruit-Transparent-PNG.png', matched: false },
        { id: 5, img: 'https://www.pngplay.com/wp-content/uploads/1/Common-Citrus-Fruit-PNG-Free-Image.png', matched: false },
        { id: 6, img: 'https://www.pngplay.com/wp-content/uploads/1/Banana-PNG-Free-Commercial-Use-Images-362x279.png', matched: false },
        

        // Repeat the pattern for as many images as needed
      ];
    //this function start new Game 
    function NewGame() { 
        setTimeout(() => { 
            const randomOrderArray = images.sort(() => 0.5 - Math.random()); 
            setCardsArray(randomOrderArray); 
            setMoves(0); 
            setFirstCard(null); 
            setSecondCard(null); 
            setWon(0); 
        }, 1200); 
    } 
  
    //this function helps in storing the firstCard and secondCard value 
    function handleSelectedCards(item) { 
        console.log(typeof item); 
        if (firstCard !== null && firstCard.id !== item.id) { 
            setSecondCard(item); 
        } else { 
            setFirstCard(item); 
        } 
    } 
  
    // if two have been selected then we check if the images are same or not, 
    //if they are same then we stop the flipping ability 
    // else we turn them back 
    React.useEffect(() => { 
        if (firstCard && secondCard) { 
            setStopFlip(true); 
            if (firstCard.name === secondCard.name) { 
                setCardsArray((prevArray) => { 
                    return prevArray.map((unit) => { 
                        if (unit.name === firstCard.name) { 
                            return { ...unit, matched: true }; 
                        } else { 
                            return unit; 
                        } 
                    }); 
                }); 
                setWon((preVal) => preVal + 1); 
                removeSelection(); 
            } else { 
                setTimeout(() => { 
                    removeSelection(); 
                }, 1000); 
            } 
        } 
    }, [firstCard, secondCard]); 
  
    //after the slected images have been checked for  
    //equivalency we empty the firstCard and secondCard component 
    function removeSelection() { 
        setFirstCard(null); 
        setSecondCard(null); 
        setStopFlip(false); 
        setMoves((prevValue) => prevValue + 1); 
    } 
  
    //starts the game for the first time. 
    React.useEffect(() => { 
        NewGame(); 
    }, []); 
  
    return ( 
        <div className="container"> 
            <div className="header"> 
                <h1>Memory Game</h1> 
            </div> 
            <div className="board"> 
                { 
                    // cards component help in coverting the  
                    // data from array to visible data for screen 
                    cardsArray.map((item) => ( 
                        <Card 
                            item={item} 
                            key={item.id} 
                            handleSelectedCards={handleSelectedCards} 
                            toggled={ 
                                item === firstCard || 
                                item === secondCard || 
                                item.matched === true
                            } 
                            stopflip={stopFlip} 
                        /> 
                    )) 
                } 
            </div> 
  
            {won !== 6 ? ( 
                <div className="comments">Moves : {moves}</div> 
            ) : ( 
                <div className="comments"> 
                    ???????? You Won in {moves} moves ???????? 
                </div> 
            )} 
            <button className="button" onClick={NewGame}> 
                New Game 
            </button> 
        </div> 
    ); 
} 
  
export default GridLayout; 