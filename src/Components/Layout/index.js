import React from 'react'
import SearchBar from '../SearchBar'
import Menu from '../MenuBar'

export default class Layout extends React.Component{
    render (){
        return(
            <>
                <SearchBar />
                {this.props.children}
                <Menu />
            </>
        )
    }
}