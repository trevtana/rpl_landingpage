# 📚 RPL SMKN 1 Cimahi - API Documentation

Backend API untuk sistem manajemen Dokumentasi Kegiatan dan Prestasi RPL SMKN 1 Cimahi.

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
composer install
```

### 2. Setup Environment
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Configure Database
Edit file `.env` dan sesuaikan konfigurasi database:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rpl_landing_page
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Run Migrations & Seeders
```bash
php artisan migrate --seed
```

### 5. Create Storage Link
```bash
php artisan storage:link
```

### 6. Start Development Server
```bash
php artisan serve
```

API akan berjalan di: `http://localhost:8000`

---

## 📡 API Endpoints

Base URL: `http://localhost:8000/api`

### 🎯 Activities (Dokumentasi Kegiatan)

#### 1. Get All Activities
```
GET /api/activities
```

**Query Parameters:**
- `category` (optional): Filter by category (Lomba, Kegiatan Jurusan, Kunjungan Industri, Kegiatan Sekolah)
- `search` (optional): Search by title

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Lomba Programming Competition 2024",
      "description": "Siswa RPL mengikuti lomba...",
      "category": "Lomba",
      "date": "2024-08-15",
      "location": "Bandung Convention Center",
      "image": "activities/example.jpg",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

#### 2. Get Single Activity
```
GET /api/activities/{id}
```

#### 3. Create Activity
```
POST /api/activities
Content-Type: multipart/form-data
```

**Request Body:**
```
title: string (required)
description: string (optional)
category: enum (required) - Lomba|Kegiatan Jurusan|Kunjungan Industri|Kegiatan Sekolah
date: date (required) - format: YYYY-MM-DD
location: string (optional)
image: file (optional) - max 2MB, jpeg/png/jpg/gif
```

**Response:**
```json
{
  "success": true,
  "message": "Activity created successfully",
  "data": { ... }
}
```

#### 4. Update Activity
```
PUT /api/activities/{id}
Content-Type: multipart/form-data
```

**Request Body:** Same as Create (all fields optional)

#### 5. Delete Activity
```
DELETE /api/activities/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Activity deleted successfully"
}
```

---

### 🏆 Achievements (Prestasi)

#### 1. Get All Achievements
```
GET /api/achievements
```

**Query Parameters:**
- `level` (optional): Filter by level (Nasional, Provinsi, Kabupaten/Kota, Sekolah)
- `year` (optional): Filter by year
- `search` (optional): Search by title or participant

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Juara 1 Lomba Programming Nasional",
      "participant": "Tim RPL SMKN 1 Cimahi",
      "level": "Nasional",
      "rank": "Juara 1",
      "year": 2024,
      "date": "2024-08-15",
      "description": "Memenangkan lomba...",
      "image": "achievements/example.jpg",
      "created_at": "2024-01-01T00:00:00.000000Z",
      "updated_at": "2024-01-01T00:00:00.000000Z"
    }
  ]
}
```

#### 2. Get Single Achievement
```
GET /api/achievements/{id}
```

#### 3. Create Achievement
```
POST /api/achievements
Content-Type: multipart/form-data
```

**Request Body:**
```
title: string (required)
participant: string (required)
level: enum (required) - Nasional|Provinsi|Kabupaten/Kota|Sekolah
rank: string (optional) - e.g., "Juara 1", "Juara 2", "Harapan"
year: integer (required) - min: 2000
date: date (optional) - format: YYYY-MM-DD
description: string (optional)
image: file (optional) - max 2MB, jpeg/png/jpg/gif
```

**Response:**
```json
{
  "success": true,
  "message": "Achievement created successfully",
  "data": { ... }
}
```

#### 4. Update Achievement
```
PUT /api/achievements/{id}
Content-Type: multipart/form-data
```

**Request Body:** Same as Create (all fields optional)

#### 5. Delete Achievement
```
DELETE /api/achievements/{id}
```

**Response:**
```json
{
  "success": true,
  "message": "Achievement deleted successfully"
}
```

---

## 🖼️ Image Upload

Images are stored in `storage/app/public/` directory:
- Activities: `storage/app/public/activities/`
- Achievements: `storage/app/public/achievements/`

Access images via: `http://localhost:8000/storage/{path}`

Example: `http://localhost:8000/storage/activities/image.jpg`

---

## 🔒 CORS Configuration

CORS is configured in `config/cors.php` to allow:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative port)
- `http://127.0.0.1:5173`

---

## 🗃️ Database Structure

### Activities Table
```sql
- id: bigint (primary key)
- title: varchar(255)
- description: text (nullable)
- category: varchar(255)
- date: date
- location: varchar(255) (nullable)
- image: varchar(255) (nullable)
- created_at: timestamp
- updated_at: timestamp
```

### Achievements Table
```sql
- id: bigint (primary key)
- title: varchar(255)
- participant: varchar(255)
- level: varchar(255)
- rank: varchar(50) (nullable)
- year: year
- date: date (nullable)
- description: text (nullable)
- image: varchar(255) (nullable)
- created_at: timestamp
- updated_at: timestamp
```

---

## 🧪 Testing with Postman

Import the following endpoints to Postman:

### Activities Collection
```
GET     {{base_url}}/api/activities
GET     {{base_url}}/api/activities/1
POST    {{base_url}}/api/activities
PUT     {{base_url}}/api/activities/1
DELETE  {{base_url}}/api/activities/1
```

### Achievements Collection
```
GET     {{base_url}}/api/achievements
GET     {{base_url}}/api/achievements/1
POST    {{base_url}}/api/achievements
PUT     {{base_url}}/api/achievements/1
DELETE  {{base_url}}/api/achievements/1
```

Set `base_url` variable to: `http://localhost:8000`

---

## 📝 Error Responses

### Validation Error (422)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "title": ["The title field is required."]
  }
}
```

### Not Found (404)
```json
{
  "message": "No query results for model [App\\Models\\Activity] 999"
}
```

---

## 🛠️ Development Commands

```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Fresh migrate with seed
php artisan migrate:fresh --seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# View routes
php artisan route:list
```

---

## 📦 Tech Stack

- **Framework**: Laravel 12
- **Database**: MySQL
- **Authentication**: None (public API)
- **File Storage**: Laravel Storage (local)
- **CORS**: Laravel CORS Middleware

---

## 👨‍💻 Developer

**Arkan Ardinsyah** - RPL STMNPBDG 50 (21)

---

## 📄 License

© 2025 RPL SMKN 1 Cimahi. All rights reserved.
