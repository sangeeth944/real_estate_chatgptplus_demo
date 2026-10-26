# HAVEN — portable real estate website demo

An original, rebrandable real estate demonstration. Independent of Sotheby's. Includes 12 fictional listings across Dubai, Mumbai, Bengaluru and Goa. No paid dependencies or API keys needed.

## Run in VS Code
1. Install Node.js 18 or later.
2. Extract this ZIP, open the folder in VS Code.
3. In the terminal run `npm start` (no npm install needed).
4. Visit http://localhost:3000 . Do not open index.html as a file: JSON loading requires a server.

For GitHub: create a repository, upload these project files and commit. For GitHub Pages publish the contents of `dist` or configure a deployment action to upload `dist`. The site uses hash routes so deep links work on static hosts. For Netlify/Cloudflare Pages use `dist` as the publish directory and no build command. `npm run check` checks JavaScript syntax.

## Rebrand
- `dist/config.js`: agency name, tagline, WhatsApp number (international digits only, no + or spaces), currency, property data URL.
- `dist/index.html`: static metadata, footer and company links/text.
- `dist/app.js`: homepage, company copy and all route templates.
- `dist/styles.css`: colours, typography, responsive design.
- `dist/properties.json`: listing information and local gallery paths.
- `dist/assets`: bundled sample stock photographs. Replace with verified property photographs before client delivery. Photos sourced from Unsplash; URLs recorded in build_demo.py. Downloaded photographs are illustrative, not proof of a real listing. Confirm rights for your intended client use.

Prices are in USD and rent is per month. No currency conversion is implemented. Search matches city, area, property name and property type. Property pages have URLs like `/#/property/1`. Search URLs preserve filters. Saved favourites persist in the same browser only.

## WhatsApp
With `whatsappNumber` empty, buttons open the WhatsApp recipient/share flow with an enquiry draft. This avoids sending to a made-up telephone number. Configure the real number before commercial launch. Form details are placed in the draft only; there is no backend submission or email delivery. The visitor reviews and sends in WhatsApp. Browsers require user interaction to open the new tab.

## Later: Airtable
Airtable is NOT connected. Keep API tokens on a backend, never in config.js or frontend JavaScript.
1. Create an Airtable Properties table. Suggested fields: id (stable unique text), name, city, area, type (House/Apartment/Villa/Office), deal (Buy/Rent), price (number), beds, baths, size, image (URL), gallery (array of URLs), description, amenities (array).
2. Build a server/Worker endpoint `/api/properties` with a server environment secret AIRTABLE_TOKEN, plus AIRTABLE_BASE_ID and AIRTABLE_TABLE_ID.
3. Fetch the Airtable records server-side, handle pagination, cache results, validate values and map fields into the same JSON array shape as properties.json.
4. Set propertiesUrl in config.js to the endpoint. The current UI expects this shape; no Airtable SDK is needed in the browser.
5. For enquiries, create a separate validated server endpoint with consent, rate limiting and spam protection if you need durable records. The current form intentionally only creates a WhatsApp draft.

## Before selling / launching
Replace the fictional branding, listings, specifications and prices. Verify property availability, licensing, image rights, accessibility and legal/privacy content for the agency. Configure a real enquiry destination. Test the WhatsApp destination on target devices. This demo contains no accounts, payments, geocoded map, email delivery, analytics or database integration.

## Files
`dist/` is the complete deployable site. `server.js` is a small local development server. `package.json` contains run/check commands. `build_demo.py` records demo data and image provenance; it is optional and need not be run. `.openai/hosting.json` belongs only to the original hosted preview and is intentionally excluded from the portable download.

## Motion
The hero crossfades through four bundled property images every 5 seconds with gentle zoom. Visitors can pause or choose a slide. Playback pauses while the browser tab is hidden. Reduced-motion preferences disable automatic playback and motion effects. Scroll reveals use IntersectionObserver and are reset cleanly between routes. Edit dist/motion.js for timing and slide sources, and dist/styles.css for transitions.
