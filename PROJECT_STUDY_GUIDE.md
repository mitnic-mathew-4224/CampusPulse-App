# CEG CAMPUSPULSE - PROJECT STUDY GUIDE
## Complete Code Structure & Understanding for Review

---

## 📁 PROJECT STRUCTURE OVERVIEW

```
project_final/
├── components/          # React UI components
├── services/           # Business logic & API integrations
├── data/              # Static data files
├── utils/             # Helper utilities
├── public/            # Static assets (images)
├── App.tsx            # Main application component
├── types.ts           # TypeScript type definitions
├── index.tsx          # Application entry point
└── vite.config.ts     # Build configuration
```

---

## 🎯 CORE FILES EXPLANATION

### **1. App.tsx** (Main Application - 400+ lines)
**Location:** `/project_final/App.tsx`

**What it does:**
- Main component that controls the entire application
- Manages all user interactions and navigation flow

**Key State Variables:**
```typescript
userLocation        // Current GPS coordinates (lat, lng)
targetPOI          // Selected destination
isArrived          // Whether user reached destination (within 10m)
showPOIInfo        // Show/hide POI details panel
showAssistant      // Show/hide chatbot
activeLanguage     // English/Tamil/Hindi
isSimulation       // GPS mode vs Simulation mode
searchQuery        // Search input text
```

**Key Functions:**
- `toggleSimulation()` - Switch between GPS and simulation mode
- `handleManualMove(direction)` - Move user in N/S/E/W direction (simulation)
- `useEffect()` for arrival detection - Checks distance every location update
- `useEffect()` for GPS tracking - Manages real GPS with watchPosition

**UI Sections:**
1. Header - Title, language selector, GPS/simulation toggle
2. Search Panel - POI list with search (shows 3 by default, all when typing)
3. Map View - Leaflet map with user marker and route
4. POI Info Panel - Details when arrived at destination
5. Footer - Home, Info, Chat buttons
6. Chatbot Modal - AI assistant overlay

---

### **2. types.ts** (Type Definitions - 50 lines)
**Location:** `/project_final/types.ts`

**What it does:**
- Defines TypeScript interfaces for type safety

**Key Types:**
```typescript
GeoLocation {
  latitude: number
  longitude: number
}

POI {
  id: string                    // 'dept-ist', 'central-library'
  name: string                  // Display name
  category: string              // Academic/Administrative/Facility
  description: string           // Short description
  longDescription: string       // Audio narration text
  academicDetails: object       // Working hours, services, etc.
  facilities: string[]          // List of facilities
  location: GeoLocation         // GPS coordinates
  imageUrl: string              // Image path
  languageSupport: string[]     // ['English', 'Tamil', 'Hindi']
}

Language enum {
  ENGLISH = 'English'
  TAMIL = 'Tamil'
  HINDI = 'Hindi'
}
```

---

### **3. data/campusPOIs.ts** (POI Database - 270 lines)
**Location:** `/project_final/data/campusPOIs.ts`

**What it does:**
- Contains all 22 campus locations with complete details
- Acts as fallback when database is unavailable

**Structure:**
```typescript
export const CAMPUS_POIS: POI[] = [
  {
    id: 'dept-ist',
    name: 'Department of Information Science and Technology',
    academicDetails: {
      working_hours: "8:30 AM - 4:30 PM",
      building_info: { total_floors: 4, ... }
    },
    location: { latitude: 13.012957, longitude: 80.235861 }
  },
  // ... 21 more POIs
]
```

**All 22 POIs:**
1. IST Department
2. Vivekananda Auditorium
3. Knowledge Park
4. Central Library
5. RCC (Ramanujan Computing Centre)
6. Sports Board
7. Tennis Court
8. CEG Square
9. YRC Control Room
10. SC/ST Cell
11. Department of Mathematics
12. College Society
13. Swimming Pool
14. Centre for Academic Courses
15. Additional Controller of Examinations
16. Estate Office
17. Centre for Affiliation of Institutions
18. High Voltage Laboratory
19. Department of Applied Chemistry
20. Department of MBA
21. Alumni Association
22. Anna University GYM

---

## 🔧 SERVICE FILES (Business Logic)

### **4. services/locationService.ts** (GPS Calculations - 40 lines)
**Location:** `/project_final/services/locationService.ts`

**What it does:**
- Calculates distance and direction between two GPS points

**Key Functions:**

**calculateDistance(pos1, pos2):**
- Uses Haversine formula
- Returns distance in meters
- Formula: Uses Earth radius (6,371 km) and trigonometry
- Used for: Arrival detection (checks if distance ≤ 10m)

**calculateBearing(pos1, pos2):**
- Calculates compass direction (0-360 degrees)
- Returns bearing angle
- Used for: Showing direction to destination

---

### **5. services/geminiService.ts** (AI & Audio - 180 lines)
**Location:** `/project_final/services/geminiService.ts`

**What it does:**
- Handles AI chatbot and text-to-speech

**Key Functions:**

**playNarration(text, language):**
- Translates text to Tamil/Hindi using Gemini AI (if not English)
- Uses Web Speech API to speak the text
- Automatically triggered when user arrives at destination
- Language codes: en-US, ta-IN, hi-IN

**playNarrationWithFeedback(text, language):**
- Same as playNarration but with user alerts
- Used for manual "Listen" button

**getAssistantResponse(query, currentPOI, language):**
- Sends user question to Google Gemini AI
- Includes POI context in system instruction
- For IST: Includes 4-floor LEFT/RIGHT navigation details
- For others: Only basic POI information
- Returns AI response in selected language

**IST Navigation Data (Hardcoded):**
- Ground Floor: LEFT (Auditorium, HOD cabin) / RIGHT (Labs, Library)
- 1st Floor: LEFT (Office Room, HOD Office) / RIGHT (Knuth Lab)
- 2nd Floor: LEFT (Lecture Halls) / RIGHT (Liskov Lab)
- 3rd Floor: LEFT (IoT Lab) / RIGHT (Von Neumann Lab)

---

### **6. services/supabase.ts** (Database Client - 10 lines)
**Location:** `/project_final/services/supabase.ts`

**What it does:**
- Creates Supabase database connection for browser

