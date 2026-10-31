Chamet Agency India - chametofficialagency.in
==============================================
Static website: HTML5 + CSS3 + vanilla JavaScript. No frameworks, no build step.
Every file sits in one folder - upload them all directly into Hostinger public_html.

FILES
-----
index.html                 Homepage (About Us = #about-us, Contact = #contact, FAQ = #faq,
                           commission calculator = #commission-calculator)
chamet-agency.html         Chamet Agency page (registration, commission, calculator, dashboard, rules, FAQ)
chamet-host.html           Chamet Host page (registration, guidelines, Beans estimator, payments, rules, FAQ)
blog.html                  Blog: 8 article cards; "Read More" jumps to the full article on the same page
privacy-policy.html        Privacy Policy (footer link)
terms-and-conditions.html  Terms and Conditions (footer link)
404.html                   "Page not found" page
style.css                  All styles (colours are variables at the top, in :root)
script.js                  Mobile menu, sticky header, scroll animations, calculators
robots.txt, sitemap.xml    SEO
.htaccess                  404 page, compression, caching, security headers, optional HTTPS redirect
logo.png, favicon.png, Hero.png, og-image.jpg   Images

IMAGES
------
The images included are original artwork in the site's purple/violet/blue/magenta colours.
To use your own supplied files, upload them with EXACTLY the same names (Hostinger is
case-sensitive): logo.png, favicon.png, Hero.png. Recommended sizes:
  logo.png     square, at least 128 x 128
  favicon.png  square, 192 x 192
  Hero.png     640 x 560 (or the same 8:7 shape), compressed under ~150 KB
  og-image.jpg 1200 x 630 - the picture shown when a page is shared on WhatsApp/Facebook/X

UPLOAD TO HOSTINGER
-------------------
1. hPanel > Websites > Manage > File Manager > public_html.
2. Back up and remove old site files you no longer need.
3. Upload all files (including the hidden .htaccess) so index.html sits directly in public_html.
4. hPanel > Security > SSL: install the free SSL certificate, then enable "Force HTTPS"
   (or remove the # marks in the HTTPS block of .htaccess).
5. Google Search Console: add the domain, verify it, and submit sitemap.xml.

BEFORE PUBLISHING - PLEASE VERIFY
---------------------------------
- No host or agency registration URL is published. All registration buttons open WhatsApp
  with a message asking for the current link. Keep it that way unless you have a verified link.
- Agency dashboard URL used (as supplied): https://newa4mnou8u5xdi9.rchamet.com/user/login/
- No Beans-to-USD rate is published. The Beans estimator asks the visitor to type the
  current rate from the app.
- Commission example (Agents A-D, $362 total) is from the supplied presentation and is
  labelled as illustrative. Exact commission tiers are not published - confirm before adding.
- Settlement rules ($10 minimum, multiples of $10, Metwallet, face verification, refunds)
  are from the supplied presentation and labelled as such.
- The site describes itself as an independent information and assistance website, not
  Chamet's official corporate website. Only change this if official status is verified.
- WhatsApp number used everywhere: +91 8132958338 (wa.me/918132958338).

EDITING
-------
Header, footer and the floating WhatsApp button are repeated on every page. If you change
them, use "find and replace in all files" in an editor such as VS Code.
If you change an FAQ answer, also change the matching text in the FAQPage JSON-LD
(<script type="application/ld+json">) in the <head> of the same page.
