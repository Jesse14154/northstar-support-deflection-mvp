# GitHub Upload Guide

## Required final structure

```text
index.html
README.md
GITHUB_UPLOAD_GUIDE.md
css/styles.css
data/demo-data.js
js/app.js
js/orders.js
js/returns.js
js/inventory.js
js/support.js
pages/alternatives.html
pages/human-support.html
pages/notification.html
pages/order-status.html
pages/order-tracking.html
pages/return-instructions.html
pages/return-status.html
pages/returns.html
pages/stock.html
```

## GitHub Pages

1. Open the repository.
2. Click **Settings**.
3. Click **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main**.
6. Choose folder **/(root)**.
7. Click **Save**.
8. Open the published URL shown by GitHub.

## Do not move `index.html`

`index.html` must remain at the repository root. The other HTML pages belong in `pages/`.

## Test the MVP

1. Home → Enter Support Centre.
2. Order Status → NS1001 / 714440059.
3. Delivery Progress.
4. Returns → NS1001 for an eligible return.
5. Returns → NS1002 for the outside-window escalation.
6. Stock → NS-1001 and choose a size.
7. Stock → NS-1001 / XL to demonstrate unavailable stock.
8. View alternatives.
9. Request stock notification.
10. Human Support.
