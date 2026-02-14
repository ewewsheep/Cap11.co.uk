# Cap11 Website

## Overview
A Node.js/Express web application serving static HTML pages with a backend API. Uses SQLite for click tracking and a JSON file (`Data.Json`) for user data management.

## Project Architecture
- **backend.js** - Express server, serves static files from `public/` and provides API endpoints
- **public/** - Static frontend HTML pages (Home, Login, Settings, game pages)
- **Data.Json** - JSON-based user data store
- **cap11click** - SQLite database file (auto-created)

## Key Endpoints
- `GET /Data.json` - Returns all rows from SQLite `backtest` table
- `GET /NBUTT` - Increments click counter in SQLite
- `GET /NAME`, `/PASS`, `/PFP` - Update user data in Data.Json

## Setup
- Runtime: Node.js 20
- Dependencies: express, cors, sqlite3
- Port: 5000 (bound to 0.0.0.0)

## Recent Changes
- 2026-02-14: Initial Replit import setup, configured port 5000
