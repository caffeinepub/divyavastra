# Specification

## Summary
**Goal:** Add a "Gopi Dresses" product section to the homepage and map all previously uploaded product images to their respective product cards.

**Planned changes:**
- Add a "Gopi Dress" category in the backend with 2–3 seeded products using null price (displayed as "Price Updating Soon") and WhatsApp Buy Now buttons
- Display a "Gopi Dresses" section on the homepage alongside existing Jaipuri Skirts, Short Kurtis, and Sarees sections, using the same red/golden Jaipuri theme
- Copy uploaded images (IMG_4047-1.jpeg, IMG_4047-2.jpeg, IMG_4044-1.jpeg, IMG_4044-2.jpeg, IMG_4045-1.jpeg, IMG_4045-2.jpeg, IMG_4048-1.jpeg, IMG_4048-2.jpeg) to `frontend/public/assets/generated`
- Update backend seed `imageUrl` values for Jaipuri Skirt products to reference `/assets/generated/IMG_4047-1.jpeg`, `/assets/generated/IMG_4044-1.jpeg`, `/assets/generated/IMG_4045-1.jpeg`
- Update backend seed `imageUrl` for Short Kurti product to reference `/assets/generated/IMG_4048-1.jpeg`
- Assign appropriate uploaded images to Gopi Dress seeded products

**User-visible outcome:** The homepage shows a new "Gopi Dresses" section with product cards using the uploaded photos, and all existing Jaipuri Skirt and Short Kurti cards now display their correct uploaded product images.
