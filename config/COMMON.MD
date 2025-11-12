### **Common Required Collections (for both MongoDB & DynamoDB)**

You’ll need around **6–8 main collections/tables** to manage everything cleanly.

| Collection / Table                | Purpose                                                          | Key Fields (example)                                                                               |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Users**                         | Store all registered users (students, admins, faculty).          | `_id`, `name`, `email`, `passwordHash`, `role` (`admin/student/faculty`), `profilePic`, `joinedAt` |
| **Faculties**                     | Info about faculty members created by admin.                     | `_id`, `facultyName`, `email`, `department`, `subjectsHandled`, `createdBy(adminId)`               |
| **Teams**                         | Store team details (created by admin).                           | `_id`, `teamName`, `members[] (userId)`, `facultyId`, `createdBy(adminId)`                         |
| **Courses** *(optional but good)* | Store course / workshop details (like TM Nexus Python Bootcamp). | `_id`, `courseName`, `description`, `duration`, `facultyId`, `students[]`, `createdAt`             |
| **Projects**                      | Store user/team projects.                                        | `_id`, `projectTitle`, `description`, `techStack`, `teamId`, `status`, `createdAt`                 |
| **Posts / Announcements**         | Store TM Nexus Hub announcements.                                | `_id`, `title`, `content`, `createdBy`, `createdAt`                                                |
| **Uploads** *(optional)*          | Store uploaded files/images paths.                               | `_id`, `userId`, `fileUrl`, `type`, `uploadedAt`                                                   |
| **ActivityLogs** *(optional)*     | Track admin/user activity (like updates, deletions).             | `_id`, `action`, `byUser`, `target`, `timestamp`                                                   |

---

### 🧩 **P1 – MongoDB Plan**

✅ **Best choice** for you right now (easier integration with Node/Express).
Use **Mongoose models** for each collection.

* You can connect via `mongoose.connect(process.env.MONGO_URI)`
* Use relationships via `ref: "User"` or `ref: "Team"`
* Schema structure is flexible (JSON-like)

**Example:**

```js
const teamSchema = new mongoose.Schema({
  teamName: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
```

---

### ⚡ **P2 – DynamoDB Plan**

✅ Faster at scale, but more complex for relational data.

* You must **design keys carefully** (e.g., `PK`, `SK`)
* Best if your data access is predictable (like reading by userId or teamId)
* Works well for **serverless (AWS Lambda)** setups

**Example Table Key Setup:**

| Table       | Partition Key | Sort Key    | Notes                               |
| ----------- | ------------- | ----------- | ----------------------------------- |
| `Users`     | `userId`      | —           | Store all user data                 |
| `Teams`     | `teamId`      | `memberId`  | Store all team-member relationships |
| `Faculties` | `facultyId`   | —           | Store faculty data                  |
| `Projects`  | `projectId`   | `teamId`    | Link to team                        |
| `Courses`   | `courseId`    | `facultyId` | Optional course–faculty link        |

---

### 💡 Recommendation

* **Start with MongoDB (P1)** – flexible, faster for development, easy with Express routes you already made.
* Later, if scaling or AWS migration needed → move to **DynamoDB (P2)** with simplified schema.

