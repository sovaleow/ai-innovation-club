# AI Innovation Club Website

A modern, responsive website developed for the **AI & Innovation Club**, showcasing artificial intelligence, machine learning projects, workshops, hackathons, learning resources, and club activities.

> **Course:** UCCD2323 Front-End Web Development  
> **Institution:** Universiti Tunku Abdul Rahman (UTAR)

---

## Project Overview

The objective of this project is to design and develop a responsive club website that provides users with information about AI-related events, projects, resources, and membership opportunities while demonstrating front-end web development techniques.

The website emphasizes:

- Responsive and user-friendly UI/UX
- Interactive web components
- Dynamic content
- Browser storage technologies
- RESTful API integration
- jQuery and AJAX
- External service integration

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and semantic elements |
| CSS3 | Styling, animations, transitions, and responsive layouts |
| Bootstrap 5 | Responsive grid system and UI components |
| JavaScript (ES6) | Interactive website functionality |
| jQuery | DOM manipulation, AJAX, animations, and event handling |
| JSON | Store event and project data |
| GitHub REST API | Retrieve event data dynamically |
| Local Storage | Store registrations, newsletter subscribers, and member data |
| Session Storage | Store temporary form and filter data |
| Cookies | Store cookie consent |
| Google Maps | Display club location |
| Formspree | Handle contact form submissions |
| AddToAny | Social sharing functionality |
| Font Awesome / Bootstrap Icons | Interface and social media icons |
| Google Fonts | Website typography |

---

## Website Pages

### 🏠 Home (`index.html`)

- Hero section
- Club introduction
- Featured projects
- Upcoming events
- News and announcements
- Newsletter subscription
- Call-to-action sections
- Responsive navigation

### 🤖 About Us (`about.html`)

- Club introduction
- Mission and Vision
- Committee members
- Club benefits
- Why Join Our Club section

### 📅 Events & Workshops (`events.html`)

- Upcoming workshops and hackathons
- Event search
- Event filtering
- Interactive calendar
- Event registration
- Event details
- Social sharing
- RESTful API integration using jQuery AJAX

### 🚀 AI Projects (`projects.html`)

- Featured AI projects
- Project showcase
- Project sorting
- Pagination
- Project details modal
- Technology tags and project information
- Dynamic project loading from JSON

### 🖼️ Gallery (`gallery.html`)

- Club activity gallery
- Workshop, Hackathon, and Socials categories
- Category filtering
- Image hover effects
- Image lightbox

### 📚 Resources (`resources.html`)

- AI learning resources
- Resource search
- Resource filtering
- Featured resources
- Resource categories

### 📝 Join Us (`join.html`)

- Membership benefits
- Registration form
- Form validation
- Session Storage
- Local Storage
- Registered members display

### 📞 Contact Us (`contact.html`)

- Contact information
- Contact form
- Google Maps
- Social media links
- Formspree integration
- Cookie consent

---

## Project Structure

```text
AI-Innovation-Club/
│
├── .vscode/
│
├── Images/
│   ├── ai-challenge.jpg
│   ├── data-structures.jpg
│   ├── hackathon.jpg
│   ├── ml.jpg
│   ├── open-data.jpg
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── project5.jpg
│   ├── project6.jpg
│   ├── project-aria.jpg
│   ├── react.jpg
│   └── ...
│
├── css/
│   └── style.css
│
├── data/
│   ├── events.json
│   └── projects.json
│
├── js/
│   ├── events.js
│   ├── newsletter.js
│   └── projects.js
│
├── about.html
├── contact.html
├── events.html
├── gallery.html
├── index.html
├── join.html
├── projects.html
├── resources.html
│
└── README.md
