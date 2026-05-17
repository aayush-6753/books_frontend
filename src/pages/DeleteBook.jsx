import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { buildApiUrl } from '../config/api'

const DeleteBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(buildApiUrl(`/books/${id}`))
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                alert('Error fetching book details. Please try again.');
                console.error('Error fetching book details:', err);
            });
    }, [id]);

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(buildApiUrl(`/books/${id}`))
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                alert('Error deleting book. Please try again.');
                console.error('Error deleting book:', err);
            });
    };

    return (
        <div className='p-4 fade-in'>
            <BackButton />
            <h1 className='my-4 text-4xl font-semibold text-[var(--tone-text)]'>Delete Book</h1>
            {loading ? <Spinner /> : null}
            <div className='card-glass mx-auto w-full max-w-2xl rounded-4xl border border-[color:var(--tone-border)] p-8 text-center shadow-2xl'>
                <h3 className='text-2xl font-semibold text-[var(--tone-text)]'>Are you sure you want to delete this book?</h3>
                <div className='my-6 space-y-2 text-[var(--tone-text)]'>
                    <p className='text-xl font-semibold'>{book.title}</p>
                    <p className='text-[var(--tone-muted)]'>{book.author}</p>
                    <p className='text-[var(--tone-muted)]'>Published: {book.publishYear}</p>
                </div>
                <button
                    className='mt-4 w-full rounded-2xl border border-[color:var(--tone-border)] bg-[rgba(40,90,72,0.82)] px-6 py-3 font-semibold text-[var(--tone-text)] shadow-lg transition hover:bg-[rgba(64,138,113,0.88)]'
                    onClick={handleDeleteBook}
                >
                    Yes, Delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteBook
