import React from 'react'
import ProductBox from './ProductBox'
import ShoppingSummary from '../ShoppingSummary'


//this component groups all the product boxes
export default class GridResults extends React.Component {
	constructor	(props) {
		super(props)
		this.state = {
			shoppingList: [], //it contains all the data(products info) + amount
		}
		
		this.displayProductBox = this.displayyProductBox.bind(this)
		this.handleCart = this.handleeCart.bind(this)
		this.createshoppingListItem = this.createeshoppingListItem.bind(this)
		this.getPosition = this.gettPosition.bind(this)
		this.transferSummary = this.transferrSummary.bind(this)
		this.checksItemAmountInShopingList = this.checkssItemAmountInShopingList.bind(this)
		this.showBigImage = this.showwBigImage.bind(this)

	}
	
	gettPosition(id) {
		let data = this.state.shoppingList
		for (let i in data) {
			if (data[i].id === id) {
				return i
			}
		}
		return -1
	}
	
	createeshoppingListItem(id, amount, name, description, price, type) {
		let shoppingListItem = {
							id: id,
							name: name,
							description: description,
							price: price,
							amount: amount,
							value: price * amount,
							type: type
		}
		return shoppingListItem
	}
	
	handleeCart(id, amount, name, description, price, type) {
		let arrayState = this.state.shoppingList
		let i = this.getPosition(id)  //position inside shoppingList

		if (amount === 0) {	
			arrayState.splice(i, 1) //remove
		}else {
			let item = this.createshoppingListItem(id, amount, name, description, price, type)

			//checks if the product is selected for the first time (create or update)
			if (i === -1) {
				arrayState.push(item)	//add
			} else {
				arrayState[i] = item	//update
			}
		}

		this.setState({shoppingList: arrayState},
			()=>{
				localStorage.setItem('shoppingListLS', JSON.stringify(arrayState))
			})
	}
	
	//load every product and return that array to be shown 
	displayyProductBox() {
		let results = this.props.JsonResults
		let componentList = []
		
 		for (let i in results){
			componentList.push(<ProductBox amount={this.checksItemAmountInShopingList(results[i].id)} 
											JsonResults = {results[i]} 
											key={results[i].id} 
											handler={this.handleCart} 
											transferBigImg={this.showBigImage}/>)
		}
		if (componentList.length > 0) {return componentList}
	}
	
	transferrSummary() {
		return this.state.shoppingList
	}
	
	//to pass the amount to the ProductBox, to display  whether or not the item  was selected
	checkssItemAmountInShopingList(id) {
		let lsString = localStorage.getItem('shoppingListLS')
		let lsJson = JSON.parse(lsString)
		
		for (let i in lsJson) {
			if (id === lsJson[i].id) {
				return lsJson[i].amount
			}
		}
		return 0
	}
	
	async showwBigImage(e) {
		let el = document.getElementById('bigImage')
		let styleImg
		if (e === 'off') {
			styleImg = `
				transform: rotateX(90deg);
				background-image: url('');
				`
		}else {
			styleImg = `
				transform: scale(100%);
				background-image: url('${e}');
				`
		}
		styleImg += `background-repeat: no-repeat;
				background-position: center center;
				background-size: contain;`
		el.setAttribute('style', styleImg)
	}
	
	componentDidMount() {
			if (localStorage.getItem('shoppingListLS') === null) {
				localStorage.setItem('shoppingListLS', '[]')
			}
			let lsString = localStorage.getItem('shoppingListLS')
			let lsJson = JSON.parse(lsString)
			
			this.setState({shoppingList: lsJson})
	}
	

	render() {
		return (
			<section id="gridResultsProducts">
				<div id="bigImage" title= 'Click to close' onClick={()=>this.showBigImage('off')}>
					&times;
				</div>
				{this.displayProductBox()}
				<ShoppingSummary handler={this.transferSummary}/>
			</section>
		)
	}
}