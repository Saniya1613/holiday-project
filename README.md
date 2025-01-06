
# AI-Powered News Aggregator

**NewsAI** is an AI-driven news aggregation platform that allows users to view the latest headlines from a variety of categories. The app also provides sentiment analysis to classify news articles as positive, neutral, or negative, helping users quickly gauge the mood of the headlines. It allows bookmarking articles and customizing news preferences based on categories like Technology, Business, Science, Health, and Sports.

## Features

- **AI-Powered Sentiment Analysis:** Automatically classifies news articles as positive, neutral, or negative based on the headline and description.
- **Customizable News Preferences:** Users can select preferred categories of news (e.g., Technology, Business, Science, Health, and Sports).
- **Bookmark Articles:** Users can bookmark their favorite articles for later reading.
- **Sentiment Filter:** View articles based on sentiment type (positive, neutral, or negative).
- **User Interface:** Clean and responsive UI, optimized for both desktop and mobile devices.
- **Local Storage Support:** Bookmarks are saved using local storage to retain them between sessions.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **API:** NewsAPI (for fetching news headlines)
- **Sentiment Analysis:** Custom sentiment analysis based on keywords in article titles and descriptions.
- **Local Storage:** Used for storing bookmarks locally in the browser.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/Saniya1613/holiday-project.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd holiday-project
   ```

3. **Open the `index.html` file** in your web browser.

> Note: Ensure that you have internet access to fetch the latest news articles from the API.

## Usage

- Upon opening the website, you will be greeted with the latest news categorized by Technology.
- You can filter news based on sentiments such as Positive, Neutral, or Negative.
- Bookmark your favorite articles by clicking the star icon.
- You can change your news preferences by selecting the desired categories.
- Toggle between showing all articles or only the bookmarked ones by clicking the "Show Bookmarks" button.

## API Key

The application uses the [NewsAPI](https://newsapi.org/) to fetch top headlines. You need to replace the API key in the `script.js` file with your own API key from NewsAPI.

1. Go to [NewsAPI](https://newsapi.org/).
2. Sign up for a free account and generate an API key.
3. Replace the value of `API_KEY` in the `script.js` file with your own API key.

```javascript
const API_KEY = 'your-api-key-here';
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Create a pull request to the `main` branch.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- The project utilizes [NewsAPI](https://newsapi.org/) for fetching the latest headlines.
- Special thanks to the creators of the sentiment analysis algorithm.

---

