import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout'
import Router from './Components/Router'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './Services/FetchProducts/index'
import { ProductsContext, RouteContext } from './Context'

export default function App() {
	const [products, setProducts] = useState(null)
	const [param, setParam] = useState('breads')

	const {
		isLoading,
		isSuccess,
		isError,
		error,
		refetch,
		data } = useQuery(['dataProducts'], () => fetchProducts(), { enabled: false })

	/* 	console.log('isLoading: ' + isLoading)
		console.log('isSuccess: ' + isSuccess)*/
		isError && console.log('error: ' + error) 

	useEffect(() => {
		setProducts(data)
	}, [data])

	useEffect(() => {
		refetch()
	}, [param])

	window.onpopstate = () => {
		refetch()
	}


	return (
		<RouteContext.Provider value={[param, setParam]}>
			<ProductsContext.Provider value={[products, setProducts]}>
				<Layout>
					<Router />
				</Layout>
			</ProductsContext.Provider>
		</RouteContext.Provider>
	)
}