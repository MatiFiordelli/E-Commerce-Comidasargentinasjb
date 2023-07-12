import React, { useEffect, useState, useContext } from 'react'
//import { arrayImages } from '../../Layout/ImportedImages'
import ProductCard from './ProductCard'
import ShoppingSummary from '../ShoppingSummary'
import ProductBigImage from './ProductBigImage/index.js'
import { ProductsContext, ShoppingListContext } from '../../Context'

export default function GridResults() {
	let shoppingListLS = localStorage.getItem('shoppingListLS')
	
	const [products, setProducts] = useContext(ProductsContext)
	const [shoppingList, setShoppingList] = useState([]) //it contains all the data(products info) + amount
	const [bigImageUrl, setBigImageUrl] = useState('off')

	useEffect(()=>{
		//console.log(shoppingList)
	},[shoppingList])

	useEffect(()=>{
		if (localStorage.getItem('shoppingListLS') === null) {
			localStorage.setItem('shoppingListLS', '[]')
		}
		let lsString = localStorage.getItem('shoppingListLS')
		let lsJson = JSON.parse(lsString)
		
		setShoppingList(lsJson)
	},[])

	return (
		<ShoppingListContext.Provider value={{shoppingList, setShoppingList}}>
			<main className="grid-products-results">

				<ProductBigImage 
					bigImageUrl = {bigImageUrl} 
					setBigImageUrl = {setBigImageUrl}
				/>

				{Object.keys(products).length > 0 &&
					products.map((data) => (
						<ProductCard
							detailsProduct = {data}
							setBigImageUrl = {setBigImageUrl}
							key = {data.id}
						/>
					))
				}

				<ShoppingSummary />
			</main>
		</ShoppingListContext.Provider>
		)
}