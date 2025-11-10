# 🎓 Student Project Management System (SPMS) — Backend V2.0

A robust Node.js + Express + MongoDB backend for managing **student teams**, **faculty**, and **problem statements** with **JWT-based authentication** and role-based access control.

---

## 🚀 Tech Stack
- **Backend Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Documentation:** Swagger (OpenAPI 3.0)  
- **Security:** Bcrypt + CORS + Role-based middleware  

---

## 🧩 Folder Structure
```

SPMS/
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── facultyController.js
│   ├── studentController.js
│   ├── teamController.js
│   └── psController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Admin.js
│   ├── Faculty.js
│   ├── ProblemStatement.js
│   ├── Team.js
│   └── User.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── facultyRoutes.js
│   ├── studentRoutes.js
│   ├── teamRoutes.js
│   └── psRoutes.js
├── swagger.yaml
├── server.js
└── .env

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone <GITURL>
cd spms-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/spms_db
JWT_SECRET=yourSecretKey
NODE_ENV=development
```

### 4️⃣ Run Server

```bash
npm run dev
```

> Runs on: **[http://localhost:5000](http://localhost:5000)**

---

## 🔐 API Routes Overview (V2.0)

Base URL → `http://localhost:5000/api/spms/v1`

| Role        | Route Prefix | Description                               |
| ----------- | ------------ | ----------------------------------------- |
| **Auth**    | `/auth`      | Register & Login                          |
| **Admin**   | `/admin`     | Manage faculty, teams, problem statements |
| **Faculty** | `/faculty`   | Create and manage PS                      |
| **Student** | `/students`  | View and choose PS                        |
| **Teams**   | `/teams`     | Manage student teams                      |
| **PS**      | `/ps`        | Problem statement endpoints               |

---

## 🧠 Example API Usage

### 🧾 Register

**POST** `/api/spms/v1/auth/register`

```json
{
  "name": "Tharvesh",
  "email": "tharvesh@college.edu",
  "password": "123456",
  "role": "student",
  "batch": "A"
}
```

### 🔑 Login

**POST** `/api/spms/v1/auth/login`

```json
{
  "email": "tharvesh@college.edu",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "role": "student"
}
```

### 🧩 Create Problem Statement (Faculty/Admin)

**POST** `/api/spms/v1/ps`

```json
{
  "title": "IoT Smart Soil Monitor",
  "description": "Sensor-based soil health analysis.",
  "allowedBatches": ["A", "B"],
  "academicYear": "2025-2026"
}
```

**Header:** `Authorization: Bearer <token>`

---

## 📘 Swagger API Docs

Access detailed API documentation here:
👉 [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 🧾 Developer Notes

* Teams can have **1–4 members**.
* Faculty can manage **max 2 batches per Problem Statement**.
* Students can select **only one PS per academic year**.
* Admin can **create faculty accounts** and **manage all data**.

---

## 🧑‍💻 Maintainer

**Founder / Developer:** [Tharvesh Muhaideen A](https://tharvesh-muhaideen.vercel.app)

**Organization:** TM Nexus

**Tagline:** *"Dreams turn into ideas, ideas grow into projects, and projects evolve into solutions."*

---

## 🏗️ Upcoming (V2.1 Roadmap)

* Admin analytics dashboard
* PS–Team–Faculty linking report (PDF export)
* Cloud upload for documents (Google Drive / Cloudinary)
* Role-based frontend dashboard API
