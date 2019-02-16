import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShortDetails from './Components/BookShortDetails';


class ListBooks extends Component {
    static propTypes = {
        myReads: PropTypes.array.isRequired,
    }

    state = {
        myReads : {
          readings : [],
          wantReads: [],
          reads: [],
        },
      }

    componentDidMount(){
        this.setState(() => ({
            myReads: this.props.myReads
        }))
    }

    handleChangeShelfCallBack = (myReads) => {
        this.setState({
            myReads
        });
    }
    
    render(){
        const { myReads } = this.props

        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.state.myReads.readings.map((book) => (
                            <li key={book.id}>
                                <BookShortDetails 
                                    book={book}
                                    myReads={this.state.myReads}
                                    handleChangeShelfCallBack={this.handleChangeShelfCallBack.bind(this)}
                                    />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {myReads.wantReads.map((book) => (
                            <li key={book.id}>
                                <BookShortDetails 
                                    book={book}
                                    myReads={myReads}
                                    handleChangeShelfCallBack={this.handleChangeShelfCallBack.bind(this)}
                                    />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {myReads.reads.map((book) => (
                            <li key={book.id}>
                                <BookShortDetails 
                                    book={book} 
                                    myReads={myReads}
                                    handleChangeShelfCallBack={this.handleChangeShelfCallBack.bind(this)}
                                    />
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                <Link
                    to='/search'
                    className="open-search"
                    >
                    <button>Add a book</button>
                </Link>
            </div>
        )
    }
}

export default ListBooks