import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { cacheBookPdf } from '../utils/bookPdfStorage'
import { buildApiUrl } from '../config/api'

const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(buildApiUrl(`/books/${id}`))
            .then((res) => {
                console.log("Full Response:", res)
                setBook(res.data);
                cacheBookPdf(res.data);
                setLoading(false);
            }).catch((err) => {
                console.error('Error fetching book:', err);
                setLoading(false);
            });

    }, [])

    return (
        <div className='p-4 fade-in'>
            <BackButton />
            <h1 className='my-4 text-4xl font-semibold text-[var(--tone-text)]'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="card-glass w-full max-w-2xl rounded-[32px] border border-[color:var(--tone-border)] p-8 shadow-2xl">
                    <div className="space-y-5 text-[var(--tone-text)]">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Title</span>
                            <span className="text-xl">{book.title}</span>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Author</span>
                            <span className="text-xl">{book.author}</span>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Publish Year</span>
                            <span className="text-xl">{book.publishYear || '-'}</span>
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Cover Image</span>
                            {book.bookImage ? (
                                <img
                                    src={book.bookImage}
                                    alt={book.imageName || `${book.title} cover`}
                                    className="h-48 w-36 rounded-2xl border border-[color:var(--tone-border)] object-cover shadow-lg"
                                />
                            ) : (
                                <span className="text-sm text-[var(--tone-muted)]">No image uploaded</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Read Book</span>
                            {book.bookPdf ? (
                                <Link
                                    to={`/books/read/${book._id}`}
                                    className='inline-flex w-fit items-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.88)] px-4 py-2 text-sm font-semibold text-[var(--tone-text)] transition hover:bg-[rgba(138,36,75,0.9)]'
                                >
                                    Open PDF
                                </Link>
                            ) : (
                                <span className="text-sm text-[var(--tone-muted)]">No PDF uploaded</span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Created</span>
                            <span className="text-sm text-[var(--tone-muted)]">{book.createdAt ? new Date(book.createdAt).toLocaleString() : '-'}</span>
                        </div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                            <span className="min-w-[10rem] text-lg font-medium text-[var(--tone-muted)]">Updated</span>
                            <span className="text-sm text-[var(--tone-muted)]">{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : '-'}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowBook
