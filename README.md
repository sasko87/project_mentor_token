# Mentor Token

**Mentor Token** is a **responsive full-stack web application** designed to help **startups find experienced mentors** and give **mentors the opportunity to discover and apply to jobs** that match their expertise.

The main goal of the application is to create a **simple and user-friendly platform** where both sides can interact — startups can post job offers, and mentors can apply. Startups can then review applications and either accept or reject them.

This project helped me **practice and improve my full-stack development skills** using modern web technologies.

---

## 🌐 Live Demo

*https://mentor-token.stevkovski.xyz*

---

## 💡 Features

- **User registration and login** with secure authentication  
- **Role-based access** for Startups and Mentors  
- **JWT tokens** for protected routes and session handling  
- **Job search and filtering** for mentors  
- **Dedicated dashboards** for both mentors and startups  

### Startups can:
- Create and manage job posts  
- View mentor applications  
- Accept or reject applications  
- Access a personalized **startup dashboard**  

### Mentors can:
- Browse available jobs  
- Search and filter job listings  
- Apply to interesting job offers  
- Track the status of their applications  
- Access a personalized **mentor dashboard**

- Responsive UI that works on desktop, tablet, and mobile  
- Email notifications sent using **Mailgun** (e.g. after applying or decision update)  
- Simple and clean user interface using **plain CSS**

---

## 🛠️ Tech Stack

### Frontend:
- React.js with Vite  
- Plain CSS (no CSS frameworks)  
- API   
- React Router for page navigation  

### Backend:
- Node.js  
- Express.js  
- MongoDB with Mongoose for data modeling  
- JWT for authentication  
- Mailgun for sending email notifications  

---

## 🔐 Authentication & Authorization

- Secure password storage using **bcrypt**  
- Login and registration forms for both mentors and startups  
- JWT token-based access for protected routes  
- Role-based permissions to control access to different actions (e.g., only startups can post jobs)  