**Configuration:**
```typescript
URL: https://sdjniixvkikhavikltqh.supabase.co
Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note:** Uses `import.meta.env` for browser (Vite environment variables)

---

### **7. services/realDatabaseService.ts** (Database Operations - 120 lines)
**Location:** `/project_final/services/realDatabaseService.ts`

**What it does:**
- CRUD operations for Supabase database

**Key Functions:**

**getAllPOIs():**
- Fetches all POIs from 'locations' table
- Orders by name alphabetically
- Transforms database format to POI TypeScript interface
- Returns: POI[]

**getPOIById(id):**
- Fetches single POI by ID
- Returns: POI or null

**insertMultiplePOIs(pois):**
- Batch inserts/updates POIs
- Uses upsert (insert or update if exists)
- Used by sync scripts

---

### **8. usePOIs.ts** (Custom React Hook - 40 lines)
**Location:** `/project_final/usePOIs.ts`

**What it does:**
- Fetches POI data with fallback mechanism

**Logic Flow:**
1. Initialize with local CAMPUS_POIS (instant load)
2. Try to fetch from Supabase database
3. If success: Use database data, set usingDatabase=true
4. If fail: Keep local data, set error message
5. Return: { pois, loading, error, usingDatabase }

**Result:** Zero downtime - app always works even if database is down

---

## 🎨 COMPONENT FILES

### **9. components/NavigationMap.tsx** (Map Component - 180 lines)
**Location:** `/project_final/components/NavigationMap.tsx`

**What it does:**
- Renders interactive Leaflet map
- Shows user location, destination, and route

**Key Functions:**

**fetchRoute(start, end):**
- Calls Mapbox Directions API
- Gets walking route coordinates
- Converts [lon, lat] to [lat, lon] for Leaflet
- Fallback: Straight line if API fails

**useEffect() for map initialization:**
- Creates Leaflet map (zoom level 17)
- Adds OpenStreetMap tiles
- Creates blue pulse marker for user

**useEffect() for map updates:**
- Updates user marker position
- Draws route polyline (indigo color)
- Auto-fits map bounds to show full route

**Map Configuration:**
- Tiles: OpenStreetMap
- User marker: Blue circle with pulse animation
- Route: Indigo line (5px width, 0.8 opacity)
- Auto-fit: 80px padding around route

---

### **10. components/Assistant.tsx** (Chatbot UI - 130 lines)
**Location:** `/project_final/components/Assistant.tsx`

**What it does:**
- Chatbot interface with message history

**Key Functions:**

**getGreeting():**
- Returns welcome message in selected language
- English: "Hello! I'm your guide for..."
- Tamil: "வணக்கம்! நான் உங்கள் வழிகாட்டி..."
- Hindi: "नमस्ते! मैं आपका मार्गदर्शक हूं..."

**handleSend():**
- Validates input not empty
- Adds user message to chat
- Calls getAssistantResponse()
- Adds AI response to chat
- Handles errors gracefully

**useEffect() for auto-scroll:**
- Scrolls chat to bottom when new message added

**UI Features:**
- Gradient header (indigo to purple)
- User messages: Right side, gradient background
- AI messages: Left side, white background with markdown
- Loading: Animated dots
- Input: Bottom with send button

---

### **11. utils/markdownRenderer.tsx** (Markdown Parser - 30 lines)
**Location:** `/project_final/utils/markdownRenderer.tsx`

**What it does:**
- Converts markdown text to formatted HTML
- Used for AI chatbot responses

**Supports:**
- Bold: **text**
- Italic: *text*
- Lists: - item
- Line breaks

---

## ⚙️ CONFIGURATION FILES

### **12. vite.config.ts** (Build Config - 25 lines)
**Location:** `/project_final/vite.config.ts`

**What it does:**
- Configures Vite build tool
- Exposes environment variables to browser

**Configuration:**
```typescript
server: { port: 3000, host: '0.0.0.0' }
define: {
  'process.env.GEMINI_API_KEY': from .env.local
  'process.env.SUPABASE_URL': from .env.local
  'process.env.SUPABASE_ANON_KEY': from .env.local
}
```

---

### **13. .env.local** (Environment Variables)
**Location:** `/project_final/.env.local`

**Contains:**
```
GEMINI_API_KEY=AIzaSyBo8ihuEQ8yv5RNE96U7UrYIF4bon44msA
SUPABASE_URL=https://sdjniixvkikhavikltqh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_URL=https://sdjniixvkikhavikltqh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_MAPBOX_TOKEN=pk.eyJ1IjoibWl0bmljLW1hdGhldy00MjI0...
```

**Note:** VITE_ prefix needed for browser access

---

## 🔄 DATA FLOW DIAGRAMS

### **User Journey Flow:**
```
1. App Loads
   ↓
2. usePOIs() fetches data (Database → Fallback to local)
   ↓
3. User sees 3 suggested POIs
   ↓
4. User types in search → Shows all matching POIs
   ↓
5. User selects destination
   ↓
6. Map shows route (Mapbox API → Fallback to straight line)
   ↓
7. GPS tracks user location (watchPosition)
   ↓
8. Distance calculated every update (Haversine)
   ↓
9. If distance ≤ 10m → Arrival detected
   ↓
10. Auto-play audio narration (Gemini translates → Web Speech speaks)
    ↓
11. Show POI details panel
    ↓
12. User can click "Ask Assistant"
    ↓
13. Chatbot opens (Gemini AI responds in selected language)
```

### **GPS Tracking Flow:**
```
isSimulation = false
   ↓
navigator.geolocation.getCurrentPosition() → Get initial position
   ↓
navigator.geolocation.watchPosition() → Continuous updates
   ↓
Update userLocation state
   ↓
Map updates user marker
   ↓
Calculate distance to target
   ↓
Check if arrived (distance ≤ 10m)
```

### **Chatbot Flow:**
```
User types question
   ↓
handleSend() validates input
   ↓
Add user message to chat
   ↓
getAssistantResponse(query, currentPOI, language)
   ↓
Build system instruction with POI context
   ↓
Add language requirement (Tamil/Hindi/English)
   ↓
Send to Gemini AI API
   ↓
Receive response
   ↓
Add AI message to chat
   ↓
