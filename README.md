# Outreach Consulting — React + TypeScript

A responsive three-page recruitment consulting website using React, TypeScript, Vite, and plain CSS. No additional form SDK, router, or CSS framework.

## Requirements
- Node.js 20.19+ or 22.12+ (for Vite 6, Node.js 18+ generally works, but use a current LTS)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Enable the enquiry form with Web3Forms (no extra dependencies)
1. Visit https://web3forms.com/ and request an access key for the email inbox that should receive enquiries. Complete the email verification step.
2. Open `src/App.tsx` and replace `YOUR_WEB3FORMS_ACCESS_KEY` with your Web3Forms access key.
3. Run `npm run dev` and submit a test enquiry from the Contact Us page. Check the recipient inbox and spam folder.
4. Confirm successful delivery before deploying. Add suitable spam protection and privacy wording before launch.

The app uses native browser `fetch()` and `FormData` to POST to `https://api.web3forms.com/submit`. No Web3Forms npm SDK or backend is required. The access key is designed to be public, but **never** place SMTP passwords or secret credentials in frontend code. Web3Forms handles email delivery, subject to its terms and usage limits.

## Build
```bash
npm run build
```
The static production files are generated in `dist/`.

## Deploy to GoDaddy cPanel hosting
1. Ensure the client has GoDaddy hosting with a file manager/cPanel (domain registration alone is not hosting).
2. Run `npm run build`.
3. Upload the **contents** of `dist/` into the appropriate document root (often `public_html` for the primary domain).
4. Connect the domain and configure HTTPS.
5. Test Home, About, Contact, mobile layouts and the form.

Navigation uses URL hashes (`#/about`, `#/contact`), so you do not need server-side rewrite rules.

## Customization
- All page copy and the form endpoint: `src/App.tsx`
- Colors, responsive design and layout: `src/styles.css`
- Browser tab title/SEO description: `index.html`

Before launching, replace sample copy with client-approved wording and add appropriate privacy/contact information.
