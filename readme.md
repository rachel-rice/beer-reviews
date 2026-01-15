# Brew Review

The Brew Review is a full-stack web application that allows users to log in and create reviews for beers they’ve tried. Reviews are publicly viewable, while authenticated users can manage their own content through a personal dashboard.

**Link to project:** Not deployed (local development project)

![Screenshot of the application](/public/images/brew-review-login.png)
![Screenshot of the application](/public/images/brew-review-reviews.png)
![Screenshot of the application](/public/images/brew-review-dashboard.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, Handlebars  
**Dependencies:** express, morgan, mongoose, materialize, moment, connect-mongo, dotenv, express-handlebars, express-session, method-override, passport, passport-google-oauth20

This project was built to deepen my understanding of full-stack application architecture, authentication, and data modeling. The backend is powered by Node.js and Express and follows an MVC structure to keep routing, business logic, and views clearly separated.

MongoDB is used to store user accounts and beer reviews, with Mongoose providing schema definitions and relationships between users and their reviews. Authentication is handled using Passport with Google OAuth, allowing users to log in securely and access protected routes such as their personal dashboard.

Server-side rendering is implemented with Handlebars to dynamically generate pages for login, review listings, and user dashboards. Sessions are managed using express-session and stored in MongoDB with connect-mongo to maintain authentication state across requests.

This architecture allowed me to focus on data flow, access control, and maintainable project structure rather than relying on a frontend framework.

## Optimizations

After the core functionality was in place, attention was given to organizing the codebase using MVC principles and ensuring routes and models were clearly defined. UI styling was handled with Materialize to provide a clean and consistent interface without custom-heavy CSS.

## Future Improvements

Planned improvements include adding search functionality by brewery and beer style, implementing a local authentication option alongside Google OAuth, allowing users to upload photos with reviews, and introducing a rating system for beers (such as a star-based score).

## Lessons Learned:

This project reinforced the importance of project organization and committing code early and often. Working with MVC architecture helped me better understand separation of concerns, while implementing Google OAuth and session management strengthened my backend authentication skills. It was also my first deeper experience with Handlebars and highlighted both its strengths and areas that require careful planning.

