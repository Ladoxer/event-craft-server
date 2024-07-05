# Event Craft Application

## Description
This is a simple event management application built using the nestjs stack.

## Setup Instructions

### Backend Setup

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Set up your MongoDB connection string in `src/app.module.ts`
5. Run the application: `npm run start`

### API Endpoints

- `GET /api/events` - Retrieve all events
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an existing event
- `DELETE /api/events/:id` - Delete an event
- `POST /api/events/:id/rsvp` - RSVP to an event
