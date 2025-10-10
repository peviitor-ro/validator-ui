# API Documentation

## Overview

This document describes the backend API endpoints used by the Validator-UI application. The API follows RESTful principles and uses JSON for request and response bodies.

## Base URL

The API base URL is configured via environment variable:

```
VITE_BASE_URL=https://api.example.com
```

## Authentication

### Authentication Flow

The API uses JWT (JSON Web Token) based authentication.

1. User logs in with credentials
2. Server returns an access token
3. Token is stored in localStorage
4. Token is included in subsequent requests via `Authorization` header

### Token Format

```
Authorization: Bearer <access_token>
```

### Token Management

- **Storage**: localStorage with key `validator`
- **Auto-injection**: Axios interceptor automatically adds token to requests
- **Expiration**: Tokens expire after a set period (configured server-side)
- **Refresh**: Token refresh mechanism (if implemented)

## API Instances

### Public API

Used for unauthenticated requests:
- Login
- Email confirmation
- Public data access

### Private API

Used for authenticated requests:
- Automatically includes JWT token
- Protected endpoints requiring authentication

## Endpoints

### Authentication

#### Login

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and receive access token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin"
  }
}
```

**Status Codes**:
- `200 OK`: Successful authentication
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Invalid request format

#### Authorize

**Endpoint**: `GET /auth/authorize`

**Description**: Validate authentication token and get user info

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin"
  },
  "isAuthenticated": true
}
```

**Status Codes**:
- `200 OK`: Valid token
- `401 Unauthorized`: Invalid or expired token

#### Email Confirmation

**Endpoint**: `POST /auth/confirm-email`

**Description**: Confirm user email address

**Request Body**:
```json
{
  "token": "email_confirmation_token"
}
```

**Response**:
```json
{
  "message": "Email confirmed successfully",
  "success": true
}
```

### Companies

#### Get Companies

**Endpoint**: `GET /companies/`

**Description**: Retrieve list of companies

**Query Parameters**:
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page
- `search` (optional): Search term

