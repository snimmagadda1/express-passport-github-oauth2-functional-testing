# Express Passport GitHub OAuth2 Functional Testing Demo

This project demonstrates how to functionally test GitHub (or any) OAuth2 authentication in an Express.js application using Passport.js using a mocked passport authentication strategy. It serves as a reference implementation for testing routes that require authentication, without making HTTP requests to the authentication provider (in this case Github).

## Setup

- Express.js server
- [Delegated sign-in](https://web.archive.org/web/20160322014955/http://hueniverse.com/2009/04/16/introducing-sign-in-with-twitter-oauth-style-connect/) using passport-github2 for oauth2
- Session-based authentication
- Type-safe implementation
- Functional testing setup

## Prerequisites

- Bun runtime (v1.1.33 or later)
- GitHub OAuth Application credentials

## Setup

1. Clone the repository

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file in the root directory:
```env
NODE_ENV=development
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

4. Configure GitHub OAuth:
   - Go to GitHub Developer Settings
   - Create a new OAuth App
   - Set the callback URL to: `http://localhost:3000/auth/github/callback`
   - Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
├── middleware/
│   ├── is-auth.ts          # Authentication check middleware
│   ├── passport-github.ts   # GitHub strategy configuration
│   ├── passport-session.ts  # Session serialization/deserialization
│   └── session.ts          # Session middleware setup
├── models/
│   └── user.ts             # User interface definition
├── services/
│   └── userService.ts      # In-memory user management
├── index.ts                # Main application entry
└── package.json
```

## Running the Application

```bash
bun run index.ts
```

The server will start on `http://localhost:3000`

## Authentication Flow

1. User visits `/auth/github`
2. User is redirected to GitHub for authorization
3. After authorization, GitHub redirects back to `/auth/github/callback`
4. User information is stored/retrieved from store
5. Session is established
6. User is redirected to the home page

## Testing

TODO

The project includes functional tests to verify the authentication flow. Tests demonstrate:
- Session handling
- OAuth callback processing
- Protected route access
- User storage operations

Run tests with:
```bash
bun test
```

## License

MIT
