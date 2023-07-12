import React, { useEffect, useState, useContext } from 'react'
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
		let summaryContainer = document.querySelector('.summaryContainer')
		let txtBtnShowCart = document.querySelector('.txtBtnShowCart')
		let vh = (window.innerHeight - 52).toString() +'px'

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
	
	/* const loadSummary = () => {
		let obj = shoppingList //it is the shoppingList(with product amount) from GridResults
		let table = ''
		let btnSummary = document.querySelector('.btnSummary').style
		let total = 0
		let stringData = ''
		
		if (Object.keys(obj).length > 0) {
			table = `<table className="tableSummary"><tr><th>Name</th><th>Type</th><th>Price</th><th>Amount</th><th>Value</th></tr>`
			for (let i in obj) {
				table +=  `<tr><td>${obj[i].name}</td><td>${obj[i].type}</td><td>R$${obj[i].price}</td><td>${obj[i].amount}</td><td>R$${obj[i].value}</td></tr>`
				stringData += obj[i].name + ' ' + obj[i].type + ' ' + obj[i].price + ' ' + obj[i].amount + ' ' + obj[i].value + '\r' + ' '
				total += obj[i].value
			}
			stringData += 'total: ' + total
			table += `<tr><td colspan="5" className= "total">Total: R$${total}</td></tr>`
			table += `<tr><td colspan="5" className= "btnSendWhatsapp"><button disabled title="Very Soon..">BUY</button></td></tr></table>`
			// table += `<tr><td colspan="5" className= "btnSendWhatsapp"><a href="https://api.whatsapp.com/send/?phone=${this.state.wsNumber}&text=${stringData}&app_absent=0" target="_blank" title="Click to send this Summary to the seller">BUY</a>&nbsp;
				// <input type="text" value="${this.state.wsNumber}" onChange="${(e)=>this.setState({wsNumber:e.target.value})}" className="whatsappNumber" placeholder="write your whatsapp Number"/></td></tr></table>`
			
			document.querySelector('.summaryContainer').innerHTML = table	
			
			btnSummary.visibility = 'visible'
			btnSummary.transform = 'translateY(0px)'
		} else {
			document.querySelector('.summaryContainer').innerHTML = ''
			btnSummary.visibility = 'hidden'
			btnSummary.transform = 'translateY(100px)'
		}
	} */
	
	const calcTotal = () => {
		let obj = shoppingList
		let totalObj = [0, 0] //total $, and total products
		
		
		for (let i in obj) {
			totalObj[0] += obj[i].value
			totalObj[1] += 1
		}
		return totalObj
	}

	/* useEffect(()=>{
		//loadSummary()
		
		//update the lower limit of gridResultsProducts, based on the visibility of btnSummary
		if (document.querySelector('.btnSummary').style.visibility === 'visible') {
			document.querySelector('.gridResultsProducts').style.paddingBottom = '16px'
		}else {
			document.querySelector('.gridResultsProducts').style.paddingBottom = '16px'
			document.querySelector('.gridResultsProducts').style.marginBottom = '0px'
		}
		
	},[shoppingList]) */

	const setSortedByFn = (param, i) => {
		setSortedBy(param)
		const filterSymbols = document.querySelectorAll('.filter-symbol')
		filterSymbols.forEach((e)=>{
			e.style.visibility = 'hidden'
		})
		
		document.querySelectorAll('.filter-symbol')[i].style.visibility = 'visible'
	}

	return(
		<section className = "summaryParent">
			<div className = "summaryContainer">
				<table className="tableSummary">
					<thead>
					<tr>
						<th onClick={(e)=>setSortedByFn('type', 0)}>
							 Type <span className = "filter-symbol"> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('name', 1)}>
							 Name <span className = "filter-symbol"> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('price', 2)}>
							 Price <span className = "filter-symbol"> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('amount', 3)}>
							 Amount <span className = "filter-symbol"> ▾ </span>
						</th>
						<th onClick={(e)=>setSortedByFn('value', 4)}>
							 Value <span className = "filter-symbol"> ▾ </span>
						</th>
					</tr>
					</thead>

					<tbody>
					{sortedShoppingList!==undefined &&
						sortedShoppingList!==null && 
							sortedShoppingList.length !== 0 && 
								sortedShoppingList.map((data, i)=>
									(<tr key={i}>
										<td>{data.type}</td>
										<td>{data.name}</td>
										<td>R${data.price}</td>
										<td>{data.amount}</td>
										<td>R${data.value}</td>
									</tr>)
					)}
					<tr>
						<td 
							className= "total"
						>
							Total: 
						</td>
						<td 
							colSpan="3" 
							className= "total" 
						/>
						<td 
							className = "total"
						>
							R${calcTotal()[0]}
						</td>
					</tr>
					<tr>
						<td 
							colSpan="5" 
							className = "container-buttons"
						>
							<button 
								className = "container-buttons__buy-button"
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
				className = "btnSummary" 
				onClick = {() => showSummary()}
			>
				<div className = "imgLittleCartContainer">
					<img 
						className = "imgLittleCart" 
						src = {process.env.PUBLIC_URL + "/cart.png"} 
						alt = "Cart Icon" 
					/>
					<div className = "infoCartTotalAmount">{calcTotal()[1]}</div>
				</div>
				
				<span className = "txtBtnShowCart">Display Cart</span>
				<span className = "totalBtnShowCart">R${calcTotal()[0]}</span>			
			</button>
		</section>
	)	
}

//futuramente poner opcion vaciar carrito y botones de arrow amount en resumen(loadsummary)
//el spinner, ver de ponerlo unico