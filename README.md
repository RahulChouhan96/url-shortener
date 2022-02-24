# URL Shortener

## API Documentation

### POST /url/shorten
**Request Body** - `{ longUrl: "<URL>" }`
**Response** - The URL document

### GET /:code
**Request Params** - `code`
**Response** - Redirected to long URL