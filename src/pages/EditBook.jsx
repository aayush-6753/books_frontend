import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((res) => {
                setAuthor(res.data.author);
                setTitle(res.data.title);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                alert('Error fetching book details. Please try again.');
                console.error('Error fetching book details:', err);
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        }
        setLoading(true);
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                alert('Error creating book. Please try again.');
                console.error('Error creating book:', err);
            })
    }


    return (
        <div className='p-4 '>
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="border-sky-400 rounded-xl flex flex-col border-2 w-150 p-4 mx-auto" >
                <div className="my-4">
                    <label className="text-wl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-wl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className="my-4">
                    <label className="text-wl mr-4 text-gray-500">Published Year</label>
                    <input
                        type="text"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className="bg-sky-300 p-2 m-8" onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook