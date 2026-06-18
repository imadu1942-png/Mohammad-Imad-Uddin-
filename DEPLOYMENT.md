# Google Sheets & Apps Script Deployment Instructions

Follow these five simple steps to connect this Voter Information Web Application to your own live Google Sheet database!

---

### Step 1: Create your Google Sheet Database
1. Open [Google Sheets](https://sheets.new) and create a brand-new spreadsheet.
2. In the first tab (rename it to **"Voters"**), add the following exact column headers in **Row 1**:
   * **Cell A1**: `Voter ID`
   * **Cell B1**: `Full Name`
   * **Cell C1**: `Father's Name`
   * **Cell D1**: `Mother's Name`
   * **Cell E1**: `Date of Birth`
   * **Cell F1**: `Address`
   * **Cell G1**: `Mobile Number` *(Optional)*
3. Fill in several rows of dummy data to test. Example:
   * **Row 2**: `V-10243` | `Alexander Mercer` | `William Mercer` | `Eleanor Mercer` | `1985-04-12` | `123 Maple Street, Sector-4` | `+1-555-0199`
   * **Row 3**: `V-10244` | `Sophia Mercer` | `William Mercer` | `Eleanor Mercer` | `1989-11-22` | `123 Maple Street, Sector-4` | `+1-555-0201`
   * **Row 4**: `V-20051` | `Marcus Cole` | `Arthur Cole` | `Martha Cole` | `1992-07-09` | `78 Pine Road, Sector-1` | `+1-555-0433`

---

### Step 2: Open Google Apps Script
1. Inside your Google Sheet, click on **Extensions** in the top menu.
2. Select **Apps Script** from the dropdown. This will open the Google Apps Script workspace in a new tab.

---

### Step 3: Paste Code.gs
1. In the Apps Script code editor, delete any default template code (including any empty `myFunction` blocks).
2. Create or open the existing `Code.gs` file in the left sidebar.
3. Paste the entire content of `Code.gs` from this workspace.
4. Click the **Save** icon (disk symbol) in the toolbar or press `Ctrl+S` / `Cmd+S`.

---

### Step 4: Deploy as a Web Application
1. Click the blue **Deploy** button in the top-right corner of the Apps Script interface.
2. Select **New deployment** from the dropdown list.
3. Click the gear icon next to "Select type" and choose **Web app**.
4. Configure the following deployment fields:
   * **Description**: `Voter Info Portal API`
   * **Execute as**: `Me (your-email@gmail.com)`
   * **Who has access**: `Anyone` *(Crucial: This generates a public JSON endpoint so the web application can access the data without complex authentication).*
5. Click **Deploy**.
6. Google will request permissions to access your spreadsheet. Click **Authorize Access**, select your Google account, click **Advanced**, then select **Go to Untitled project (unsafe)** / **Allow**.
7. Once successfully deployed, Apps Script will provide a **Web app URL**. It will look similar to this:
   `https://script.google.com/macros/s/AKfycb..._ws/exec`
8. **Copy this URL** to your clipboard.

---

### Step 5: Connect and Run
1. Return to this Voter Information Web Application preview.
2. Click on the **Database Settings** (or API Config) gear icon in the toolbar.
3. Paste your copied **Web app URL** into the URL input field.
4. Press **Save & Secure Connection**.
5. The application will immediately contact your real Google Sheet, sync records, fetch all entries, and enable fast auto-suggest searches, grouping by address, and layout updates!

---

## Technical Specifications
* **Response format**: Standardized CORS JSON payload.
* **Auto-refresh**: When you update, modify, insert, or delete any row in Google Sheets, the modifications are active instantly. Simply refresh or click "Sync Data" on this portal.
* **Smart Matching**: The App handles formatting like standard Dates, numeric strings, and trailing/leading spaces gracefully.
