# MODULE-WISE EVALUATION FORMULAS
## CEG CampusPulse — Campus Navigation and Assistance System

---

## MODULE 1: LOCATION DETECTION AND AWARENESS MODULE

### 1.1 GPS Position Accuracy
```
Accuracy Rate (%) = (1 − (Position Error / Proximity Threshold)) × 100
```

### 1.2 Haversine Distance Calculation
```
a = sin²(Δφ/2) + cos(φ₁) · cos(φ₂) · sin²(Δλ/2)
c = 2 · atan2(√a, √(1−a))
d = R · c        [R = 6,371,000 meters]

Haversine Error (%) = ((Haversine Distance − True Distance) / True Distance) × 100
```

### 1.3 Arrival Detection Precision
```
True Positive Rate  (TPR) = True Arrivals Detected / Total Actual Arrivals
False Positive Rate (FPR) = False Arrivals Triggered / Total Non-Arrival Events
Precision               = TP / (TP + FP)
```

### 1.4 GPS Update Frequency
```
Update Rate (Hz)      = Number of Position Updates / Time Period (seconds)
Location Latency (ms) = Time between actual movement and state update
```

### 1.5 Bearing Calculation
```
θ        = atan2(sin(Δλ)·cos(φ₂), cos(φ₁)·sin(φ₂) − sin(φ₁)·cos(φ₂)·cos(Δλ))
Bearing° = (θ × 180/π + 360) mod 360
```

---

## MODULE 2: NAVIGATION AND MAP VISUALIZATION MODULE

### 2.1 Route Fetch Latency
```
Route Fetch Time (ms) = API Response Time − API Request Time
Route Accuracy (%)    = (Road Route Distance / Straight Line Distance) × 100
```

### 2.2 Map Rendering Performance
```
Frame Rate (FPS)    = Frames Rendered / Time (seconds)
Tile Load Time (ms) = Time to load all visible map tiles
```

### 2.3 Route Update Efficiency
```
API Calls Saved (%) = (1 − Actual Calls / Maximum Possible Calls) × 100
```

### 2.4 Coordinate Transformation
```
Transformation: [longitude, latitude] → [latitude, longitude]
Error Rate (%)  = (Wrong Transformations / Total Transformations) × 100
```

### 2.5 Map Bounds Fitting
```
Zoom Level = f(route_length, screen_size)   [computed by Leaflet fitBounds]
```

---

## MODULE 3: INFORMATION DELIVERY MODULE

### 3.1 Database Query Performance
```
Query Latency (ms) = Response Received Time − Query Sent Time
```

### 3.2 Fallback Reliability
```
System Availability (%)  = (Uptime with Fallback / Total Time) × 100
Fallback Trigger Rate (%) = Database Failures / Total Sessions × 100
```

### 3.3 Search Filter Performance
```
Search Accuracy (%) = Relevant Results / Total Results Returned × 100
Time Complexity     = O(n × m)   [n = number of POIs, m = query string length]
```

### 3.4 POI Data Completeness
```
Data Completeness (%) = Filled Fields / Total Fields × 100
Coverage (%)          = POIs with academicDetails / Total POIs × 100
```

---

## MODULE 4: MULTILINGUAL NARRATION MODULE

### 4.1 Translation Latency
```
Total Narration Delay (ms) = Translation Time (ms) + TTS Initialization Time (ms)
```

### 4.2 Translation Quality
```
Translation Accuracy (%) = Correctly Translated Segments / Total Segments × 100
Tanglish Rate (%)        = English Words in Tamil Output / Total Words × 100
```

### 4.3 Web Speech API Browser Coverage
```
Browser Support Rate (%) = Browsers Supporting speechSynthesis / Total Browsers × 100
```

### 4.4 Narration Trigger Accuracy
```
Auto-Trigger Accuracy (%) = Correct Auto Narrations / Total Arrivals × 100
```

---

## MODULE 5: CONVERSATIONAL ASSISTANT MODULE

### 5.1 Response Latency (Streaming)
```
Time to First Token (TTFT) (ms) = First Chunk Received Time − Request Sent Time
Total Response Time (ms)        = Last Chunk Received Time − Request Sent Time
Speed Improvement (%)           = (1 − TTFT / Old Wait Time) × 100
```

### 5.2 Context Relevance Score
```
Context Relevance (%)       = On-Topic Responses / Total Responses × 100
Cross-Contamination Rate (%) = Responses with other POI info / Total Responses × 100
```

### 5.3 Suggestion Chip Coverage
```
Custom Coverage (%)  = POIs with Custom Questions / Total POIs × 100
Total Coverage (%)   = POIs with Any Questions / Total POIs × 100
```

### 5.4 Multilingual Response Accuracy
```
Language Compliance (%) = Responses in Correct Language / Total Responses × 100
```

### 5.5 Error Handling Rate
```
Error Recovery Rate (%) = Graceful Error Responses / Total Errors × 100
```

---

## MODULE 6: WEB INTERFACE AND DEPLOYMENT

### 6.1 Bundle Compression Ratio
```
Compression Ratio (%) = (1 − Gzipped Size / Raw Size) × 100
Load Time (ms)        = (Bundle Size in KB × 8) / Network Speed (Kbps) × 1000
```

### 6.2 React Rendering Efficiency
```
Re-render Rate              = State Updates / Time Period (seconds)
Unnecessary Re-renders (%)  = Re-renders without DOM change / Total Re-renders × 100
```

### 6.3 Deployment Uptime
```
Uptime (%) = (Total Time − Downtime) / Total Time × 100
```

### 6.4 API Quota Utilization
```
Daily Usage Rate (%)  = Daily API Calls / Daily Free Quota × 100
Monthly Budget (days) = Monthly Free Quota / Average Daily Calls
```

### 6.5 Overall System Performance Score
```
Overall Score (%) = (Sum of All Module Scores) / Number of Modules
                  = (M1 + M2 + M3 + M4 + M5 + M6) / 6
```

---
