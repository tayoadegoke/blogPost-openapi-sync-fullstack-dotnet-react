# Automatic Type Generation with OpenAPI - Full CRUD Demo

This project demonstrates how to keep frontend TypeScript types in sync with your backend API using OpenAPI specifications. The backend is built with .NET and automatically generates Swagger/OpenAPI documentation, while the frontend React app uses `@hey-api/openapi-ts` to generate type-safe API clients.

**NEW**: Now includes full CRUD operations with SQLite database persistence!

## Project Structure

```
type-generation/
├── backend/           # .NET Web API with Swagger/OpenAPI
│   ├── Controllers/   # API endpoints with full CRUD
│   ├── Models/        # Data models
│   ├── Data/          # Entity Framework DbContext
│   └── Program.cs     # Application entry point
└── frontend/          # React TypeScript app
    ├── src/
    │   ├── api/       # Generated API clients (auto-generated)
    │   ├── pages/     # React pages for CRUD operations
    │   ├── styles/    # CSS for pages and forms
    │   └── App.tsx    # Main app with routing
    └── package.json
```

## Features

### Backend (.NET)
- **Full CRUD REST API** with POST, GET, PUT, DELETE endpoints
- Two resources:
  - **Users API**: User management with 15+ fields
  - **Products API**: Product catalog with 16+ fields
- **SQLite Database** with Entity Framework Core for data persistence
- **Automatic OpenAPI/Swagger** documentation
- **CORS enabled** for frontend integration
- **Automatic database initialization** with seed data

### Frontend (React + TypeScript)
- **Automatically generated TypeScript types** from OpenAPI spec
- **Type-safe API service layer** with full CRUD operations
- **React Router** for navigation
- **Complete UI** for managing users and products:
  - List view with all items
  - Create new items with forms
  - Edit existing items
  - Delete items with confirmation
- **Axios-based HTTP client**
- **Full intellisense and type checking**

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

## Getting Started

### Step 1: Start the Backend

```bash
cd backend
dotnet restore
dotnet run
```

The backend will start on `http://localhost:5000`. You can access:
- API: `http://localhost:5000/api/users` and `http://localhost:5000/api/products`
- Swagger UI: `http://localhost:5000/swagger`
- OpenAPI JSON: `http://localhost:5000/swagger/v1/swagger.json`

The SQLite database (`blogpost.db`) will be automatically created and seeded with sample data on first run.

### Step 2: Generate Frontend Types

With the backend running, open a new terminal:

```bash
cd frontend
npm install
npm run generate:api
```

The project includes a configuration file `openapi-ts.config.ts` that specifies:
- Input: OpenAPI spec from `http://localhost:5000/swagger/v1/swagger.json`
- Output: TypeScript types and services in `./src/api/`
- Client: Axios-based HTTP client

This command generates:
1. TypeScript types for all models
2. Service classes for all endpoints
3. Type-safe API client methods

The generated files include:
- `models/User.ts` - User type definition
- `models/Product.ts` - Product type definition
- `services/UsersService.ts` - Type-safe API methods (GET, POST, PUT, DELETE)
- `services/ProductsService.ts` - Type-safe API methods (GET, POST, PUT, DELETE)
- `index.ts` - Barrel export for easy imports

### Step 3: Run the Frontend

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`.

## How It Works

### 1. Backend API Definition

The .NET backend uses Entity Framework Core with SQLite and exposes full CRUD operations:

```csharp
// Models/User.cs
public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string Email { get; set; }
    // ... 12+ more fields
}

// Controllers/UsersController.cs
[HttpGet]
public async Task<ActionResult<IEnumerable<User>>> GetUsers() { ... }

[HttpGet("{id}")]
public async Task<ActionResult<User>> GetUser(int id) { ... }

[HttpPost]
public async Task<ActionResult<User>> CreateUser(User user) { ... }

[HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(int id, User user) { ... }

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteUser(int id) { ... }
```

### 2. Type Generation

The `@hey-api/openapi-ts` package reads the OpenAPI spec and generates:

```typescript
// Generated: src/api/models/User.ts
export type User = {
    id: number;
    firstName: string;
    email: string;
    // ... all fields with correct TypeScript types
}

// Generated: src/api/services/UsersService.ts
export class UsersService {
    public static getApiUsers(): Promise<Array<User>> { ... }
    public static getApiUsers1(id: number): Promise<User> { ... }
    public static postApiUsers(user: User): Promise<User> { ... }
    public static putApiUsers(id: number, user: User): Promise<void> { ... }
    public static deleteApiUsers(id: number): Promise<void> { ... }
}
```

### 3. Type-Safe Frontend Code

Your React components get full type safety and intellisense:

```typescript
import { UsersService } from './api'
import type { User } from './api'

// TypeScript knows exactly what fields exist
const [users, setUsers] = useState<User[]>([])

// Fully typed API calls
const usersData = await UsersService.getApiUsers()
setUsers(usersData)

// Create new user
const newUser: User = { /* all required fields */ }
await UsersService.postApiUsers(newUser)

// Update user
await UsersService.putApiUsers(userId, updatedUser)

// Delete user
await UsersService.deleteApiUsers(userId)
```

## Application Features

### Home Page
- Overview of the demo application
- Quick links to Users and Products management
- Feature descriptions

### Users Management
- **List View**: See all users with complete details
- **Create**: Add new users with a comprehensive form
- **Edit**: Update existing user information
- **Delete**: Remove users with confirmation

### Products Management
- **List View**: Browse all products with pricing, stock, ratings
- **Create**: Add new products with detailed information
- **Edit**: Update product details, pricing, inventory
- **Delete**: Remove products with confirmation

## API Endpoints

### Users API
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Products API
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Benefits

1. **Type Safety**: Frontend types are always in sync with backend
2. **Autocomplete**: Full IDE support with intellisense for all operations
3. **Catch Errors Early**: TypeScript catches API mismatches at compile time
4. **Automatic Updates**: Regenerate types when API changes
5. **No Manual Typing**: Never write API types by hand again
6. **Documentation**: OpenAPI spec serves as API documentation
7. **Full CRUD**: Complete create, read, update, delete functionality
8. **Database Persistence**: All changes saved to SQLite database

## Workflow for API Changes

When you modify the backend API:

1. Update your .NET models or controllers
2. Restart the backend server
3. Run `npm run generate:api` in the frontend
4. TypeScript will show errors if frontend code needs updates
5. Fix any breaking changes
6. Commit both backend and frontend changes together

## Example: Adding a New Field

### Backend Change
```csharp
// Add a new field to User model
public class User
{
    // ... existing fields
    public string Department { get; set; }  // NEW
}
```

### Regenerate Types
```bash
cd frontend
npm run generate:api
```

### Frontend Usage
```typescript
// TypeScript now knows about the new field
console.log(user.department)  // ✅ Works immediately with autocomplete
```

## Technologies Used

### Backend
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQLite Database
- Swashbuckle.AspNetCore (Swagger/OpenAPI)

### Frontend
- React 19
- TypeScript
- React Router DOM
- Vite
- Axios
- @hey-api/openapi-ts

## Troubleshooting

### "Cannot find module './api'"
- Make sure you've run `npm run generate:api` first
- Ensure the backend is running when generating types

### CORS Errors
- Verify the backend is running on `http://localhost:5000`
- Check that CORS is properly configured in the backend

### Type Generation Fails
- Ensure the backend is running
- Check that Swagger is accessible at `http://localhost:5000/swagger`
- Verify the OpenAPI JSON is available at `http://localhost:5000/swagger/v1/swagger.json`

### Database Issues
- The SQLite database file (`blogpost.db`) is created automatically
- Delete the `.db` file and restart the backend to reset the database
- Check that Entity Framework Core packages are installed

## Project Configuration

### Environment Variables

Frontend (.env):
```
VITE_API_BASE_URL=http://localhost:5000
```

### Database Connection

Backend uses SQLite by default. Connection string in `Program.cs`:
```csharp
options.UseSqlite("Data Source=blogpost.db")
```

## Next Steps

- Add authentication and authorization
- Implement pagination for large datasets
- Add filtering and searching
- Create a shared types package for monorepo setups
- Add validation and error handling
- Implement file upload for product images
- Add real-time updates with SignalR

## License

MIT
# blogPost-openapi-sync-fullstack-dotnet-react
