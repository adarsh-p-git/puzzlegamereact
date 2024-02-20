import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled && !flipped) {
        handleChoice(card);
        }
    }



    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img
                    className="front"
                    src={card.src}
                    alt="Card Front"></img>
                <img
                    className="back"
                    src="https://static.vecteezy.com/system/resources/previews/000/694/128/non_2x/geometric-seamless-pattern-with-colorful-squares-vector.jpg"
                    alt="Card Back"
                    onClick={handleClick}></img>
            </div>
        </div>

    )
}