### Folder: `models/`

You’ll have **7 files total** inside:

```
models/
 ├── userModel.js
 ├── facultyModel.js
 ├── teamModel.js
 ├── courseModel.js
 ├── projectModel.js
 ├── postModel.js
 ├── uploadModel.js
```

---

### 🧍‍♂️ 1️⃣ userModel.js

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
  profilePic: { type: String },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

---

### 👨‍🏫 2️⃣ facultyModel.js

```js
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String },
  subjectsHandled: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin reference
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faculty', facultySchema);
```

---

### 👥 3️⃣ teamModel.js

```js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who created it
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', teamSchema);
```

---

### 📚 4️⃣ courseModel.js

```js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
```

---

### 💡 5️⃣ projectModel.js

```js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  description: { type: String },
  techStack: [{ type: String }],
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  status: { type: String, enum: ['Pending', 'Ongoing', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
```

---

### 📢 6️⃣ postModel.js

```js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
```

---

### 📤 7️⃣ uploadModel.js

```js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: { type: String, required: true },
  type: { type: String }, // image, pdf, etc.
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', uploadSchema);
```

---

### ✅ Optional (Activity Log)

If you later want to add tracking:

```js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  action: String,
  byUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  target: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
```
