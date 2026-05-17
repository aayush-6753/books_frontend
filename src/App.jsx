import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import ReadBook from './pages/ReadBook'

function App() {
  return (
    <div className="app-shell min-h-screen text-[var(--tone-text)]">
      <div className="app-content relative z-10 mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/books/details/:id' element={< ShowBook />} />
          <Route path='/books/read/:id' element={< ReadBook />} />
          <Route path='/books/create' element={< CreateBook />} />
          <Route path='/books/edit/:id' element={< EditBook />} />
          <Route path='/books/delete/:id' element={< DeleteBook />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
