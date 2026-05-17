import React from 'react'
import { Link } from 'react-router-dom' // Fixed: Capitalized Link
import { BsInfoCircle } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { HiOutlineBookOpen } from 'react-icons/hi2'
import { PiBookOpenTextLight } from 'react-icons/pi'
import TiltedCard from '../TiltedCard'

const transparentCardImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420" preserveAspectRatio="none">
  <rect width="600" height="420" rx="28" fill="rgba(0,0,0,0)"/>
</svg>
`)}`

const BooksCard = ({ books }) => {
    return (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => (
                <div key={book._id} className='min-h-70'>
                    <TiltedCard
                        imageSrc={transparentCardImage}
                        altText={`${book.title} card`}
                        captionText={`${book.title} - ${book.author}`}
                        containerHeight="100%"
                        containerWidth="100%"
                        imageHeight="100%"
                        imageWidth="100%"
                        rotateAmplitude={5}
                        scaleOnHover={1.02}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="card-glass relative h-full overflow-hidden rounded-[28px] border border-[color:var(--tone-border)] p-5 shadow-2xl transition duration-300">
                                <span className="absolute right-4 top-4 rounded-full bg-[rgba(246,48,73,0.14)] px-3 py-1 text-sm font-semibold text-[var(--tone-mint)]">
                                    {book.publishYear}
                                </span>
                                <div className="mb-4 flex items-center gap-3 text-[var(--tone-text)]">
                                    <PiBookOpenTextLight className="text-3xl text-[var(--tone-mint)]" />
                                    <h2 className="text-xl font-semibold">{book.title}</h2>
                                </div>
                                <div className="mb-6 flex items-center gap-3 text-[var(--tone-text)]">
                                    <BiUserCircle className="text-2xl text-[var(--tone-muted)]" />
                                    <p>{book.author}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-4 text-[var(--tone-text)]">
                                    {book.bookPdf ? (
                                        <Link
                                            to={`/books/read/${book._id}`}
                                            className='flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.8)] p-3 text-[var(--tone-mint)] transition hover:bg-[rgba(138,36,75,0.78)]'
                                        >
                                            <HiOutlineBookOpen className="text-2xl" />
                                        </Link>
                                    ) : (
                                        <span className='flex items-center justify-center rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.45)] p-3 opacity-60'>
                                            <HiOutlineBookOpen className="text-2xl text-[var(--tone-muted)]" />
                                        </span>
                                    )}
                                    <Link to={`/books/details/${book._id}`} className='rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.8)] p-3 transition hover:bg-[rgba(138,36,75,0.78)]'>
                                        <BsInfoCircle className="text-2xl text-[var(--tone-mint)]" />
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`} className='rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.8)] p-3 transition hover:bg-[rgba(138,36,75,0.78)]'>
                                        <AiOutlineEdit className="text-2xl text-[var(--tone-mint)]" />
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`} className='rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(17,31,53,0.8)] p-3 transition hover:bg-[rgba(138,36,75,0.78)]'>
                                        <MdOutlineDelete className="text-2xl text-[var(--tone-mint)]" />
                                    </Link>
                                </div>
                            </div>
                        }
                    />
                </div>
            ))}
        </div>
    )
}

export default BooksCard
