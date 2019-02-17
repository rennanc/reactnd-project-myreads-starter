import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShortDetails from './BookShortDetails'

class BookShelf extends Component {
    static propTypes = {
        myReads: PropTypes.object.isRequired,
        handleChangeShelfCallBack: PropTypes.func.isRequired,
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
    }

    render(){
        const { myReads, handleChangeShelfCallBack, shelfName, books } = this.props

        return(
            <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <BookShortDetails 
                                    book={book}
                                    myReads={myReads}
                                    handleChangeShelfCallBack={handleChangeShelfCallBack.bind(this)}
                                    />
                            </li>
                        ))}
                        </ol>
                    </div>
                </div>
        )
    }
}

export default BookShelf