**Response**:
```json
{
  "companies": [
    {
      "id": "company1",
      "name": "Tech Corp",
      "logo": "https://example.com/logo.png",
      "jobCount": 42,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "hasMore": true
  }
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated

#### Add Company

**Endpoint**: `POST /companies/add/`

**Description**: Create a new company

**Request Body**:
```json
{
  "name": "New Tech Company",
  "logo": "https://example.com/logo.png",
  "website": "https://newtech.com",
  "description": "A technology company"
}
```

**Response**:
```json
{
  "company": {
    "id": "company123",
    "name": "New Tech Company",
    "logo": "https://example.com/logo.png",
    "website": "https://newtech.com",
    "description": "A technology company",
    "createdAt": "2024-01-20T00:00:00Z"
  },
  "message": "Company created successfully"
}
```

**Status Codes**:
- `201 Created`: Company created successfully
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `409 Conflict`: Company already exists

#### Update Company

**Endpoint**: `PUT /companies/update/{companyId}`

**Description**: Update an existing company

**Request Body**:
```json
{
  "name": "Updated Company Name",
  "logo": "https://example.com/new-logo.png",
  "website": "https://updated-site.com"
}
```

**Response**:
```json
{
  "company": {
    "id": "company123",
    "name": "Updated Company Name",
    "logo": "https://example.com/new-logo.png",
    "updatedAt": "2024-01-21T00:00:00Z"
  },
  "message": "Company updated successfully"
}
```

**Status Codes**:
- `200 OK`: Update successful
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Company not found

#### Delete Company

**Endpoint**: `DELETE /companies/delete/{companyId}`

**Description**: Delete a company

**Response**:
```json
{
  "message": "Company deleted successfully",
  "success": true
}
```

**Status Codes**:
- `200 OK`: Deletion successful
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Company not found

#### Clear Company Data

**Endpoint**: `POST /companies/clear/{companyId}`

**Description**: Clear all data associated with a company

**Response**:
```json
{
  "message": "Company data cleared successfully",
  "success": true
}
```

### Jobs

#### Get Jobs

**Endpoint**: `GET /jobs/get/{companyId}`

**Description**: Retrieve jobs for a specific company

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status (draft, published, etc.)

**Response**:
```json
{
  "jobs": [
    {
      "id": "job123",
      "title": "Senior React Developer",
      "company": "Tech Corp",
      "location": "Remote",
      "city": "Bucharest",
      "county": "Bucuresti",
      "country": "Romania",
      "remote": true,
      "description": "Looking for an experienced React developer...",
      "requirements": ["5+ years experience", "React expertise"],
      "url": "https://jobs.example.com/job123",
      "posted": "2024-01-15T00:00:00Z",
      "edited": "2024-01-20T00:00:00Z",
      "published": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50
  }
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Company not found

#### Sync Jobs

**Endpoint**: `POST /jobs/sync/`

**Description**: Sync jobs from scraper

**Request Body**:
```json
{
  "companyId": "company123",
  "scraperName": "scraper-name"
}
```

**Response**:
```json
{
  "message": "Jobs synced successfully",
  "synced": 15,
  "updated": 5,
  "new": 10
}
```

**Status Codes**:
- `200 OK`: Sync successful
- `401 Unauthorized`: Not authenticated

#### Delete Job

**Endpoint**: `DELETE /jobs/delete/{jobId}`

**Description**: Delete a specific job

**Response**:
```json
{
  "message": "Job deleted successfully",
  "success": true
}
```

**Status Codes**:
- `200 OK`: Deletion successful
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Job not found

#### Publish Job

**Endpoint**: `POST /jobs/publish/{jobId}`

**Description**: Publish a job (make it public)

**Response**:
```json
{
  "message": "Job published successfully",
  "job": {
    "id": "job123",
    "published": true,
    "publishedAt": "2024-01-20T00:00:00Z"
  }
}
```

**Status Codes**:
- `200 OK`: Published successfully
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Job not found

#### Edit Job

**Endpoint**: `PUT /jobs/edit/{jobId}`

**Description**: Update job details

**Request Body**:
```json
{
  "title": "Updated Job Title",
  "description": "Updated description",
  "location": "Bucharest",
  "remote": true
}
```

**Response**:
```json
{
  "message": "Job updated successfully",
  "job": {
    "id": "job123",
    "title": "Updated Job Title",
    "updatedAt": "2024-01-20T00:00:00Z"
  }
}
```

**Status Codes**:
- `200 OK`: Update successful
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Job not found

### Cities

#### Get Cities

**Endpoint**: `GET /orase/`

**Description**: Get list of Romanian cities

**Query Parameters**:
- `search` (optional): Search term for filtering cities

**Response**:
```json
{
  "cities": [
    {
      "id": "city1",
      "name": "Bucuresti",
      "county": "Bucuresti",
      "population": 1883425
    },
    {
      "id": "city2",
      "name": "Cluj-Napoca",
      "county": "Cluj",
      "population": 324576
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Success

### Scraper

#### Get Scrapers

**Endpoint**: `GET /scraper/`

**Description**: Get list of scraper configurations

**Response**:
```json
{
  "scrapers": [
    {
      "name": "tech-corp-scraper",
      "company": "Tech Corp",
      "type": "python",
      "status": "active",
      "lastRun": "2024-01-20T00:00:00Z",
      "files": [
        {
          "name": "main.py",
          "path": "scrapers/tech-corp/main.py",
          "type": "python"
        }
      ]
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated

#### Get Scraper Files

**Endpoint**: `GET /scraper/{scraperName}`

**Description**: Get files for a specific scraper

**Response**:
```json
{
  "endpoint": "/scraper/tech-corp-scraper/run",
  "files": [
    {
      "name": "main.py",
      "path": "scrapers/tech-corp/main.py",
      "type": "python",
      "size": 2048,
      "lastModified": "2024-01-20T00:00:00Z"
    },
    {
      "name": "config.json",
      "path": "scrapers/tech-corp/config.json",
      "type": "json",
      "size": 512
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Scraper not found

#### Add Scraper

**Endpoint**: `POST /scraper/add/`

**Description**: Create a new scraper configuration

**Request Body**:
```json
{
  "name": "new-scraper",
  "company": "New Company",
  "type": "python",
  "files": [
    {
      "name": "main.py",
      "content": "# Python scraper code"
    }
  ]
}
```

**Response**:
```json
{
  "message": "Scraper created successfully",
  "scraper": {
    "name": "new-scraper",
    "company": "New Company",
    "type": "python",
    "createdAt": "2024-01-20T00:00:00Z"
  }
}
```

**Status Codes**:
- `201 Created`: Scraper created successfully
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `409 Conflict`: Scraper already exists

#### Update Scraper

**Endpoint**: `PUT /scraper/{scraperName}`

**Description**: Update scraper configuration

**Request Body**:
```json
{
  "files": [
    {
      "name": "main.py",
      "content": "# Updated Python code"
    }
  ]
}
```

**Response**:
```json
{
  "message": "Scraper updated successfully",
  "success": true
}
```

**Status Codes**:
- `200 OK`: Update successful
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Scraper not found

#### Delete Scraper

**Endpoint**: `DELETE /scraper/remove/{scraperName}`

**Description**: Delete a scraper configuration

**Response**:
```json
{
  "message": "Scraper deleted successfully",
  "success": true
}
```

**Status Codes**:
- `200 OK`: Deletion successful
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Scraper not found

#### Run Scraper File

**Endpoint**: `POST /scraper/{scraperName}/run`

**Description**: Execute a scraper file

**Request Body**:
```json
{
  "file": "main.py"
}
```

**Response**:
```json
{
  "message": "Scraper executed successfully",
  "output": "Scraper output logs...",
  "jobsFound": 15,
  "executionTime": 5.2
}
```

**Status Codes**:
- `200 OK`: Execution successful
- `400 Bad Request`: Invalid file
- `401 Unauthorized`: Not authenticated
- `500 Internal Server Error`: Execution failed

### User

#### Get User Info

**Endpoint**: `GET /user/`

**Description**: Get current user information

**Response**:
```json
{
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00Z",
    "companies": ["company1", "company2"]
  }
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated

#### Get User Companies

**Endpoint**: `GET /user/companies`

**Description**: Get companies associated with the user

**Response**:
```json
{
  "companies": [
    {
      "id": "company1",
      "name": "Tech Corp",
      "role": "admin",
      "permissions": ["read", "write", "delete"]
    }
  ]
}
```

**Status Codes**:
- `200 OK`: Success
- `401 Unauthorized`: Not authenticated

#### Add User

**Endpoint**: `POST /user/add`

**Description**: Create a new user (admin only)

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "name": "Jane Smith",
  "role": "user",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user456",
    "email": "newuser@example.com",
    "name": "Jane Smith",
    "role": "user"
  }
}
```

**Status Codes**:
- `201 Created`: User created successfully
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Insufficient permissions
- `409 Conflict`: User already exists

#### Edit User

**Endpoint**: `PUT /user/edit/{userId}`

**Description**: Update user information

**Request Body**:
```json
{
  "name": "Updated Name",
  "role": "admin"
}
```

**Response**:
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "user456",
    "email": "newuser@example.com",
    "name": "Updated Name",
    "role": "admin"
  }
}
```

**Status Codes**:
- `200 OK`: Update successful
- `400 Bad Request`: Invalid data
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: User not found

#### Delete User

**Endpoint**: `DELETE /user/delete/{userId}`

**Description**: Delete a user (admin only)

**Response**:
```json
{
  "message": "User deleted successfully",
  "success": true
}
```

**Status Codes**:
- `200 OK`: Deletion successful
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: User not found

## Data Contracts

### Common Types

#### User Object
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string; // ISO 8601 date
  updatedAt?: string;
}
```

#### Company Object
```typescript
{
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  jobCount: number;
  createdAt: string;
  updatedAt: string;
}
```

#### Job Object
```typescript
{
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  city: string;
  county?: string;
  country: string;
  remote: boolean;
  description: string;
  requirements?: string[];
  url: string;
  posted: string; // ISO 8601 date
  edited?: string;
  published: boolean;
  publishedAt?: string;
}
```

#### Scraper Object
```typescript
{
  name: string;
  company: string;
  type: 'python' | 'javascript' | 'jmeter';
  status: 'active' | 'inactive' | 'error';
  lastRun?: string; // ISO 8601 date
  files: ScraperFile[];
}
```

#### ScraperFile Object
```typescript
{
  name: string;
  path: string;
  type: string;
  size?: number;
  lastModified?: string;
}
```

#### Pagination Object
```typescript
{
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
```

## Error Responses

### Standard Error Format

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or token invalid
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Request data validation failed
- `CONFLICT`: Resource already exists
- `SERVER_ERROR`: Internal server error

### Example Error Responses

#### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication token is invalid or expired"
  }
}
```

#### 400 Bad Request
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Company with id 'company123' not found"
  }
}
```

## Rate Limiting

- **Rate Limit**: 100 requests per minute per IP
- **Headers**:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

When rate limit is exceeded:
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 60
  }
}
```

## Best Practices

1. **Always check response status codes** before processing data
2. **Handle errors gracefully** with user-friendly messages
3. **Implement retry logic** for transient failures
4. **Cache responses** where appropriate using TanStack Query
5. **Use appropriate HTTP methods** (GET, POST, PUT, DELETE)
6. **Include proper headers** (Content-Type, Authorization)
7. **Validate data** before sending to API
8. **Log API errors** for debugging

## API Client Implementation

### Using TanStack Query

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import { PRIVATE_API } from './Api';

// GET request
export function useCompaniesQuery() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await PRIVATE_API.get('/companies/');
      return response.data;
    },
  });
}

// POST request
export function useAddCompanyMutation() {
  return useMutation({
    mutationFn: async (companyData) => {
      const response = await PRIVATE_API.post('/companies/add/', companyData);
      return response.data;
    },
  });
}
```

## Changelog

### Version 1.0.0 (Current)
- Initial API documentation
- All core endpoints documented
- Authentication flow defined

## Support

For API issues or questions:
- Open an issue in the GitHub repository
- Contact the backend team
- Check server status page

## Related Documentation

- [Architecture Guide](architecture.md)
- [Component Guidelines](components-guidelines.md)
- [Contributing Guide](contributing.md)
