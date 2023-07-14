import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import { ShoppingListContext } from '../../Context'

export default function ShoppingSummary() {
	//const [wsNumber, setWSNumber] = useState('')
	const {shoppingList, setShoppingList} = useContext(ShoppingListContext)
	const [sortedShoppingList, setSortedShoppingList] = useState(null)
	const [sortedBy, setSortedBy] = useState('type')

	const SortShoppingList = (sortedByParam) => {
		if (sortedByParam === 'type' || sortedByParam === 'name'/*  || sortedByParam === 'price' */){
			return shoppingList.sort((a, b)=>{
				return (a[sortedByParam].localeCompare(b[sortedByParam]))
			})
		} else {
			return shoppingList.sort((a, b)=>{
				return (a[sortedByParam] - b[sortedByParam])
			})
		}		
	}
	useEffect(()=>{
		setSortedShoppingList([...SortShoppingList('type')])
	},[shoppingList])

	useEffect(()=>{
		shoppingList.length !== 0 && setSortedShoppingList([...SortShoppingList(sortedBy)])
	},[sortedBy])

		
	const showSummary = () => {
		let summaryContainer = document.querySelector('#summaryContainer')
		let txtBtnShowCart = document.querySelector('#txtBtnShowCart')
		let vh = (window.innerHeight - 50).toString() +'px'

		if (summaryContainer.style.height === vh) {
			summaryContainer.style.height = '20px'
			summaryContainer.style.visibility = 'hidden'
			txtBtnShowCart.innerText = 'Display Cart'
		}else {
			summaryContainer.style.height = vh
			summaryContainer.style.visibility = 'visible'
			txtBtnShowCart.innerText = 'Hide Cart'
		}
	}
	
	const calcTotal = () => {
		let obj = shoppingList
		let totalObj = [0, 0] //total $, and total products
		
		
		for (let i in obj) {
			totalObj[0] += obj[i].value
			totalObj[1] += 1
		}
		return totalObj
	}

	const setSortedByFn = (param, i) => {
		setSortedBy(param)
		const filterSymbols = document.querySelectorAll('.filterSymbolforFN')
		filterSymbols.forEach((e)=>{
			e.style.visibility = 'hidden'
		})
		
		document.querySelectorAll('.filterSymbolforFN')[i].style.visibility = 'visible'
	}

	return(
		<section className = {styles.summaryParent}>
			<div className = {styles.summaryContainer} id = "summaryContainer">
				<table className = {styles.tableSummary}>
					<thead>
					<tr>
						<th onClick={(e)=>setSortedByFn('type', 0)}>
							 Type <span className = {styles.filterSymbol + " filterSymbolforFN"}> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('name', 1)}>
							 Name <span className = {styles.filterSymbol + " filterSymbolforFN"}> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('price', 2)}>
							 Price <span className = {styles.filterSymbol + " filterSymbolforFN"}> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('amount', 3)}>
							 Amount <span className = {styles.filterSymbol + " filterSymbolforFN"}> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('value', 4)}>
							 Value <span className = {styles.filterSymbol + " filterSymbolforFN"}> ▾ </span>
						</th>
					</tr>
					</thead>

					<tbody>
					{sortedShoppingList !== undefined &&
						sortedShoppingList !== null && 
							sortedShoppingList.length !== 0 && 
								sortedShoppingList.map((data, i)=>
									(<tr key = {i}>
										<td>{data.type}</td>
										<td>{data.name}</td>
										<td>R${data.price}</td>
										<td>{data.amount}</td>
										<td>R${data.value}</td>
									</tr>)
					)}
					<tr>
						<td 
							className = {styles.total}
						>
							Total: 
						</td>
						<td 
							colSpan = "3" 
							className = {styles.total}
						/>
						<td 
							className = {styles.total}
						>
							R${calcTotal()[0]}
						</td>
					</tr>
					<tr>
						<td 
							colSpan = "5" 
							className = {styles.containerButtons}
						>
							<button 
								className = {styles.containerButtonsBuyButton}
								disabled 
								title="Soon.."
							>
								BUY
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>

			<button 
				className = {styles.btnSummary} 
				onClick = {() => showSummary()}
			>
				<div className = {styles.imgLittleCartContainer}>
					<img 
						className = {styles.imgLittleCart} 
						src = {process.env.PUBLIC_URL + "/cart.png"} 
						alt = "Cart Icon" 
					/>
					<div className = {styles.infoCartTotalAmount}>{calcTotal()[1]}</div>
				</div>
				
				<span className = {styles.txtBtnShowCart} id = "txtBtnShowCart">Display Cart</span>
				<span className = {styles.totalBtnShowCart}>R${calcTotal()[0]}</span>			
			</button>
		</section>
	)	
}

//futuramente poner opcion vaciar carrito y botones de arrow amount en resumen(loadsummary)
//el spinner, ver de ponerlo unico