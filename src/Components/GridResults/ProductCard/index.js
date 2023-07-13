import React, { useEffect, useState, useContext } from 'react'
import { arrayImages } from '../../Layout/ImportedImages'
import { ShoppingListContext } from '../../../Context'

export default function ProductCard({detailsProduct, setBigImageUrl}) {
	const [amountState, setAmountState] = useState(0)
	const {shoppingList, setShoppingList} = useContext(ShoppingListContext)

	const styleImg = {
		"backgroundImage": `url(${arrayImages[detailsProduct.id-1]})`
	}
	
	const clickAddToCart = () => {
		setAmountState(1)
	}
	
	const arrowsAmount = (e) => {
		e === 'minus' && setAmountState(amountState - 1)
		e === 'plus' && setAmountState(amountState + 1)
	}
	
	//it handles the visibility and effects of the cart button and amount elements
	const toggleEffectsAmount = (e) => {
		let cap = document.getElementById('containerAmountProduct' +  detailsProduct.id).style
		let bac = document.getElementById('btnAddCart' +  detailsProduct.id).style

		if(e === false) {
			bac.transform = 'scale(0%)'
			bac.visibility = 'hidden'
			cap.visibility = 'visible'
			cap.transform = 'translateY(0px)'
		}else {
			bac.transform = 'scale(100%)'
			bac.visibility = 'visible'
			cap.visibility = 'hidden'
			cap.transform = 'translateY(200px)'
		}
	}

	const createShoppingListItem = (id, name, description, price, amount, type) => {
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

	const getPosition = (id) => {
		let data = shoppingList
		for (let i in data) {
			if (data[i].id === id) {
				return i
			}
		}
		return -1
	}

	const handleCart = (id, name, description, price, amount, type) => {
		let arrayState = shoppingList
		let i = getPosition(id)  //position inside shoppingList

		if (amount === 0) {	
			arrayState.splice(i, 1) //remove
		}else {
			let item = createShoppingListItem(id, name, description, price, amount, type)

			//checks if the product is selected for the first time (create or update)
			if (i === -1) {
				arrayState.push(item)	//add
			} else {
				arrayState[i] = item	//update
			}
		}

		setShoppingList([...arrayState])
		
		arrayState.length > 0 &&
		localStorage.setItem('shoppingListLS', JSON.stringify(arrayState))
	}
	
	useEffect(() => {
		handleCart(
					detailsProduct.id, 
					detailsProduct.name, 
					detailsProduct.description,
					detailsProduct.price, 
					amountState,
					detailsProduct.type)

		amountState > 0 
			?toggleEffectsAmount(false)
			:toggleEffectsAmount(true)
			
	},[amountState])

	useEffect(()=>{
		const checksProductAmountInLocalStorage = (id) => {
			let lsString = localStorage.getItem('shoppingListLS')
			let lsJson = JSON.parse(lsString)
			
			for (let i in lsJson) {
				if (id === lsJson[i].id) {
					return lsJson[i].amount
				}
			}
			return 0
		} 
		
		setAmountState(checksProductAmountInLocalStorage(detailsProduct.id))
	},[])

	return (
		<section className = "products">
			<div 
				className = "imageProduct" 
				id = {'imgProduct' + detailsProduct.id} 
				style = {styleImg} 
				onClick = {()=>setBigImageUrl(`${arrayImages[detailsProduct.id-1]}`)} 
				title = "Click to enlarge"
			/>
			<div className = "texts-products">
				<div className = "titleProduct">
					{/* detailsProduct.type + ': '+  */detailsProduct.name}
				</div>
				<div className = "descriptionProduct">
					{detailsProduct.description}
				</div>
				<div className = "priceProduct">
					R${detailsProduct.price}
				</div>
			</div>

			<div className = "background-curvy-price" />
				
			{/* product amount elements */}
			<div 
				className = "containerAmountProduct" 
				id = {'containerAmountProduct' + detailsProduct.id}
			>
				<div 
					className = "arrows" 
					onClick = {()=>arrowsAmount('minus')}
				>
					&#10134;
				</div>
				
				<input 
					className = "inputAmountProduct" 
					type = "text" 
					readOnly 
					id = {'inputAmountProduct' + detailsProduct.id} 
					value = {amountState} 
					onChange = { (e) => setAmountState(e.target.value) }
				/>
				
				<div 
					className = "arrows"
					onClick = {() => arrowsAmount('plus')}
				>
					&#10133;
				</div>
			</div>
			<div 
				className = "btnAddCart" 
				id = {'btnAddCart' + detailsProduct.id} 
				onClick = {() => clickAddToCart()}
			>
				Add to Cart
			</div>
		</section>
	)
}

/* &#128686; trash symbol*/