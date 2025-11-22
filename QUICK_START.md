# Quick Start Guide

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) installed
- [Node.js](https://nodejs.org/) (v18+) installed

## Setup in 3 Steps

### 1. Start the Backend (Terminal 1)

```bash
cd backend
dotnet run
```

Wait for:
```
Now listening on: http://localhost:5000
```

Verify Swagger is working:
- Open http://localhost:5000/swagger in your browser
- You should see the Swagger UI with Users and Products endpoints

### 2. Generate Types & Install Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run generate:api
```

You should see output like:
```
✔ Generated models/User.ts
✔ Generated models/Product.ts
✔ Generated services/UsersService.ts
✔ Generated services/ProductsService.ts
```

### 3. Run the Frontend

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

You should see:
- 2 Users displayed with all 15 fields
- 3 Products displayed with all 16 fields

## What Just Happened?

1. The .NET backend exposed an OpenAPI spec at http://localhost:5000/swagger/v1/swagger.json
2. `@hey-api/openapi-ts` read that spec and generated TypeScript types in `frontend/src/api/`
3. The React app imports those types and uses them for type-safe API calls

## Try It: Make a Change

### 1. Add a Field to the Backend

Edit `backend/Models/User.cs`:

```csharp
public class User
{
    // ... existing fields
    public string Department { get; set; } = string.Empty;  // ADD THIS
}
```

Update `backend/Controllers/UsersController.cs` to include the new field in sample data:

```csharp
new User
{
    // ... existing fields
    Department = "Engineering"  // ADD THIS
}
```

### 2. Restart the Backend

Stop the backend (Ctrl+C) and restart:

```bash
dotnet run
```

### 3. Regenerate Types

In the frontend terminal:

```bash
npm run generate:api
```

### 4. Check the Generated Types

Open `frontend/src/api/models/User.ts` - you'll see the new field:

```typescript
export type User = {
    // ... existing fields
    department: string;  // NEW!
}
```

### 5. Use the New Field

Edit `frontend/src/App.tsx` and add this line in the user card:

```typescript
<p><strong>Department:</strong> {user.department}</p>
```

Notice how TypeScript gives you autocomplete for `user.department`!

### 6. See It in Action

Refresh the browser - you'll see the department field displayed.

## Troubleshooting

### Backend won't start

**Error: "dotnet: command not found"**
- Install .NET SDK from https://dotnet.microsoft.com/download

**Error: Port 5000 already in use**
- Change the port in `backend/Properties/launchSettings.json`
- Update the frontend's `package.json` generate:api script to use the new port

### Frontend type generation fails

**Error: "Cannot fetch OpenAPI spec"**
- Make sure the backend is running
- Verify you can access http://localhost:5000/swagger/v1/swagger.json
- Check CORS settings in `backend/Program.cs`

**Error: "openapi: command not found"**
- Run `npm install` in the frontend directory
- The command should be available as an npm script

### CORS errors in browser

**Error: "Access to fetch at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS"**

This shouldn't happen with the provided code, but if it does:
- Check that `app.UseCors("AllowReactApp");` is in `backend/Program.cs`
- Verify the CORS policy includes your frontend URL
- Restart the backend after making changes

### Types not updating

- Make sure you restarted the backend after making changes
- Run `npm run generate:api` again after backend changes
- Check that the OpenAPI spec at http://localhost:5000/swagger/v1/swagger.json shows your changes

## Next Steps

- Explore the generated files in `frontend/src/api/`
- Try adding a new endpoint to the backend
- Experiment with different field types (arrays, nested objects, enums)
- Add error handling to the frontend
- Implement POST/PUT/DELETE operations

## Project Structure Reference

```
type-generation/
├── backend/
│   ├── Controllers/
│   │   ├── UsersController.cs      # Users API endpoint
│   │   └── ProductsController.cs   # Products API endpoint
│   ├── Models/
│   │   ├── User.cs                 # User model (15 fields)
│   │   └── Product.cs              # Product model (16 fields)
│   ├── Properties/
│   │   └── launchSettings.json     # Port configuration
│   ├── Program.cs                  # App entry point, Swagger setup
│   └── BlogPostApi.csproj          # .NET project file
│
└── frontend/
    ├── src/
    │   ├── api/                    # Generated API code (auto-generated)
    │   │   ├── index.ts
    │   │   ├── models/
    │   │   │   ├── User.ts
    │   │   │   └── Product.ts
    │   │   └── services/
    │   │       ├── UsersService.ts
    │   │       └── ProductsService.ts
    │   ├── App.tsx                 # Main component
    │   ├── App.css                 # Styles
    │   └── main.tsx                # React entry point
    ├── package.json                # npm scripts and dependencies
    └── vite.config.ts              # Vite configuration
```

## Commands Reference

### Backend

```bash
# Run the backend
cd backend
dotnet run

# Run with auto-reload on file changes
dotnet watch run

# Build for production
dotnet build
```

### Frontend

```bash
# Install dependencies
cd frontend
npm install

# Generate types from backend
npm run generate:api

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints

Once running, you can test these endpoints:

### Users
- GET http://localhost:5000/api/users - Get all users
- GET http://localhost:5000/api/users/1 - Get user by ID

### Products
- GET http://localhost:5000/api/products - Get all products
- GET http://localhost:5000/api/products/1 - Get product by ID

### OpenAPI
- http://localhost:5000/swagger - Interactive Swagger UI
- http://localhost:5000/swagger/v1/swagger.json - Raw OpenAPI JSON spec

## Tips

1. **Keep backend running**: The frontend needs the backend for API calls
2. **Regenerate after changes**: Always run `npm run generate:api` after backend changes
3. **Check TypeScript errors**: TypeScript will show errors if frontend code doesn't match new types
4. **Use IntelliSense**: Your IDE will autocomplete all available fields
5. **Commit generated files**: This allows other developers to run the frontend without generating types first

Happy coding!
