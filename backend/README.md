# JobMitra Backend

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# CORS
PRODUCTION_URL=your_production_frontend_url

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini API (for AI job description generation)
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and add it to your `.env` file

### 4. Run the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### API Endpoints

All endpoints are prefixed with `/api/v1/`

#### Authentication
- `POST /users/signup` - Register a new user
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user

#### Jobs
- `GET /jobs` - Get all jobs (with pagination and filters)
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create a new job (requires authentication)
- `POST /generate-job-description` - Generate job description using AI (requires authentication)
- `POST /apply/:id` - Apply for a job (requires authentication)
- `POST /save/:id` - Save a job (requires authentication)

#### Company
- `GET /company/listings` - Get company's job listings
- `GET /company/applications` - Get applications for company jobs
- `POST /company/shortlist-candidate` - Shortlist a candidate

## Notes

- The backend uses Google Gemini API for AI-powered job description generation
- Make sure MongoDB is running and accessible
- JWT tokens are used for authentication
- Cloudinary is used for handling file uploads
