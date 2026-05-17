import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import AnimatedList from '../AnimatedList'

import React from 'react'

const BooksTable = ({ books }) => {
    const bookLabels = books?.map((book) => `${book.title} by ${book.author}`) ?? []

    return (
        <div className='card-glass overflow-hidden rounded-4xl border border-[color:var(--tone-border)] p-4 shadow-2xl'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3 px-2'>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-[0.28em] text-[var(--tone-muted)]'>Animated Table View</p>
                    <p className='text-sm text-[var(--tone-muted)]'>Use hover, arrow keys, or enter to move through your books.</p>
                </div>
                <div className='rounded-full border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.72)] px-4 py-2 text-sm text-[var(--tone-text)]'>
                    {bookLabels.length} books
                </div>
            </div>

            <AnimatedList
                items={books}
                onItemSelect={(book, index) => console.log(bookLabels[index], index)}
                showGradients={true}
                enableArrowNavigation={true}
                displayScrollbar={false}
                initialSelectedIndex={books?.length ? 0 : -1}
                className='mx-auto'
                renderItem={(book, index, isSelected) => (
                    <div
                        className={`rounded-[26px] border px-4 py-4 transition duration-200 ${isSelected
                            ? 'border-[color:var(--tone-mint)] bg-[rgba(246,48,73,0.2)] shadow-lg shadow-[rgba(17,31,53,0.28)]'
                            : 'border-[color:var(--tone-border)] bg-[rgba(138,36,75,0.34)] hover:bg-[rgba(208,39,82,0.26)]'
                            }`}
                    >
                        <div className='grid gap-3 lg:grid-cols-[70px_minmax(0,2fr)_minmax(0,1.5fr)_130px_220px] lg:items-center'>
                            <div className='rounded-2xl bg-[rgba(17,31,53,0.55)] px-3 py-2 text-center text-sm font-semibold text-[var(--tone-muted)]'>
                                #{index + 1}
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.24em] text-[var(--tone-muted)]'>Title</p>
                                <p className='text-lg font-semibold text-[var(--tone-text)]'>{book.title}</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.24em] text-[var(--tone-muted)]'>Author</p>
                                <p className='text-base text-[var(--tone-text)]'>{book.author}</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.24em] text-[var(--tone-muted)]'>Year</p>
                                <p className='text-base text-[var(--tone-text)]'>{book.publishYear || '-'}</p>
                            </div>
                            <div className='flex flex-nowrap items-center gap-3 pt-1 lg:justify-end'>
                                {book.bookPdf ? (
                                    <Link
                                        to={`/books/read/${book._id}`}
                                        className='inline-flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.88)] px-3 py-2 text-[var(--tone-mid)] transition hover:bg-[rgba(138,36,75,0.9)]'
                                    >
                                        <HiOutlineBookOpen className='text-xl' />
                                    </Link>
                                ) : (
                                    <span className='inline-flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.45)] px-3 py-2 text-[var(--tone-muted)] opacity-60'>
                                        <HiOutlineBookOpen className='text-xl' />
                                    </span>
                                )}
                                <Link
                                    to={`/books/details/${book._id}`}
                                    className='inline-flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.88)] px-3 py-2 text-[var(--tone-mint)] transition hover:bg-[rgba(138,36,75,0.9)]'
                                >
                                    <BsInfoCircle className='text-xl' />
                                </Link>
                                <Link
                                    to={`/books/edit/${book._id}`}
                                    className='inline-flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.88)] px-3 py-2 text-[var(--tone-mint)] transition hover:bg-[rgba(138,36,75,0.9)]'
                                >
                                    <AiOutlineEdit className='text-xl' />
                                </Link>
                                <Link
                                    to={`/books/delete/${book._id}`}
                                    className='inline-flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.88)] px-3 py-2 text-[var(--tone-mint)] transition hover:bg-[rgba(138,36,75,0.9)]'
                                >
                                    <MdOutlineDelete className='text-xl' />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default BooksTable
