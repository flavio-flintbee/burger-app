import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {

	// constructor(props){
	// 	super(props);
	// 	this.state = {}
	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState = (ingredients) => {

		const sum = Object.keys(ingredients).map((igKey) => {
			return ingredients[igKey];
		}).reduce((sum,el) => {
			return sum + el;
		}, 0);

		this.setState({purchasable: sum > 0});

	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;

		const priceDedution = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDedution;

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		alert('You continue!');
	}

	render() {

		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0; // retorna true or false
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					<OrderSummary
						totalPrice={this.state.totalPrice} 
						purchaseContinue={this.purchaseContinueHandler}
						purchaseCancel={this.purchaseCancelHandler}
						ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					disabled={disabledInfo}
					ingredientRemoved={this.removeIngredientHandler} 
					ingredientAdded={this.addIngredientHandler}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered= {this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;