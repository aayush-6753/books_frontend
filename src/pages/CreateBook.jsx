import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { buildApiUrl } from '../config/api'

const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Unable to read file'))
        reader.readAsDataURL(file)
    })

const CreateBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [bookPdf, setBookPdf] = useState('');
    const [pdfName, setPdfName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePdfChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) {
            setBookPdf('')
            setPdfName('')
            return
        }

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.')
            e.target.value = ''
            return
        }

        try {
            const dataUrl = await readFileAsDataUrl(file)
            setBookPdf(dataUrl)
            setPdfName(file.name)
        } catch (error) {
            console.error(error)
            alert('Unable to read the PDF file. Please try again.')
        }
    }

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            ...(publishYear.trim() ? { publishYear } : {}),
            ...(bookPdf ? { bookPdf, pdfName } : {})
        }
        setLoading(true);
        axios
            .post(buildApiUrl('/books'), data)
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
        <div className='p-4 fade-in'>
            <BackButton />
            <h1 className="my-4 text-4xl font-semibold text-[var(--tone-text)]">Create Book</h1>
            {loading ? <Spinner /> : null}
            <div className="card-glass mx-auto w-full max-w-2xl rounded-[32px] border border-[color:var(--tone-border)] p-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[var(--tone-muted)]">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='input-soft'
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[var(--tone-muted)]">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='input-soft'
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[var(--tone-muted)]">Published Year</label>
                        <input
                            type="text"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            placeholder='Optional'
                            className='input-soft'
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[var(--tone-muted)]">Book PDF</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePdfChange}
                            className='input-soft'
                        />
                        <p className="text-sm text-[var(--tone-muted)]">{pdfName || 'Upload a PDF so you can read it later.'}</p>
                    </div>
                </div>
                <button className="btn-primary mt-8 w-full px-6 py-3 text-lg font-semibold" onClick={handleSaveBook}>Save Book</button>
            </div>
        </div>
    )
}

export default CreateBook
