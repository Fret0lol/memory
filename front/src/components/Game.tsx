import {useEffect, useState} from "react";
import {useGame} from "../store/game";

const emojiArray = ["😀", "🎉", "💖", "🎩", "🐶", "🐱", "🦄", "🐬", "🌍", "🌛", "🌞", "💫", "🍎", "🍌", "🍓", "🍐", "🍟", "🍿"];

function shuffle(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function generateCards(level: number) {
	let result: string[] = [];
	const size: number = level * level;
	const candidates: string[] = shuffle(emojiArray);
	candidates.length = size / 2;

	result = [...candidates, ...candidates];
	return shuffle(result);
}

export default function Game() {
	const [cards, setCards] = useState<string[]>([]);
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [foundedCards, setFoundedCards] = useState<number[]>([]);

	const level = useGame((state) => state.level);

	useEffect(() => {
		setCards(generateCards(level));
	}, []);

	const selectCard = (cardIndex: number) => {
    console.log(cardIndex);
    
		let newSelectedCards: number[] = [];

		if (selectedCards.length < 2 && !selectedCards.includes(cardIndex)) {
			newSelectedCards = [...selectedCards, cardIndex];
			setSelectedCards(newSelectedCards);
		}

		// Compare the cards if only 2 cards are selected
		if (newSelectedCards.length === 2) {
			const [card1Index, card2Index] = newSelectedCards;
			const card1 = cards[card1Index];
			const card2 = cards[card2Index];

			if (card1 === card2) {
				setFoundedCards([...foundedCards, card1Index, card2Index]);
			}

			setTimeout(() => {
				setSelectedCards([]);
			}, 500);
		}
	};

	return (
		<>
			<div className="card-container" style={{ gridTemplateColumns: `repeat(${level}, 1fr)`, gridTemplateRows: `repeat(${level}, 1fr)`}}>
				{cards.map((value, index) => (
					<Card key={index} selected={selectedCards.includes(index)} finded={foundedCards.includes(index)} children={value} onClick={() => selectCard(index)} />
				))}
			</div>
		</>
	);
}

function Card({
	selected,
	finded,
	children,
	onClick,
}: {
	selected: boolean;
	finded: boolean;
	children: string;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
	return (
		<div className={`card ${selected ? "selected" : ""} ${finded ? "finded" : ""}`} onClick={onClick}>
			<div className="front"></div>
			<div className="back">{children}</div>
		</div>
	);
}
