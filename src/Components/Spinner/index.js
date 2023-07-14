import React from 'react'
import styles from './index.module.css'

export default function Spinner(){

    return(
        <div className = {styles.spinnerContainer}>
            <div className = {styles.spinnerContainerCircle} />
        </div>
    )
}