Auto-scroll to bottom
```

---

## 🗄️ DATABASE SCHEMA

### **Supabase Table: locations**

**Columns:**
```sql
id                  TEXT PRIMARY KEY
name                TEXT NOT NULL
category            TEXT NOT NULL
short_description   TEXT NOT NULL
long_description    TEXT NOT NULL
specific_details    JSONB
latitude            REAL NOT NULL
longitude           REAL NOT NULL
primary_image_url   TEXT NOT NULL
language_support    TEXT[]
created_at          TIMESTAMP DEFAULT NOW()
```

**Example Row:**
```json
{
  "id": "dept-ist",
  "name": "Department of Information Science and Technology",
  "category": "Academic",
  "short_description": "IST Department - Home to MCA, B.Tech IT...",
  "long_description": "Welcome to the Department...",
  "specific_details": {
    "working_hours": "8:30 AM - 4:30 PM",
    "building_info": { "total_floors": 4, ... }
  },
  "latitude": 13.012957716848089,
  "longitude": 80.23586126109605,
  "primary_image_url": "/images/dept-ist.jpg",
  "language_support": ["English", "Tamil", "Hindi"]
}
```

---

## 🔑 KEY ALGORITHMS

### **1. Haversine Distance Formula**
```
Purpose: Calculate distance between two GPS points

Steps:
1. Convert degrees to radians
2. Δφ = φ2 - φ1 (latitude difference)
3. Δλ = λ2 - λ1 (longitude difference)
4. a = sin²(Δφ/2) + cos(φ1)·cos(φ2)·sin²(Δλ/2)
5. c = 2·atan2(√a, √(1-a))
6. distance = R × c (R = 6,371,000 meters)

Accuracy: ±0.5% for distances up to 1000km
```

### **2. Arrival Detection**
```
Threshold: 10 meters

Logic:
IF distance ≤ 10m AND NOT arrived:
  → Set isArrived = true
  → Show POI info panel
  → Play audio narration
  
IF distance > 10m AND arrived:
  → Set isArrived = false
  → Hide POI info panel

Hysteresis: Prevents flickering near boundary
```

### **3. Search Filtering**
```
Input: searchQuery string

Algorithm:
1. Convert query to lowercase
2. Filter POIs where:
   - name.includes(query) OR
   - description.includes(query) OR
   - category.includes(query)
3. If query empty: Show first 3 POIs
4. If query has text: Show all matching POIs

