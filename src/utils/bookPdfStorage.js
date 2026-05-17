const PDF_CACHE_KEY = 'book-pdf-cache'

const getCache = () => {
    try {
        const raw = localStorage.getItem(PDF_CACHE_KEY)
        return raw ? JSON.parse(raw) : {}
    } catch (error) {
        console.error('Unable to read PDF cache:', error)
        return {}
    }
}

const setCache = (cache) => {
    try {
        localStorage.setItem(PDF_CACHE_KEY, JSON.stringify(cache))
    } catch (error) {
        console.error('Unable to write PDF cache:', error)
    }
}

export const cacheBookPdf = (book) => {
    if (!book?._id || !book?.bookPdf) return

    const cache = getCache()
    cache[book._id] = {
        bookPdf: book.bookPdf,
        pdfName: book.pdfName || '',
        title: book.title || '',
        author: book.author || '',
        updatedAt: Date.now()
    }
    setCache(cache)
}

export const getCachedBookPdf = (bookId) => {
    const cache = getCache()
    return cache[bookId] || null
}
