# Brick Lister - LEGO Parts Management System

## Overview

Brick Lister is a comprehensive web application for managing and displaying LEGO sets and their components. The platform offers an intuitive interface to browse LEGO collections, view detailed parts inventories, export data in multiple formats, and communicate via an integrated contact system.

## Key Features

### User Interface
- **Interactive Home Page**: Welcoming introduction to the platform
- **Sets Catalog**: Visual gallery of available LEGO sets with direct access to parts lists
- **Parts Management**: Detailed view of set components with:
  - CSV export functionality
  - PDF report generation
  - Parts valuation calculator

### Help Center
- **FAQ Section**: Answers to common questions loaded from JSON
- **Contact System**: Split-screen interface with:
  - Configurable layout (horizontal/vertical)
  - Form submission for inquiries

### Backend Services
- Node.js/Express server
- MySQL database integration
- REST API endpoint (`/api/messages`) for message handling

## Technical Architecture

```
brick-lister/
├── server/                 # Backend services
│   ├── index.js            # Server configuration
│   ├── .env                # Environment configuration
│   └── package.json        # Backend dependencies
├── src/                    # Frontend application
│   ├── assets/             # Static resources
│   ├── components/         # UI components
│   ├── pages/              # Application views
│   └── media/              # Data resources
├── .gitignore              
└── package.json           
```

## System Requirements

- **Node.js**: v20.17.0+
- **npm**: v10.8.3+
- **MySQL Server**: 8.0+

## Installation Guide

### 1. Repository Setup
```bash
git clone <repository-url>
cd brick-lister
```

### 2. Backend Configuration

**Environment Configuration (file server/.env):**
```env
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=secure_password
DB_NAME=your_db_name
DB_PORT=3306
```

```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd ..
npm install
```

## Launching the Application

**Backend Server:**
```bash
cd server
node index.js
```
*Running on: http://localhost:3307*

**Frontend Development Server:**
```bash
npm run dev
```
*Accessible at: http://localhost:5173*

## User Guide

### Form Submission
1. Navigate to Help section
2. Complete contact form fields
3. Submit using "Wyslij" button

### Data Export
1. Select desired LEGO set
2. Choose export format:
   - CSV ("Pobierz CSV")
   - PDF ("Generuj PDF")

## Troubleshooting

**Common Issues:**
- MySQL connection failures: Verify credentials and permissions
- CORS errors: Ensure backend allows frontend origin
- Form submission problems: Check server logs and database permissions

## Roadmap

### Planned Enhancements
- Enhanced PDF reports with images
- Dynamic split-screen ratio adjustment
- User authentication system
- Cloud deployment configuration

## Technology Stack

**Frontend:**
- React 18
- Vite 5
- React Router 6
- Data export libraries (CSV/PDF)

**Backend:**
- Node.js 20
- Express 5
- MySQL2 client

**Database:**
- MySQL 8