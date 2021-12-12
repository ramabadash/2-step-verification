# 2-step-verification

---

Implement a small application with 2-step verification.

- Download Google Authenticator (or another app you prefer) on your phone
  - You can try to first enable 2-step verification for LinkedIn to figure out how it works
- Write a small client-side with:
  - a login page with a username + password form
  - a home page with a warm welcome, and a button for setting-up 2-step verification
  - a 2-step verification page with a form for the code from the authenticator app
- Write a small server that stores user details
  - Passwords must be saved securely! Use hashes with salts (you can find an npm package for that)
- When a user logs in, they are redirected to the home page
  - If the user has 2-step verification enabled, they are redirected to the 2-step verification page (and then to the home page)
- When a user wishes to enable 2-step verification:
  - the server generates a secret key, which is stored with the user's details
  - the user is presented with a QR code, which they can scan with the authenticator app
  - use this package: https://www.npmjs.com/package/node-2fa
- Don't waste your time on other things such as styling, DBs, etc. Make it as simple as possible.
- If you wish you can piggyback on one of your existing projects.
