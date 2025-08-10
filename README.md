# User Management System (Express.js + MySQL)

A full-stack web application built with **Node.js**, **Express.js**, **MySQL**, and **EJS** that provides comprehensive user management functionality with a modern UI featuring video backgrounds.

---

## 📋 Project Overview
This platform allows complete **CRUD** operations on user profiles with secure verification for updates and deletions.  
It uses MySQL for data storage, follows RESTful API design principles, and implements responsive UI using Bootstrap.

---

## 🛠️ Technology Stack

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js v5.1.0** - Web application framework
- **MySQL2 v3.14.1** - Database driver for MySQL
- **EJS v3.1.10** - Embedded JavaScript templating
- **EJS-mate v4.0.0** - Layout support for EJS

**Additional Libraries**
- **method-override v3.0.0** - HTTP method override middleware
- **uuid v11.1.0** - Unique ID generation
- **@faker-js/faker v9.8.0** - Fake data generation (development)

### **Frontend**
- **Bootstrap 5.3.3** - CSS framework
- **HTML5** - Markup
- **CSS3** - Styling with video backgrounds
- **JavaScript** - Client-side interactivity

---

## 🗄️ Database Structure

### **User Table Schema**
```sql
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
```

## 📸 Preview
[User Management Dashboard Preview](images/Video.gif)

<p align="center">
  <img src="images/Video.gif" alt="User Management Dashboard Preview" width="800">
</p>

