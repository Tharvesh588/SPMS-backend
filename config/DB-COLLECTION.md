## Common Collections

### 1. **users**

Used for **login + authentication** for all roles (admin, faculty, student).

**Fields:**

```js
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: String, // "admin", "faculty", "student"
  department: String,
  regNo: String, // for students
  createdAt: Date,
  updatedAt: Date
}
```

✅ All users share this collection — easier to manage auth and JWT.

---

### 2. **faculties**

Used to store **extra faculty info** (if needed separate from user).

**Fields:**

```js
{
  _id: ObjectId,
  userId: ObjectId, // reference to users._id
  name: String,
  department: String,
  email: String,
  password: String,
  assignedStudents: [ObjectId], // list of userIds of students
  createdAt: Date
}
```

---

### 3. **students**

If you want separate collection for student details (optional but good for clarity).

**Fields:**

```js
{
  _id: ObjectId,
  userId: ObjectId, // linked to users collection
  name: String,
  regNo: String,
  department: String,
  email: String,
  teamId: ObjectId, // linked to team
  facultyId: ObjectId, // assigned guide
  createdAt: Date
}
```

---

### 4. **teams**

Used for **grouping students + linking to project/problem statement**.

**Fields:**

```js
{
  _id: ObjectId,
  teamName: String,
  members: [ObjectId], // list of student userIds
  facultyId: ObjectId, // guide
  selectedProblem: ObjectId, // linked to ProblemStatement._id
  status: String, // "pending", "approved", "completed"
  createdAt: Date
}
```

---

### 5. **problemstatements**

Used for **project topics / problem definitions** created by faculty.

**Fields:**

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  createdBy: ObjectId, // faculty userId
  department: String,
  tags: [String],
  createdAt: Date
}
```

---

### 6. **submissions**

Used for **team project submissions / progress tracking**.

**Fields:**

```js
{
  _id: ObjectId,
  teamId: ObjectId,
  milestone: String, // "Phase 1", "Report", "Final"
  fileUrl: String, // uploaded report or file
  remarks: String,
  marks: Number,
  reviewedBy: ObjectId, // faculty
  submittedAt: Date
}
```

---

### 7. **notifications**

Used to show **alerts or updates** (for admin, faculty, or student).

**Fields:**

```js
{
  _id: ObjectId,
  title: String,
  message: String,
  userId: ObjectId, // who gets it
  role: String, // "student", "faculty", "admin"
  read: Boolean,
  createdAt: Date
}
```

---

### 8. **activitylogs**

Used for **tracking system actions** (audit trail).

**Fields:**

```js
{
  _id: ObjectId,
  userId: ObjectId,
  role: String,
  action: String, // e.g., "Created Team", "Added Problem Statement"
  timestamp: Date
}
```

---

## 🔗 Relation Summary

| Collection        | Linked To                              | Purpose               |
| ----------------- | -------------------------------------- | --------------------- |
| users             | faculties, students, teams             | base authentication   |
| faculties         | users                                  | guide details         |
| students          | users, teams, faculties                | student info          |
| teams             | students, faculties, problemstatements | main project group    |
| problemstatements | faculties, teams                       | project topics        |
| submissions       | teams, faculties                       | project phase uploads |
| notifications     | users                                  | alerts                |
| activitylogs      | users                                  | audit                 |