Time Complexity: O(n) where n = 22 POIs
```

---

## 🌐 EXTERNAL APIs USED

### **1. Geolocation API (Browser Native)**
- **Purpose:** Real-time GPS tracking
- **Methods:** getCurrentPosition(), watchPosition()
- **Accuracy:** enableHighAccuracy=true
- **Requirement:** HTTPS or localhost

### **2. Mapbox Directions API**
- **Purpose:** Walking route calculation
- **Endpoint:** https://api.mapbox.com/directions/v5/mapbox/walking/
- **Quota:** 100,000 free requests/month
- **Response:** GeoJSON with coordinates

### **3. Google Gemini AI API**
- **Purpose:** Chatbot and text translation
- **Model:** gemini-3-flash-preview
- **Temperature:** 0.7 (balanced creativity)
- **Features:** Context-aware, multilingual

### **4. Web Speech API (Browser Native)**
- **Purpose:** Text-to-speech narration
- **Languages:** en-US, ta-IN, hi-IN
- **Parameters:** rate=0.9, pitch=1.0, volume=1.0
- **Cost:** Free

### **5. Supabase PostgreSQL**
- **Purpose:** Cloud database for POI data
- **Features:** REST API, real-time subscriptions
- **Quota:** 500MB free tier

---

## 🎯 KEY FEATURES IMPLEMENTATION

### **Feature 1: Multilingual Support**
**How it works:**
1. User selects language from dropdown
2. Language stored in `activeLanguage` state
3. Audio narration: Gemini translates → Web Speech speaks
4. Chatbot: System instruction includes language requirement
5. Greeting message changes based on language

### **Feature 2: GPS vs Simulation Mode**
**GPS Mode:**
- Uses navigator.geolocation.watchPosition()
- Requires HTTPS or localhost
- Real-time location updates
- Error handling with fallback to simulation

**Simulation Mode:**
- Default location: CEG campus center
- Manual controls: N/S/E/W buttons
- Each move: 0.0001 degrees (~11 meters)
- Used for testing and demo

### **Feature 3: Arrival Detection**
**Implementation:**
1. useEffect monitors userLocation and targetPOI
2. Calculates distance using Haversine
3. Compares with PROXIMITY_THRESHOLD (10m)
4. Triggers arrival actions:
   - Set isArrived = true
   - Show POI info panel
   - Auto-play audio narration
5. Hysteresis prevents flickering

### **Feature 4: Context-Aware Chatbot**
**Implementation:**
1. System instruction includes current POI details
2. For IST: Adds 4-floor navigation data
3. For others: Only basic information
4. Rules prevent cross-location information
5. Language requirement added to prompt

### **Feature 5: Hybrid Data Architecture**
**Implementation:**
1. App starts with local CAMPUS_POIS (instant)
2. usePOIs() tries database fetch in background
3. If success: Switch to database data
4. If fail: Keep local data
5. Result: Zero downtime, always works

---

## 🚀 HOW TO RUN THE PROJECT

### **Development Mode:**
```bash
npm run dev
```
- Starts Vite dev server on port 3000
- Hot reload enabled
- Access: http://localhost:3000

### **Build for Production:**
```bash
npm run build
```
- Creates optimized production build
- Output: dist/ folder
- Minified and tree-shaken

### **Sync POIs to Database:**
```bash
npm run sync-pois
```
- Uploads all 22 POIs to Supabase
- Uses syncPOIs.ts script

---

## 📊 PROJECT STATISTICS

- **Total Files:** 25+ files
- **Total Lines of Code:** ~2,500 lines
- **Components:** 3 (App, NavigationMap, Assistant)
- **Services:** 5 (location, gemini, supabase, database, routing)
- **POIs in Database:** 22 locations
- **Languages Supported:** 3 (English, Tamil, Hindi)
- **External APIs:** 5 (Geolocation, Mapbox, Gemini, Web Speech, Supabase)

---

## 🎓 REVIEW PREPARATION TIPS

### **Be Ready to Explain:**

1. **Architecture:** Client-side React app with hybrid data layer
2. **GPS:** Haversine formula, watchPosition, arrival detection
3. **AI:** Gemini API for chatbot and translation
4. **Database:** Supabase PostgreSQL with fallback to local data
5. **Multilingual:** Web Speech API + Gemini translation
6. **Map:** Leaflet + Mapbox for routing
7. **State Management:** React hooks (useState, useEffect, useRef)
8. **Error Handling:** Graceful degradation at every integration point

### **Common Questions & Answers:**

**Q: How does GPS tracking work?**
A: Uses browser's Geolocation API with watchPosition for continuous updates. Calculates distance using Haversine formula. Detects arrival when within 10 meters.

**Q: How is multilingual support implemented?**
A: For audio: Gemini AI translates English text to Tamil/Hindi, then Web Speech API speaks it. For chatbot: System instruction tells Gemini to respond in selected language.

**Q: What if database is down?**
A: App uses hybrid architecture. Starts with local data (instant load), tries database in background. If database fails, keeps using local data. Zero downtime guaranteed.

**Q: How does the chatbot know about IST building?**
A: IST navigation data is hardcoded in geminiService.ts. When user asks about IST, this data is included in the system instruction sent to Gemini AI.

**Q: Why use both Supabase and local data?**
A: Supabase allows easy updates without code changes. Local data ensures app works offline and during database downtime. Best of both worlds.

---

## ✅ PROJECT COMPLETION CHECKLIST

- [x] GPS tracking with real-time updates
- [x] Interactive map with route rendering
- [x] 22 POIs with detailed information
- [x] Multilingual audio narration (English/Tamil/Hindi)
- [x] Multilingual AI chatbot
- [x] Arrival detection (10m threshold)
- [x] Search functionality with suggestions
- [x] Simulation mode for testing
- [x] Database integration with fallback
- [x] Context-aware chatbot responses
- [x] IST building 4-floor navigation
- [x] Error handling and graceful degradation
- [x] Responsive UI with Tailwind CSS
- [x] HTTPS requirement validation

---

**Good luck with your review! 🎉**
