# CoachApp

A basic [Expo](https://expo.dev) app for iOS and Android, with a Node.js API and **MongoDB Atlas** backend.

**MongoDB setup (step-by-step):** see [docs/MONGODB_SETUP.md](docs/MONGODB_SETUP.md)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) on your iPhone or Android phone
- Phone and computer on the same Wi‑Fi network

## Run on your phone (Expo Go)

1. Install dependencies (first time only):

   ```sh
   npm install
   ```

2. Start the dev server:

   ```sh
   npm start
   ```

3. Open **Expo Go** on your phone and scan the QR code from the terminal or browser.

If the QR code does not connect, try tunnel mode:

```sh
npx expo start --tunnel
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro and show QR code for Expo Go |
| `npm run android` | Open in Android emulator or Expo Go |
| `npm run ios` | Open in iOS simulator (macOS only) or Expo Go |
| `npm run web` | Run in the browser |

## Project structure

- `App.tsx` — root React component
- `app.json` — Expo configuration
- `index.ts` — app entry (registers root component)
- `assets/` — icons and splash images
