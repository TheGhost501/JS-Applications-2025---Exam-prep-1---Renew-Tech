# SoftUni Exam Preparation Project

This repository contains my solution for a **SoftUni exam preparation project**.  
The project was originally developed together with our lecturer during the exercise session, and afterwards I extended and improved several parts of it independently.

## 📌 Overview

The application is built using:
- **JavaScript (ES modules)**
- **Lit-HTML**
- **Page.js (Client-side routing)**
- **SoftUni’s Practice Server API**

It implements the full CRUD functionality required for the exam preparation tasks, including:
- Create Solution  
- View Solution  
- Edit Solution  
- Delete Solution  
- Details Page  

## ⭐ Bonus Feature: Like Button (Reworked)

During the exercise, we created the initial logic for the Bonus task.  
However, I later **reworked and completed** the Like functionality so it fully meets the requirements:

### ✔ User can like a Solution  
### ✔ Owner cannot like their own Solution  
### ✔ Guest cannot like at all  
### ✔ User can like only once  
### ✔ Counter updates correctly after liking  
### ✔ Like button disappears after clicking  

This required:
- Fetching total like count  
- Checking if the logged-in user already liked  
- Conditional rendering in lit-html  
- Fixing template argument order  
- Ensuring correct API calls to `/data/likes`  

All logic is now fully working and stable.
