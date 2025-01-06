const API_KEY = '8221bcaaa06b4a98b7ed9c4bc18f3d6e';
const API_URL = 'https://newsapi.org/v2/top-headlines';


let state = {
    articles: [],
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    selectedCategories: new Set(),
    currentSentiment: 'all'
};


const newsGrid = document.getElementById('newsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const categoryInputs = document.querySelectorAll('.categories input');
const sentimentFilter = document.getElementById('sentimentFilter');
const bookmarksBtn = document.getElementById('bookmarksBtn');


document.addEventListener('DOMContentLoaded', initializeApp);
categoryInputs.forEach(input => input.addEventListener('change', handleCategoryChange));
sentimentFilter.addEventListener('change', handleSentimentChange);
bookmarksBtn.addEventListener('click', toggleBookmarksView);


async function initializeApp() {
    await fetchNews('technology'); 
    renderNews();
}


async function fetchNews(category) {
    try {
        showLoading(true);
        const response = await fetch(
            `${API_URL}?category=${category}&apiKey=${API_KEY}&pageSize=20`
        );
        const data = await response.json();
        
        if (data.status === 'ok') {
            state.articles = data.articles.map(article => ({
                ...article,
                sentiment: analyzeSentiment(article.title + ' ' + (article.description || '')),
                id: generateId(article.url)
            }));
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsGrid.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
    } finally {
        showLoading(false);
    }
}


function analyzeSentiment(text) {
    const positiveWords = ['success', 'breakthrough', 'growth', 'positive', 'win'];
    const negativeWords = ['crisis', 'failure', 'loss', 'negative', 'crash'];
    
    text = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
        if (text.includes(word)) score++;
    });
    
    negativeWords.forEach(word => {
        if (text.includes(word)) score--;
    });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
}


