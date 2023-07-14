import React, { useEffect } from 'react'
import styles from './index.module.css'

export default function ProductBigImage({ bigImageUrl, setBigImageUrl }) {

	useEffect(() => {
		showBigImage(bigImageUrl)
	}, [bigImageUrl])

	const showBigImage = (e) => {
		let el = document.querySelector('#big-image')
		let styleImg = ''

		if (e === 'off') {
			styleImg = `
				transform: rotateX(90deg);
				background-image: url('');
				`
		} else {
			styleImg = `
				transform: scale(100%);
				background-image: url('${bigImageUrl}');
				`
		}
		el.setAttribute('style', styleImg)
	}

	return (
		<section
			id = "big-image"
			className = {styles.bigImage}
			title = "Click to close"
			onClick = {() => setBigImageUrl('off')}
		>
			&times;
		</section>
	)
}