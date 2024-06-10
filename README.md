<h1>MovieFlicks Application</h1>

**Live Demo:** [View Application](https://react-movieflicks.web.app/)

MovieFlix is a dynamic web application that provides extensive movie listings, allowing users to
browse, search, and filter movies based on their preferences. The application is integrated with The
Movie Database (TMDB) API to fetch and display information about movies.

<h2>Table of Contents</h2>

- [Features](#features)
  - [Dynamic Movie Listings](#dynamic-movie-listings)
  - [Advanced Search Capability](#advanced-search-capability)
  - [Genre Filtering](#genre-filtering)
  - [Responsive Design](#responsive-design)
  - [Detailed Movie Information](#detailed-movie-information)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features

#### Dynamic Movie Listings

- **Infinite Scrolling:** Users can seamlessly scroll through the homepage, search page, and
  genre-specific pages with infinite scroll functionality that loads more movies as the user reaches
  the bottom of the page.

#### Advanced Search Capability

- **Search by Title:** Users can search for movies using based on movie title.

#### Genre Filtering

- **Filter by Genre:** Movies can be filtered by genre. Users can select a genre from the navigation
  bar to view all movies that fall under that genre.

#### Responsive Design

- **SCSS for Styling:** The application uses SCSS to manage styles, providing a clean and
  maintainable structure for CSS styles.

#### Detailed Movie Information

- **Movie Detail Page:** Users can click on any movie card to view detailed information about the
  movie.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: Manages seamless navigation for the application, including error pages
  like 404.
- **SCSS**: For styling the UI.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Context API**: For state management.
- **Axios**: For data fetching.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surajbera/movieflicks
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

## Future Enhancements

- Add user authentication to allow personalized watchlists.
- Provide social sharing options
