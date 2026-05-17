const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://book-list-h093.onrender.com'

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`

export { API_BASE_URL }
