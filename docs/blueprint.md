# **App Name**: Inertia Run Club Central

## Core Features:

- Admin Authentication: Secure admin login with JWT, bcrypt password hashing.
- Admin Dashboard: Interface for managing events, weekly updates, and images.
- Event Management: Create, edit, and delete running events (title, description, date, time, location, image).
- Weekly Updates: Post weekly running updates with optional image.
- Image Upload: Upload images to Cloudinary; URLs stored in MongoDB and dynamically appear on the frontend.
- REST API: API endpoints for events and updates management (POST, GET, PUT, DELETE).
- AI event scheduler tool: Uses an LLM to choose the optimal running schedule according to weather conditions.

## Style Guidelines:

- Primary color: Gold (#FFD700) for luxury and performance.
- Background color: Dark charcoal (#222222) to provide a sleek and modern base for content and interface elements.
- Accent color: Light gold (#B8860B) for interactive elements and subtle highlights.
- Body and headline font: 'Inter', a grotesque-style sans-serif, will be used for both headlines and body text, for a modern machined look. Note: currently only Google Fonts are supported.
- Minimalist line icons representing running, locations, and other related elements.
- Clean and modern layout with clear sections for content and events.
- Smooth transitions and loading animations to enhance user experience.