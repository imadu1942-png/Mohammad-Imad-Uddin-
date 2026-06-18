/**
 * Voter interface matching Google Sheet columns and Apps Script JSON output
 */
export interface Voter {
  voterId: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  address: string;
  mobileNumber?: string;
}

/**
 * Address group structure for voters grouped by their matching addresses
 */
export interface AddressGroup {
  address: string;
  voters: Voter[];
  totalVoters: number;
}

/**
 * Config state representation for connecting to Google Sheet Apps Script backend
 */
export interface BackendConfig {
  webAppUrl: string;
  isDemoMode: boolean;
}
