import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from  './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    myReads : {
      readings : [],
      wantReads: [],
      reads: [],
    },
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          myReads : {
            readings : books.filter((book) => book.shelf === "currentlyReading"),
            wantReads: books.filter((book) => book.shelf === "wantToRead"),
            reads: books.filter((book) => book.shelf === "read"),
          }
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks myReads={this.state.myReads} />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks myReads={this.state.myReads}/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
