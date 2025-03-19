# Library Management System
========================================================================


## Introduction
Welcome to the Library Management System! This project is designed to streamline the management of books, members, and transactions in a library. It provides an intuitive and efficient platform for library staff and members to interact with the system, manage resources, and ensure smooth operations. Whether you’re a librarian or a reader, our system offers features to handle all library-related tasks efficiently.

The project is developed with a clean and responsive interface to ensure accessibility across devices. With this system, users can issue, return, and search for books, and administrators can manage inventory, member records, and overdue fines seamlessly.

## Project Type
Frontend | Backend | Fullstack

## Deplolyed Site
Check out the live demo of the website [Here](https://curious-chaja-48876c.netlify.app/).

## Directory Structure
```bash
library-management-system/
├── frontend/
│   ├── src/
│   │   ├── assets/         # Images and static assets
│   │   ├── components/     # React components
|   |   |── context
│   │   ├── App.js          # Main application file
│   │   ├── index.css       # Global styles
│   ├── public/             # Static public files
│   ├── package.json        # Frontend dependencies
└── README.md
```

## Video Walkthrough of the project
https://www.youtube.com/watch?v=rb9GViaQlls

## Features
List out the key features of your application.

### Files  
- **index.css**: Global styles for the project.  
- **App.css**: Component-specific styling for the main app.  
- **.gitignore**: Specifies files and folders to ignore in version control.  
- **book.json**: Configuration or data file for book-related data.
  
# User Features  

### User Registration and Login  
- Users can register or log in.  
- Login status is managed via local storage and state management.  

### Browse Books  
- Users can explore books displayed on the homepage.  

### Borrow Books  
- Borrow book functionality updates the Firebase database with borrowing details.  

### View Profile  
- Users can view their profile and the books they have borrowed.  

# Admin Features  

### Admin Dashboard  
- Display details of all users and books in the library.  
- Add new books to the library.  
- Track borrowed and returned books dynamically.  

### Dynamic Tables  
- View user details, including books they have borrowed.  
- See which books are available and which are currently borrowed.  

### Book Management  
- Add new books to the library using a form in the admin dashboard.

# Usage
  - 1. User Workflow
      Visit the homepage to browse books.
      Log in to borrow books.
      Check profile for borrowed book details.
  - 2. Admin Workflow
      Navigate to the admin dashboard.
      View user and book details.
      Add new books using the provided form.
      Monitor borrowing and returning activities.
     

## Dependencies  

### Frontend  
- **React.js**: For building the user interface.  
- **React Router**: For handling client-side routing.  
- **Axios**: For making API requests.  
- **Context API**: For global state management.  

### Backend  
- **Firebase Realtime Database**: For storing user and book data.  

### File Highlights  
- **Navbar.jsx**: A fixed navigation bar that provides links to different parts of the application.  
- **AdminDashboard.jsx**: Handles admin operations such as adding books, viewing user details, and managing borrowing data. Displays tables dynamically.  
- **Homepage.jsx**: The main landing page displaying books fetched from Firebase.  
- **ThemeContext.jsx**: Manages dark mode and light mode using the Context API.  

## Future Enhancements  
- Add search and filter functionality for books.  
- Implement return book functionality.  
- Provide notifications for overdue books.  
- Enhance mobile responsiveness.


### Installation

1. **Clone the repository:**

   ```bash
   https://github.com/Aadithyanas/Project
   ```

2. **Navigate to the project directory:**

   ```bash
   cd library-management-system/frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```
4. **Start the Development Server:**

   ```bash
   npm start
   ```

## Usage

- Browse through different sections like market trends, news, and cryptocurrency prices.
- Customize the website by editing the HTML and CSS files according to your requirements.


## Screenshots

![Homepage](/sc/Homepage.png)
*Homepage.*

![book collection Overview](/sc/BookCatalog.png)
*book collection Overview.*

![Admin Dashborad](/sc/AdminDashboard.png)
*Admin Dashborad.*

![Dark mode feature](/sc/Darkmode.png)
*Dark mode feature*


![userSignpage](/sc/userSignpage.png)
*userSignpage.*

![footer section](/sc/footerPage.png)
*footer section.*




## Contributing

Contributions are welcome! If you have any ideas for improving the project, feel free to fork the repository and submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes.
4. Commit the changes: `git commit -m 'Add new feature'`.
5. Push to the branch: `git push origin feature-branch`.
6. Submit a pull request.


-------

Feel free to customize it further based on the specifics of your project!
