Fono Agency India - fonoofficial.in
==============================
Static website: HTML5 + CSS3 + vanilla JavaScript. No frameworks, no build step.
Upload everything in this folder (including the hidden .htaccess) into Hostinger public_html,
so that index.html sits directly inside public_html.

STRUCTURE - EVERYTHING IN ONE FOLDER
------------------------------------
All files sit together in one folder - no sub-folders.

Pages                              Address
index.html                         https://fonoofficial.in/  (About Us = #about-us, Contact = #contact)
fono-agency.html                   https://fonoofficial.in/fono-agency.html
fono-hosting.html                  https://fonoofficial.in/fono-hosting.html
blog.html                          https://fonoofficial.in/blog.html
fono-agency-registration.html, fono-agency-registration-guide.html, how-to-become-fono-host.html,
fono-host-earnings.html, fono-beans-to-inr.html, fono-agency-commission.html,
fono-withdrawal-policy.html, fono-app-download.html, fono-streamer-score.html,
fono-agency-rules.html             the 10 blog articles
privacy-policy.html, terms-and-conditions.html, disclaimer.html, 404.html

style.css   all styles (colours are variables at the top, in :root)
main.js     menu, smooth scrolling, active nav, scroll reveal, referral-code popup
Images      logo.png, favicon.png, favicon-32.png, apple-touch-icon.png,
            hero.png, hero.webp, hero-800.webp, og-image.jpg
robots.txt, sitemap.xml, .htaccess

Links are relative, so pages also open straight from a folder on your computer.
404.html alone uses root paths (/style.css) because the server can show it at any address.
.htaccess 301-redirects the folder-style addresses (/fono-agency/, /fono-hosting/, /blog/,
/blog/<article>/) to the matching .html page, so those links keep working.

1. IMAGES - REPLACE WITH YOUR OWN FILES
--------------------------------------
No FONO logo, hero image or favicon was supplied with the build request, so the site ships with
ORIGINAL stand-in artwork in the site colours (not the official FONO logo). To use your own,
upload files with EXACTLY these names into the same folder (Hostinger is case-sensitive):
  logo.png              square, 160 x 160 or larger (header + footer)
  favicon.png           192 x 192;  favicon-32.png 32 x 32;  apple-touch-icon.png 180 x 180
  hero.png              1200 x 900 (4:3). ALSO replace hero.webp (1200 x 900) and
                        hero-800.webp (800 x 600) - modern browsers load the WebP files first.
                        If your hero has a different shape, update width/height on the <img>
                        in index.html so the layout does not shift.
  og-image.jpg          1200 x 630 - picture shown when a page is shared on WhatsApp/Facebook/X

2. APP LINK AND REFERRAL CODE
-----------------------------
Every "JOIN AS HOST", "JOIN AS AGENCY" and "DOWNLOAD FONO APP" button (including the two
homepage hero buttons) links to the same FONO app download:
  https://frnd1.blr1.digitaloceanspaces.com/Fono.apk
Each button shows "Referral code: ALFVVDRU". Clicking one opens a popup with the code, a
Copy button and the line "Take agency or become host on Fono. / Fono पर होस्ट बनें या एजेंसी लें";
"Continue to download" then starts the download. Without JavaScript the link downloads directly.
To change the link or code: find and replace "Fono.apk" URL and "ALFVVDRU" in all files
(HTML pages and main.js, where FONO_APP holds the defaults).

3. BEFORE PUBLISHING - PLEASE VERIFY
------------------------------------
- KANDY REFERENCE: the supplied FONO Policy (08 December 2025) refers to "Kandy" in its
  recruitment restrictions (no cross-agency recruitment, no promotion of other platforms).
  The site shows all four recruitment rules with a "Verify" tag and a "Verification pending"
  note on /fono-agency/, /blog/fono-agency-rules/ and /blog/fono-agency-registration-guide/.
  Once you confirm they apply to FONO, you can remove those notes and tags.
- AGENCY CONVERSION: the policy states 1,000 Beans = Rs 10 in the streamer salary section. The
  site says 100,000 Beans "corresponds to Rs 1,000" for agencies but asks agencies to confirm.
- WITHDRAWAL TIME ZONE: the policy says 8 AM - 8 PM but no time zone; the site says so.
- All figures (call rates, salary, conversion, Streamer Score, withdrawal, commission,
  penalties, PAN rules) are exactly as supplied. Update every page if the policy changes.
- The site describes itself as an independent information website, not the official FONO
  website. Change this only if official authorisation is confirmed.

4. HOSTINGER
------------
1. hPanel > Websites > Manage > File Manager > public_html. Back up and remove old files.
2. Upload all files and folders (zip, upload, Extract is easiest). Include .htaccess.
3. hPanel > Security > SSL: install the free certificate, enable Force HTTPS
   (or un-comment the HTTPS block in .htaccess AFTER the certificate is active).
4. Google Search Console: add fonoofficial.in, verify via DNS, submit sitemap.xml.

5. EDITING
----------
Header, footer and the floating WhatsApp button are repeated on every page. If you change them,
use "find and replace in all files" (e.g. VS Code). WhatsApp number everywhere: 918132958338.
When you add an article: copy an article .html file, rename it, change title, meta description, canonical,
H1, content and the JSON-LD; add a card to blog.html; add the URL to sitemap.xml.