function renderNews() {
    const articles = filterArticles();
    
    newsGrid.innerHTML = articles.map(article => `
        <article class="news-card">
            <img src="${article.urlToImage || '/api/placeholder/400/200'}" alt="${article.title}">
            <div class="news-card-content">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <div class="news-card-actions">
                    <span class="sentiment-badge sentiment-${article.sentiment}">
                        ${article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                    </span>
                    <button 
                        class="bookmark-btn ${isBookmarked(article) ? 'active' : ''}"
                        onclick="toggleBookmark('${article.id}')"
                    >
                        ${isBookmarked(article) ? '★' : '☆'}
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}


function filterArticles() {
    let filtered = state.articles;
    
    if (state.currentSentiment !== 'all') {
        filtered = filtered.filter(article => article.sentiment === state.currentSentiment);
    }
    
    return filtered;
}


function toggleBookmark(articleId) {
    const index = state.bookmarks.indexOf(articleId);
    
    if (index === -1) {
        state.bookmarks.push(articleId);
    } else {
        state.bookmarks.splice(index, 1);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    renderNews();
}

function isBookmarked(article) {
    return state.bookmarks.includes(article.id);
}


async function handleCategoryChange(event) {
    const category = event.target.value;
    if (event.target.checked) {
        state.selectedCategories.add(category);
    } else {
        state.selectedCategories.delete(category);
    }
    
    if (state.selectedCategories.size > 0) {
        await fetchNews(Array.from(state.selectedCategories)[0]);
        renderNews();
    }
}

function handleSentimentChange(event) {
    state.currentSentiment = event.target.value;
    renderNews();
}

function toggleBookmarksView() {
    const isShowingBookmarks = bookmarksBtn.classList.toggle('active');
    if (isShowingBookmarks) {
        const bookmarkedArticles = state.articles.filter(article => 
            state.bookmarks.includes(article.id)
        );
        renderBookmarkedNews(bookmarkedArticles);
    } else {
        renderNews();
    }
}


function generateId(url) {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
}

function showLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}const API_KEY = '8221bcaaa06b4a98b7ed9c4bc18f3d6e';
const API_URL = 'https://newsapi.org/v2/top-headlines';

let state = {
    articles: [],
    bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
    selectedCategories: new Set(),
    currentSentiment: 'all'
};

const newsGrid = document.getElementById('newsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const categoryInputs = document.querySelectorAll('.categories input');
const sentimentFilter = document.getElementById('sentimentFilter');
const bookmarksBtn = document.getElementById('bookmarksBtn');

document.addEventListener('DOMContentLoaded', initializeApp);
categoryInputs.forEach(input => input.addEventListener('change', handleCategoryChange));
sentimentFilter.addEventListener('change', handleSentimentChange);
bookmarksBtn.addEventListener('click', toggleBookmarksView);

async function initializeApp() {
    await fetchNews('technology'); 
    renderNews();
}

async function fetchNews(category) {
    try {
        showLoading(true);
        const response = await fetch(
            `${API_URL}?category=${category}&apiKey=${API_KEY}&pageSize=20`
        );
        const data = await response.json();
        
        if (data.status === 'ok') {
            state.articles = data.articles.map(article => ({
                ...article,
                sentiment: analyzeSentiment(article.title + ' ' + (article.description || '')),
                id: generateId(article.url)
            }));
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsGrid.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
    } finally {
        showLoading(false);
    }
}

function analyzeSentiment(text) {
    const positiveWords = ['success', 'breakthrough', 'growth', 'positive', 'win'];
    const negativeWords = ['crisis', 'failure', 'loss', 'negative', 'crash'];
    
    text = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
        if (text.includes(word)) score++;
    });
    
    negativeWords.forEach(word => {
        if (text.includes(word)) score--;
    });
    
    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return 'neutral';
}

function renderNews() {
    const articles = filterArticles();
    
    newsGrid.innerHTML = articles.map(article => `
        <article class="news-card">
            <img src="${article.urlToImage || '/api/placeholder/400/200'}" alt="${article.title}">
            <div class="news-card-content">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <div class="news-card-actions">
                    <span class="sentiment-badge sentiment-${article.sentiment}">
                        ${article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                    </span>
                    <button 
                        class="bookmark-btn ${isBookmarked(article) ? 'active' : ''}"
                        onclick="toggleBookmark('${article.id}')"
                    >
                        ${isBookmarked(article) ? '★' : '☆'}
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function filterArticles() {
    let filtered = state.articles;
    
    if (state.currentSentiment !== 'all') {
        filtered = filtered.filter(article => article.sentiment === state.currentSentiment);
    }
    
    return filtered;
}

function toggleBookmark(articleId) {
    const index = state.bookmarks.indexOf(articleId);
    
    if (index === -1) {
        state.bookmarks.push(articleId);
    } else {
        state.bookmarks.splice(index, 1);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
    renderNews();
}

function isBookmarked(article) {
    return state.bookmarks.includes(article.id);
}

async function handleCategoryChange(event) {
    const category = event.target.value;
    if (event.target.checked) {
        state.selectedCategories.add(category);
    } else {
        state.selectedCategories.delete(category);
    }
    
    if (state.selectedCategories.size > 0) {
        await fetchNews(Array.from(state.selectedCategories)[0]);
        renderNews();
    }
}

function handleSentimentChange(event) {
    state.currentSentiment = event.target.value;
    renderNews();
}

function toggleBookmarksView() {
    const isShowingBookmarks = bookmarksBtn.classList.toggle('active');
    if (isShowingBookmarks) {
        const bookmarkedArticles = state.articles.filter(article => 
            state.bookmarks.includes(article.id)
        );
        renderBookmarkedNews(bookmarkedArticles);
    } else {
        renderNews();
    }
}

function generateId(url) {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
}

function showLoading(show) {
    loadingSpinner.classList.toggle('hidden', !show);
}

function renderBookmarkedNews(articles) {
    newsGrid.innerHTML = articles.map(article => `
        <article class="news-card">
            <img src="${article.urlToImage || '/api/placeholder/400/200'}" alt="${article.title}">
            <div class="news-card-content">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <div class="news-card-actions">
                    <span class="sentiment-badge sentiment-${article.sentiment}">
                        ${article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                    </span>
                    <button 
                        class="bookmark-btn active"
                        onclick="toggleBookmark('${article.id}')"
                    >
                        ★
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}