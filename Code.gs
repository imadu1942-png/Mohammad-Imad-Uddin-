/**
 * Google Apps Script Backend for Voter Information Web Application
 * 
 * This script serves as the API backend, allowing the frontend application to
 * fetch voter data directly from Google Sheets.
 * 
 * Deployment Instructions:
 * 1. Create a Google Sheet and name the sheet tab "Voters" (or use the first tab).
 *    Insert headers in the first row: Voter ID, Full Name, Father's Name, Mother's Name, Date of Birth, Address, Mobile Number
 * 2. Click "Extensions" -> "Apps Script" in Google Sheets.
 * 3. Delete any default code and paste this complete Code.gs script.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Choose "Web app" as the deployment type.
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone".
 * 7. Click Deploy, authorize permissions, and copy the Web App URL.
 * 8. Paste the Web App URL into the configuration panel of this Voter Information Portal.
 */

// Global config: tab name containing voter records
const SHEET_NAME = "Voters";

/**
 * Serves HTTP GET requests (Web App endpoint)
 * Supports actions: "getVoters" or simple full-list retrieval with optional query filtering
 */
function doGet(e) {
  // Setup CORS compatibility headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    const params = e ? e.parameter : null;
    const action = params ? params.action : "getVoters";
    const searchQuery = params && params.q ? params.q.toString().trim().toLowerCase() : "";
    
    const spreadsheet = getSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      // Fallback to the first sheet if tab "Voters" is not explicitly named
      sheet = spreadsheet.getSheets()[0];
    }
    
    if (!sheet) {
      return createJsonResponse({
        success: false,
        error: "No worksheets found in the Spreadsheet."
      }, headers);
    }
    
    // Read all data from the sheet
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length <= 1) {
      return createJsonResponse({
        success: true,
        data: [],
        message: "Sheet is empty or only contains headers."
      }, headers);
    }
    
    // Parse headers (row 1)
    const headersList = values[0].map(h => h.toString().trim());
    
    // Map headers to key properties (normalize to lowercase labels)
    const normalizedHeaders = headersList.map(h => {
      const lower = h.toLowerCase();
      if (lower.includes("voter id") || lower.includes("voterid") || lower === "id") return "voterId";
      if (lower.includes("full name") || lower.includes("name")) return "fullName";
      if (lower.includes("father")) return "fatherName";
      if (lower.includes("mother")) return "motherName";
      if (lower.includes("birth") || lower.includes("dob") || lower.includes("date")) return "dateOfBirth";
      if (lower.includes("address")) return "address";
      if (lower.includes("mobile") || lower.includes("phone") || lower.includes("contact")) return "mobileNumber";
      return lower.replace(/[^a-zA-Z0-9]/g, ""); // strip characters for unknown custom columns
    });
    
    // Build voter array
    const voters = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      // Skip empty rows (especially where Voter ID is blank)
      if (!row[0] && !row[1]) continue;
      
      const voter = {};
      for (let j = 0; j < normalizedHeaders.length; j++) {
        const key = normalizedHeaders[j] || "column_" + j;
        let val = row[j];
        
        // Format Date of Birth nicely if it's a Date object
        if (val instanceof Date) {
          try {
            // Format to YYYY-MM-DD local format
            val = val.toISOString().split('T')[0];
          } catch (err) {
            val = val.toString();
          }
        } else {
          val = val !== null && val !== undefined ? val.toString().trim() : "";
        }
        
        voter[key] = val;
      }
      
      voters.push(voter);
    }
    
    // If a search query is provided, perform backend filtering
    let resultData = voters;
    if (searchQuery) {
      resultData = voters.filter(voter => {
        const voterId = (voter.voterId || "").toString().toLowerCase();
        const fullName = (voter.fullName || "").toString().toLowerCase();
        return voterId.includes(searchQuery) || fullName.includes(searchQuery);
      });
    }
    
    return createJsonResponse({
      success: true,
      count: resultData.length,
      total: voters.length,
      data: resultData
    }, headers);
    
  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    }, headers);
  }
}

/**
 * Resolves the target spreadsheet.
 * Supports bound scripts (getActiveSpreadsheet) or standalone scripts (via SPREADSHEET_ID script property or URL parser)
 */
function getSpreadsheet() {
  // 1. Try active sheet (e.g. script is bound to a sheet)
  try {
    const activeSs = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSs) return activeSs;
  } catch (e) {
    // Expected if deployed as a standalone Apps Script
  }
  
  // 2. Try fetching from Script Properties
  try {
    const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (SPREADSHEET_ID) {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    }
  } catch (e) {
    // script properties unavailable or not configured
  }
  
  // 3. Fallback: Search drive for any sheet matching common names, or fail informatively
  throw new Error(
    "Spreadsheet connection not found. Quick Fix: Make sure to open Apps Script directly " +
    "from your Google Sheet via 'Extensions' -> 'Apps Script' so it hooks up automatically! " +
    "Alternatively, set a SPREADSHEET_ID value in your Script Properties."
  );
}

/**
 * Creates a JSON HTTP Response with correct Content-Type and CORS headers
 */
function createJsonResponse(data, headers) {
  const jsonString = JSON.stringify(data);
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}
