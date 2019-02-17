import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './Components/BookShelf'

class ListBooks extends Component {
    static propTypes = {
        myReads: PropTypes.object.isRequired,
        handleChangeShelfCallBack: PropTypes.func.isRequired,
    }
    
    render(){
        const { myReads, handleChangeShelfCallBack } = this.props

        const shelfProps = [
            {
                name : 'Currently Reading',
                listName: 'readings',
            },
            {
                name : 'Want to Read',
                listName: 'wantReads',
            },
            {
                name : 'Read',
                listName: 'reads'
            }
        ]


        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    {shelfProps.map((shelfProp) => (
                        <BookShelf 
                            myReads={myReads}
                            handleChangeShelfCallBack={handleChangeShelfCallBack.bind(this)}
                            shelfName={shelfProp.name}
                            books={myReads[shelfProp.listName]}
                        />
                    ))}
                    
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