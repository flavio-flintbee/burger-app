import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients) // passa as keys dos ingredients para um array
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => { // cria um array de arrays onde a length de cada um correspondente à quantidade de cada ingrediente
				return <BurgerIngredient key={igKey + i} type={igKey} />
			});
		}).reduce((arr, el) => {
			return arr.concat(el)
		}, []);

	console.log(transformedIngredients);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
}

export default burger;