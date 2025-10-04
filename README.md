# Lab Activity 4 – Database Joins & API Endpoints

## 📌 Project Overview
This project demonstrates the use of **SQL joins** and **API endpoints** for retrieving relational data.  
It covers table creation, seeding data, running different types of joins, and exposing the results through API endpoints tested in Postman.

---

## 🗄️ Database Schema
The database includes the following tables:
- **Users** – Stores basic user information.
- **Roles** – Defines different user roles.
- **User Roles** – Maps users to their assigned roles.
- **Profiles** – Holds additional profile details for users.
- **Referrals** – Tracks user-to-user referral relationships.
- **Login_Audit** – Logs login activities.
- **Revoked Tokens** – Stores invalidated authentication tokens.

---

## 🔍 SQL Joins Implemented
1. **Inner Join** → Shows users who have at least one assigned role.  
2. **Left Join** → Returns all users, including those without a profile (profile fields will be NULL).  
3. **Right Join** → Returns all roles, including those without assigned users.  
4. **Full Outer Join** → Returns all users and profiles, regardless of match.  
5. **Cross Join** → Displays all possible user–role combinations.  
6. **Self Join** → Demonstrates referrals (users referring other users).  
7. **Left Join + Subquery** → Shows users with their latest login activity (NULL if none).

---

## 🌐 API Endpoints (/reports)
The following endpoints return query results (authorized requests only):

- **`/reports/users-with-roles`** – Users with their roles (INNER JOIN).  
- **`/reports/users-with-profiles`** – Users with optional profile details (LEFT JOIN).  
- **`/reports/roles-right-join`** – Roles with users if assigned (RIGHT JOIN).  
- **`/reports/profiles-full-outer`** – All users and profiles, matched or not (FULL OUTER JOIN).  
- **`/reports/user-role-combos`** – All possible user–role combinations (CROSS JOIN).  
- **`/reports/referrals`** – User referral relationships (SELF JOIN).  
- **`/reports/latest-login`** – Latest login activity per user (LEFT JOIN + subquery).  

🔒 Includes a **negative test case** to validate authentication and error handling.

---

## 📷 Postman Testing
All endpoints were tested using **Postman**:
- Authorized requests successfully returned results.  
- Unauthorized requests (negative test) returned expected error messages.  

---

## 📂 Repository
GitHub Repo: [LabAct-4](https://github.com/smnrn/LabAct-4.git)

---

## 👤 Author
**Roaring, Simon Ron Joshua**  
University of Santo Tomas – College of Information and Computing Sciences  
3-ISB | ICS2609

