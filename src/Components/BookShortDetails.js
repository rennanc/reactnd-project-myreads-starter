import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import { defaultNames } from '../Utils/Constants'


class BookShortDetails extends Component {
    static propTypes = {
        myReads: PropTypes.object.isRequired,
        book: PropTypes.object.isRequired,
        handleChangeShelfCallBack: PropTypes.func
    }

    pushUnique = (array, newItem) => {
        if(!array.find((arrayItem) => arrayItem.id === newItem.id)){
            array.push(newItem)
        }
    }

    handleRemoveList = (array, item) => {
        return array.filter(obj => obj.id !== item.id)
    }

    handleChangeShelf = (book, value) => {
        if("currentlyReading" === value){
            this.pushUnique(this.props.myReads.readings, book)
        }else{
            this.props.myReads.readings = this.handleRemoveList(this.props.myReads.readings, book)
        }
        if("wantToRead" === value){
            this.pushUnique(this.props.myReads.wantReads, book)
        }else{
            this.props.myReads.wantReads = this.handleRemoveList(this.props.myReads.wantReads, book)
        }
        if("read" === value){
            this.pushUnique(this.props.myReads.reads, book)
        }else{
            this.props.myReads.reads = this.handleRemoveList(this.props.myReads.reads, book)
        }
        if("none" === value){
            this.props.myReads.readings = this.handleRemoveList(this.props.myReads.readings, book)
            this.props.myReads.wantReads = this.handleRemoveList(this.props.myReads.wantReads, book)
            this.props.myReads.reads = this.handleRemoveList(this.props.myReads.reads, book)
        }

        BooksAPI.update(book, value)

        if(this.props.handleChangeShelfCallBack != null)
            this.props.handleChangeShelfCallBack(this.props.myReads);
    }

    handleBookShelfPosition = (bookID) => {
        if(this.props.myReads.readings.find((book) => book.id === bookID)){
            return "currentlyReading"
        }
        if(this.props.myReads.wantReads.find((book) => book.id === bookID)){
            return "wantToRead"
        }
        if(this.props.myReads.reads.find((book) => book.id === bookID)){
            return "read"
        }
        return "none"
    }

    showImage = (imageLinks) => {
        let style = { 
            width: 128,
            height: 193,
        };

        if(imageLinks !== undefined){
             if(imageLinks.smallThumbnail != null){
                style = {...style, backgroundImage: `url(${imageLinks.smallThumbnail})`};
            }else{
                style = {...style, backgroundImage: `url(${imageLinks.thumbnail})`};
            }
        }
        return style
    }

    render(){
        const { book } = this.props
        
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={this.showImage(book.imageLinks)}></div>
                    <div className="book-shelf-changer">
                    <select
                        defaultValue={this.handleBookShelfPosition(book.id)}
                        onChange={(event) => this.handleChangeShelf(book, event.target.value)}
                    >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors != null && book.authors.map((author) => author).join(', ')}</div>
            </div>
        )
    }
}

export default BookShortDetails;