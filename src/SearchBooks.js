import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types'
import BookShortDetails from './Components/BookShortDetails';


class SearchBooks extends Component {
    static propTypes = {
        myReads: PropTypes.array.isRequired,
    }

    state = {
        query: '',
        books: [],
        showSearch: false,
    }

    updateQuery = (query) =>{
        this.setState(() => ({
            query: query.trim(),
            books: [],
            showSearch: false,
        }))
        this.handleSearch()
    }

    clearQuery = () => {
        this.updateQuery('')
    }
    
    handleSearch = () => {
        if(this.state.query !== '')
        BooksAPI.search(this.state.query)
            .then((books) => {
                if(books.length > 0){
                    this.setState(() => ({
                        books : books,
                        showSearch: true
                    }))
                }
            })
    }

    render(){
        const { query, books } = this.state
        const { myReads } = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        >
                        <button className="close-search" >Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}

                            />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.showSearch && books.map((book) => (
                            <li key={book.id}>
                                <BookShortDetails
                                    book={book}
                                    myReads={myReads}
                                />
                            </li>
                        ))}
                        {!this.state.showSearch && (
                            <div>No Results</div>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks