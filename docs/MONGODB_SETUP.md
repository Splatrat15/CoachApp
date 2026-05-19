# MongoDB setup for CoachApp

CoachApp uses **MongoDB Atlas** (cloud database) plus a small **Node.js API** in the `server/` folder.  
The Expo app on your phone talks to the API; the API talks to MongoDB.

```
iPhone / Android (Expo Go)  →  API (server/)  →  MongoDB Atlas
```

---

## Part 1 — MongoDB Atlas (your database)

### Step 1: Create an Atlas account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up (free **M0** tier is enough for development)

### Step 2: Create a cluster

1. Choose **M0 FREE** (Shared)
2. Pick a cloud provider and region close to you
3. Name the cluster (default is fine)
4. Click **Create**

### Step 3: Create a database user

1. Open **Database Access** (left sidebar)
2. **Add New Database User**
3. Authentication: **Password**
4. Username: e.g. `robbiethiel10_db_user`
5. Password: nd52d5mVQIpvcEpG
6. Privileges: **Read and write to any database**
7. **Add User**

### Step 4: Allow network access

1. Open **Network Access**
2. **Add IP Address**
3. For development: **Allow Access from Anywhere** (`0.0.0.0/0`)  
   *(Tighten this before production.)*
4. Confirm

### Step 5: Get your connection string

1. Open **Database** → **Connect** on your cluster
2. Choose **Drivers**
3. Driver: **Node.js**, version 5.5 or later
4. Copy the connection string. It looks like:

   ```
   
   ```

5. Replace `<password>` with your real password (URL-encode special characters if needed)
6. Add a database name before the `?`:

   ```
   mongodb+srv://coachapp_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/coachapp?retryWrites=true&w=majority
   ```

   The segment `/coachapp` is your database name.

---

## Part 2 — Connect the API (already built in this repo)

### Step 6: Install server dependencies

From the project root:

```sh
npm run server:install
```

### Step 7: Create `server/.env`

```sh
copy server\.env.example server\.env
```

Edit `server/.env` and set:

```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/coachapp?retryWrites=true&w=majority
PORT=3001
```

### Step 8: Test the connection

```sh
npm run server:db:test
```

You should see:

```
MongoDB connected: coachapp
Connection test passed.
```

### Step 9: Seed sample roster names

```sh
npm run server:seed
```

### Step 10: Start the API

```sh
npm run server:dev
```

Open in a browser:

- [http://localhost:3001/api/health](http://localhost:3001/api/health) → `"ok": true`
- [http://localhost:3001/api/people](http://localhost:3001/api/people) → list of names

---

## Part 3 — API reference (ready to use)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API + MongoDB status |
| GET | `/api/people` | List active people |
| GET | `/api/attendance?date=2026-05-18` | Attendance for a date (default: today) |
| PUT | `/api/attendance/:personId` | Set status body: `{ "status": "present" }` |

Status values: `present`, `absent`, `late`

---

## Part 4 — Expo app (when you connect the UI)

Copy `.env.example` to `.env` in the project root:

```env
EXPO_PUBLIC_API_URL=http://localhost:3001
```

**Physical phone:** use your PC’s LAN IP, not `localhost`:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.50:3001
```

Find your IP: `ipconfig` (Windows) → IPv4 Address.

Restart Expo after changing `.env`:

```sh
npm start
```

The app config stub lives at `src/config/api.ts`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Missing MONGODB_URI` | Create `server/.env` from `server/.env.example` |
| Authentication failed | Check username/password in the URI |
| `IP not whitelisted` | Add your IP (or `0.0.0.0/0`) in Atlas Network Access |
| Phone can’t reach API | Use LAN IP in `EXPO_PUBLIC_API_URL`, same Wi‑Fi as PC |
| Port in use | Change `PORT` in `server/.env` |

---

## What’s next

After Atlas is connected and `npm run server:dev` works, we can wire the Attendance screens to `/api/people` and `/api/attendance` instead of local mock data.
