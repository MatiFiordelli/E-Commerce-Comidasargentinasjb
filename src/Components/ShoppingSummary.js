import React from 'react'

export default class ShoppingSummary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {wsNumber: ''}
		
		this.showSummary = this.showwSummary.bind(this)
		this.loadSummary = this.loaddSummary.bind(this)
		this.calcTotal = this.calccTotal.bind(this)
	}
	
	componentDidUpdate() {
		this.loadSummary()
	}
	
	showwSummary() {
		let summaryContainer = document.getElementById('summaryContainer')
		
		if (summaryContainer.style.height === '95%') {
			summaryContainer.style.height = '20px'
			summaryContainer.style.visibility = 'hidden'
		}else {
			summaryContainer.style.height = '95%'
			summaryContainer.style.visibility = 'visible'
		}
	}
	
	loaddSummary() {
		let obj = this.props.handler() //it is the shoppingList(with product amount) from GridResults
		let table
		let btnSummary = document.getElementById('btnSummary').style
		let total = 0
		let stringData = ''
		
		if (Object.keys(obj).length > 0) {
			table = `<table id="tableSummary"><tr><th>Name</th><th>Type</th><th>Price</th><th>Amount</th><th>Value</th></tr>`
			for (let i in obj) {
				table +=  `<tr><td>${obj[i].name}</td><td>${obj[i].type}</td><td>R$${obj[i].price}</td><td>${obj[i].amount}</td><td>R$${obj[i].value}</td></tr>`
				stringData += obj[i].name + ' ' + obj[i].type + ' ' + obj[i].price + ' ' + obj[i].amount + ' ' + obj[i].value + '\r' + ' '
				total += obj[i].value
			}
			stringData += 'total: ' + total
			table += `<tr><td colspan="5" id= "total">Total: R$${total}</td></tr>`
			table += `<tr><td colspan="5" id= "btnSendWhatsapp"><a href="https://api.whatsapp.com/send/?phone=${this.state.wsNumber}&text=${stringData}&app_absent=0" target="_blank" title="Click to send this Summary to the seller">BUY</a>&nbsp;
				<input type="text" value="${this.state.wsNumber}" onChange="${(e)=>this.setState({wsNumber:e.target.value})}" id ="whatsappNumber" placeholder="write your whatsapp Number"/></td></tr></table>`
			
			document.getElementById('summaryContainer').innerHTML = table	
			btnSummary.visibility = 'visible'
			btnSummary.transform = 'translateY(0px)'
		} else {
			document.getElementById('summaryContainer').innerHTML = ''
			btnSummary.visibility = 'hidden'
			btnSummary.transform = 'translateY(100px)'
		}
	}
	
	calccTotal() {
		let obj = this.props.handler()
		let totalObj = [0, 0] //total $, and total products
		
		
		for (let i in obj) {
			totalObj[0] += obj[i].value
			totalObj[1] += 1
		}
		return totalObj
	}

	render() {
			return(
				<div>
					<section id="summaryContainer"/>
					<button id="btnSummary" onClick={()=>this.showSummary()}>
						<div id="imgLittleCartContainer">
							<img id="imgLittleCart" src={process.env.PUBLIC_URL + "/cart.png"} alt="Cart Icon"/>
							<div id="infoCartTotalAmount">{this.calcTotal()[1]}</div>
						</div>
						
						<span id="txtBtnShowCart">Display Cart</span>
						<span id="totalBtnShowCart">R${this.calcTotal()[0]}</span>
					
					</button>
					
				</div>
			)
	}
	
}
