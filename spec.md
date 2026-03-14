# DivyaVastra

## Current State
- Admin login: password-only, no username field, no forgot password
- Checkout: single-screen modal with name, phone, payment method selection
- Currency: INR/NPR/USD auto-detection exists

## Requested Changes (Diff)

### Add
- Username field to admin login (fixed: `divyash123`)
- Recovery code system for forgot password (shown once on first setup, can be used to reset password)
- Change username/password option in admin settings
- Amazon-style multi-step checkout: Step 1 (Shipping Address), Step 2 (Payment Method), Step 3 (Order Summary + Confirm)
- Address fields in checkout (name, phone, address line, city, state, pincode)

### Modify
- AdminLoginPage: add username input, forgot password link with recovery code flow
- AdminSettingsPage: add change username and change password section
- store.ts: add username and recoveryCode to AdminSettings type
- CheckoutModal: replace single-screen with 3-step wizard

### Remove
- Nothing removed

## Implementation Plan
1. Update `store.ts` AdminSettings type to include username and recoveryCode
2. Update `AdminLoginPage.tsx` with username field, forgot password flow via recovery code
3. Update `AdminSettingsPage.tsx` with change username/password section
4. Rewrite `CheckoutModal.tsx` as multi-step: Step 1 shipping, Step 2 payment, Step 3 summary
