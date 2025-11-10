# 🧾 CHANGELOG — SPMS Backend (V2.0)

## 🚀 Version 2.0.0 — November 2025
### Major Updates
- **Modular Architecture Revamp**
  - Split routes and controllers based on roles:
    - `/api/spms/v1/admin`
    - `/api/spms/v1/faculty`
    - `/api/spms/v1/students`
    - `/api/spms/v1/teams`
    - `/api/spms/v1/ps`
    - `/api/spms/v1/auth`
  - Improved maintainability and access control between `admin`, `faculty`, and `student`.

- **Enhanced Server Setup**
  - Updated `server.js` with new route mapping.
  - Added Swagger documentation and route for `/api/docs`.
  - Improved API response consistency and status codes.
  - CORS + JSON parser optimizations.

- **Swagger (OpenAPI 3.0) Integration**
  - New versioned documentation: `swagger.yaml` (SPMS V2.0)
  - Added schemas for `Register`, `Login`, and Problem Statement operations.
  - JWT-based bearer authentication added for protected routes.

- **Database Model Refinement**
  - Separated core models:
    - `Admin.js`, `Faculty.js`, `User.js`, `Team.js`, `ProblemStatement.js`
  - Defined better references for:
    - Faculty ↔ ProblemStatement
    - Team ↔ Students ↔ ProblemStatement
  - Added timestamps and validation for student team limits (1–4 members).

- **Security Improvements**
  - JWT authentication middleware applied to all role-specific routes.
  - Role-based access:
    - `Admin`: Full CRUD + faculty creation.
    - `Faculty`: Can create/view PS (max 2 batches).
    - `Student`: Can view and choose one PS per academic year.

- **Documentation & Structure**
  - Organized folders:
    ```
    config/
    controllers/
    middleware/
    models/
    routes/
    ```
  - Added version label `v1` under `/api/spms/v1/` for future versioning support.

---

### 🧩 Next Planned (V2.1 Preview)
- Admin dashboard analytics endpoints.
- Faculty workload tracking.
- PDF/Excel export of student–PS data.
- Cloud file upload (Drive/Cloudinary).

---

> **Maintained by:** TM Nexus Developer Team  
> **Founder:** [Tharvesh Muhaideen A](https://tharvesh-muhaideen.vercel.app)  
> *“Dreams turn into ideas, ideas grow into projects, and projects evolve into solutions.”*
