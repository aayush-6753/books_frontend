import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { cacheBookPdf, getCachedBookPdf } from '../utils/bookPdfStorage'
import { buildApiUrl } from '../config/api'

const ReadBook = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [book, setBook] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let isMounted = true

        const loadBook = async () => {
            setLoading(true)
            setErrorMessage('')

            try {
                const res = await axios.get(buildApiUrl(`/books/${id}`))
                if (!isMounted) return

                setBook(res.data)
                cacheBookPdf(res.data)
            } catch (error) {
                const cachedBook = getCachedBookPdf(id)

                if (!isMounted) return

                if (cachedBook) {
                    setBook(cachedBook)
                    setErrorMessage('Showing cached PDF because the latest version could not be fetched.')
                } else {
                    setErrorMessage('No readable PDF was found for this book.')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadBook()

        return () => {
            isMounted = false
        }
    }, [id])

    return (
        <div className='fade-in p-4'>
            <BackButton />
            <div className='mb-6 mt-4 flex flex-wrap items-center justify-between gap-3'>
                <div>
                    <h1 className='text-4xl font-semibold text-[var(--tone-text)]'>Read Book</h1>
                    <p className='mt-2 text-sm text-[var(--tone-muted)]'>
                        {book?.title ? `${book.title}${book.author ? ` by ${book.author}` : ''}` : 'Open your saved PDF reader'}
                    </p>
                </div>
                {book?.bookPdf ? (
                    <a
                        href={book.bookPdf}
                        download={book?.pdfName || `${book?.title || 'book'}.pdf`}
                        className='btn-secondary inline-flex items-center px-4 py-2 text-sm font-semibold'
                    >
                        Download Copy
                    </a>
                ) : null}
            </div>

            {loading ? <Spinner /> : null}

            {errorMessage ? (
                <div className='mb-4 rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(138,36,75,0.24)] px-4 py-3 text-sm text-[var(--tone-text)]'>
                    {errorMessage}
                </div>
            ) : null}

            {book?.bookPdf ? (
                <div className='card-glass overflow-hidden rounded-[32px] border border-[color:var(--tone-border)] p-3 shadow-2xl'>
                    <iframe
                        title={book?.title || 'Book PDF'}
                        src={book.bookPdf}
                        className='h-[78vh] w-full rounded-[24px] bg-white'
                    />
                </div>
            ) : !loading ? (
                <div className='card-glass rounded-[32px] border border-[color:var(--tone-border)] p-8 text-[var(--tone-muted)] shadow-2xl'>
                    Upload a PDF for this book first, then you can open it here later.
                </div>
            ) : null}
        </div>
    )
}

export default ReadBook
