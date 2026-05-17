import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BooksCard from '../components/home/BooksCard'
import BooksTable from '../components/home/BooksTable'
import CardNav from '../components/CardNav'
import bookwaveLogo from '../assets/bookwave-logo.svg'
import { cacheBookPdf } from '../utils/bookPdfStorage'
import { buildApiUrl } from '../config/api'


const Home = () => {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        setLoading(true);
        axios
            .get(buildApiUrl('/books'))
            .then((res) => {
                // console.log("Full Response:", res)
                setBooks(res.data);
                res.data.forEach((book) => cacheBookPdf(book));
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching books:', err);
                setLoading(false);
            });
    }, [])

    const navItems = [
        {
            label: 'Browse',
            bgColor: '#8A244B',
            textColor: '#FFF1F5',
            links: [
                { label: 'Table View', ariaLabel: 'Switch to table view', onClick: () => setShowType('table') },
                { label: 'Card View', ariaLabel: 'Switch to card view', onClick: () => setShowType('card') }
            ]
        },
        {
            label: 'Current View',
            bgColor: '#D02752',
            textColor: '#FFF1F5',
            links: [
                { label: showType === 'table' ? 'Table Active' : 'Card Active', ariaLabel: 'Current active view' },
                { label: `${books.length} Books Loaded`, ariaLabel: 'Book count' }
            ]
        },
        {
            label: 'Create',
            bgColor: '#F63049',
            textColor: '#FFF1F5',
            links: [
                { label: 'Add New Book', ariaLabel: 'Add a new book', to: '/books/create' },
                { label: 'Open Form', ariaLabel: 'Open the create book form', to: '/books/create' }
            ]
        }
    ]

    return (
        <div className='fade-in'>
            <div className="relative z-[120] mb-8 flex flex-col gap-5 rounded-4xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.84)] p-4 shadow-2xl backdrop-blur-xl md:p-6">
                <CardNav
                    logo={bookwaveLogo}
                    logoAlt="Bookwave Logo"
                    items={navItems}
                    baseColor="#111F35"
                    menuColor="#FFF1F5"
                    buttonBgColor="#F63049"
                    buttonTextColor="#FFF1F5"
                    ease="back.out(1.7)"
                />
                <div className='px-2'>
                    <p className='mb-2 text-sm uppercase tracking-[0.32em] text-[var(--tone-muted)]'>Personal Library</p>
                    <h1 className="text-4xl font-semibold tracking-tight text-[var(--tone-text)]">Books List</h1>
                    <p className='mt-3 max-w-2xl text-sm text-[var(--tone-muted)]'>
                        Open the menu to switch between animated table and card layouts or jump straight into adding a new book.
                    </p>
                </div>
            </div>

            {loading ? (
                <Spinner />) : showType === 'table' ? (
                    <BooksTable books={books} />
                ) : (
                <div className='relative z-0'>
                    <BooksCard books={books} />
                </div>
            )}
        </div>
    )
}

export default Home
