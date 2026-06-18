import React, { useState, useEffect, useMemo } from 'react';
import {
  Landmark,
  Users,
  MapPin,
  Search,
  X,
  AlertCircle,
  Layers,
  RefreshCw,
  Link,
  Fingerprint,
  ChevronRight,
  Copy,
  Check,
  Info,
  FileText,
  Settings,
  Sparkles,
  User,
  Calendar,
  Phone,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Voter, AddressGroup, BackendConfig } from './types';

// Premium Civic Mock Data representing Brookside Registry Ward 4
const PREMIUM_MOCK_VOTERS: Voter[] = [];

export default function App() {
  // App Config
  const DEFAULT_SHEETS = useMemo(() => [
    'https://docs.google.com/spreadsheets/d/1pvb6_9poAUQXaMUHhS5kPMdDwSbtCcZ5CC5M_pPo1A0/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1rdDueoOwSbnCvPFudclKHPLa59QQp5eSysQsnhWik4I/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1XOm3T7XoQwL9QWNgiNStsQnMv-XZleCboTl7BrxPNT0/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1Se4OhJl4CzVc0CPCndD8fRgllIsdngi2893dkeSaZCI/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/12mMWcFwu1zLBT5aNO2oYgYKKhs5cy8Dhg1A6l8XhFXg/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/16FBAuoIsDi67CrrHHZBS0rKKE_H44I1WB2_11p7cDsE/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1N4AHuUAylI9j6fglDuRLVTkexw3po5txVycqaQyhQ80/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/10kCBDKf2WJVkMeU-F_22r7n6p6oEFp6FoJtY5w8gRxQ/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1yhAwDgxkcbk7CVYjqz1-iFoAEIRzks--wWACxYXmQAY/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1fzaq8TZijvTYQPL5m8QFJa9_v5K124F7NQZGflxF3Zo/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/113YQEflcWdV_d5xfP3VGAGKeKs660E1yq2LZdXjVVcE/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1hC5J2MnMvQWU5G-GUSwi5jF6vgF1YYgXu19jUrfZKfk/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1ISVRLZsYU5GTxvn5i0yvmSZNqpK35HirofSwsY4N2GY/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/16lyVUT7yz7ofElmhtipIfPZqkNKEWtqJTLubKKEpaZA/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/105k4vw6ZtfMVkVu3_TNiOjpbz1dtEsYBNSEMHwQgQjM/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1xUw7oX2z_LXEsFV_XMRt7-rQqMy_2PAR6UjQfLD7B30/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/12cVGRG9WlR6CdInXo91T82RZOl3uCFGnGmq9UP_PfoY/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1KnOY5RWzUN6iFZhvFUsZEojyX9NEajO1A_cbJaVWPWg/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1za_DgoVKz5FA8Q2jEjB_vvAzEgbIaU1Mv4gLCVrhUd0/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1oj_1w0ZbSvp8TJS5ArYRrk-OZychZ0C91cU5C3P3rcc/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1c9rLBAN_G5QJZiBb1izeN3jC9wiWEFcgHKYVbdQIf9Q/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/105k4vw6ZtfMVkVu3_TNiOjpbz1dtEsYBNSEMHwQgQjM/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1We448sRAclivltl1d6DUDeaJbSRKa47OkSJIIc_7Yaw/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/14m8A0xhAYnLTPtRVHABENIWvTmr218La0vZtdz22sPA/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1_cBqv9TO8Hx-5R5a92Y6OLp-RYNuhDnjTbblTECBC_k/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1dOqjDKFbk5_OBaVV8lwPx4NDj3zWUccuv4NgfXSGXZU/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1JFzgnKc_XIS1h2HUd6ZDaCLwmIdsnIG2BQ9NDOJ6X74/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1koJIIDLpnJ-I4cS1xgA0g4Da3614eFYPjOkkGkGJAxc/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1SVZYEIZ7k_uwYV1ik2qM2-n2uNIaIWl3ezDmi2Do_GI/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1EwF_N5P5iIcQxyFEBiMRskLsOsg8Bmh2MjEOKBtDFAI/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1F4RUUUy-lC938agV_T86nLMDDuv04-11gZ45qOfGla8/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1AXdrR0CCTfHocSU7CDELCrVbhBdsAm6l8MRMHB5Xuqc/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/12-0XajqbpwxVjg_qNdR8YqFcmoMkQpAvod0RfqT5Tto/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1aWllIcnykkZZp0sZK14PMXt3BzpaMCS2O_-3DUQuQzA/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1koJIIDLpnJ-I4cS1xgA0g4Da3614eFYPjOkkGkGJAxc/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1SEGdZQxmr9sJul4WTyBlS12_YhBY5YSGJcVcHCXM0Z4/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1QDWB2Z3cvBtC4SXyYMNQ7FfjjAUqyEXIQJJj1-X-feM/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1T-9x3pzHV16qbCQWpe1iC3aw_nSuUQ2O2Dtazbb995M/edit?usp=drivesdk',
    'https://docs.google.com/spreadsheets/d/1z54tJglQWrhjRlX4Td_l36603uAmYdTJ5J4ZzD6b6wg/edit?usp=drivesdk'
  ], []);

  // App State
  const [voters, setVoters] = useState<Voter[]>(PREMIUM_MOCK_VOTERS);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [failedSources, setFailedSources] = useState<number[]>([]);
  
  // UI Interaction States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('civic_registry_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    setIsVerifying(true);
    setAuthError(null);
    try {
      const response = await fetch('/api/verify-passcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode: passwordInput.trim() }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('civic_registry_auth', 'true');
        setAuthError(null);
      } else {
        setAuthError(data.error || "Invalid registry passcode. Please verify and try again.");
      }
    } catch (err: any) {
      console.warn(err);
      setAuthError("Network authorization failure. Please check if server is active.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('civic_registry_auth');
    setPasswordInput('');
    setAuthError(null);
  };

  // Parses a raw CSV string into a 2D grid array, handling quotes correctly
  const parseCSV = (text: string): string[][] => {
    const lines: string[][] = [];
    let row: string[] = [""];
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push("");
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        lines.push(row);
        row = [""];
      } else {
        row[row.length - 1] += char;
      }
    }
    if (row.length > 1 || row[0] !== "") {
      lines.push(row);
    }
    return lines;
  };

  // Dedicated helper to fetch and parse a single Spreadsheet database
  const fetchAndParseSheet = async (targetUrl: string): Promise<Voter[]> => {
    const isDirectSheetLink = targetUrl.includes("docs.google.com/spreadsheets") || targetUrl.includes("docs.google.com/spreadshees");

    if (!isDirectSheetLink) {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const payload = await response.json();
      if (payload && payload.success === true && Array.isArray(payload.data)) {
        return payload.data;
      }
      throw new Error("Received invalid response payload structure.");
    }

    // Extract spreadsheet ID (matching spreadshees typo or regular spreadsheets)
    const match = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) {
      throw new Error("Could not extract Spreadsheet ID from your link URL.");
    }
    const spreadsheetId = match[1];
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheet. Make sure sharing is set to 'Anyone with the link can view'.`);
    }
    
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 1) {
      throw new Error("The spreadsheet is empty.");
    }
    
    // Normalize headers
    const headersList = rows[0].map(h => h.toString().trim());
    const normalizedHeaders = headersList.map(h => {
      const lower = h.toLowerCase().trim();
      if (lower.includes("v.number") || lower.includes("v. number") || lower.includes("vnumber") || lower.includes("voter id") || lower.includes("voterid") || lower === "id") return "voterId";
      if (lower.includes("full name") || lower === "name") return "fullName";
      if (lower.includes("father") || lower === "f name" || lower === "fname") return "fatherName";
      if (lower.includes("mother") || lower === "m name" || lower === "mname") return "motherName";
      if (lower.includes("birth") || lower.includes("dob") || lower.includes("date") || lower === "d.o.b." || lower === "d.o.b") return "dateOfBirth";
      if (lower.includes("address")) return "address";
      if (lower.includes("mobile") || lower.includes("phone") || lower.includes("contact")) return "mobileNumber";
      return lower.replace(/[^a-zA-Z0-9]/g, "");
    });
    
    const parsedVoters: Voter[] = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.length === 0 || (row.length === 1 && !row[0])) continue;
      
      const voter: any = {};
      let hasContent = false;
      
      for (let j = 0; j < normalizedHeaders.length; j++) {
        const key = normalizedHeaders[j];
        if (!key) continue;
        
        const cellValue = row[j] !== undefined ? row[j].trim() : "";
        if (cellValue) hasContent = true;
        voter[key] = cellValue;
      }
      
      if (hasContent) {
        parsedVoters.push(voter as Voter);
      }
    }
    
    return parsedVoters;
  };

  // Synchronize Google Sheet data from all specified APIs/spreadsheets
  const handleSync = async () => {
    setLoading(true);
    setErrorMsg(null);
    setFailedSources([]);

    const failedIndexes: number[] = [];
    const results: Voter[][] = [];

    try {
      await Promise.all(
        DEFAULT_SHEETS.map(async (url, idx) => {
          try {
            const data = await fetchAndParseSheet(url);
            results.push(data);
          } catch (err: any) {
            console.warn(`Error fetching sheet ${idx + 1}:`, err);
            failedIndexes.push(idx + 1);
          }
        })
      );

      // Merge voters lists from all accessible sheets
      const combined = results.flat();
      
      // Deduplicate on voterId + fullName + dateOfBirth key
      const uniqueVotersMap = new Map<string, Voter>();
      combined.forEach(v => {
        const key = `${v.voterId || ''}-${v.fullName || ''}-${v.dateOfBirth || ''}`.trim().toLowerCase();
        if (key && !uniqueVotersMap.has(key)) {
          uniqueVotersMap.set(key, v);
        }
      });
      
      const uniqueVoters = Array.from(uniqueVotersMap.values());

      if (uniqueVoters.length === 0) {
        setVoters([]);
        setIsDemoMode(false);
        setFailedSources(failedIndexes);
        if (failedIndexes.length > 0) {
          setErrorMsg(`Attempted to query database sources, but all sheets failed to load or are empty. Double-check that all 39 sources have standard link sharing enabled. failed sources: #${failedIndexes.join(', #')}`);
        } else {
          setErrorMsg("Connected successfully! However, all spreadsheet databases appear to have no voter records besides the headers.");
        }
      } else {
        setVoters(uniqueVoters);
        setIsDemoMode(false);
        setFailedSources(failedIndexes);
        // Do not set errorMsg since we loaded records successfully from the other sheets!
      }
      
      setSearchQuery('');
      setSelectedVoter(null);
    } catch (err: any) {
      console.warn(err);
      setErrorMsg(err?.message || "Failed to establish database connection to Google Spreadsheet sources. Please check permissions.");
      setVoters([]);
      setIsDemoMode(false);
    } finally {
      setLoading(false);
    }
  };

  // Sync on startup automatically
  useEffect(() => {
    handleSync();
  }, []);

  // Autocomplete Suggestions Selector List
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    
    return voters.filter(
      v => 
        (v.fullName && v.fullName.toLowerCase().includes(q)) ||
        (v.voterId && v.voterId.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [searchQuery, voters]);

  // Handle direct selection
  const selectVoterRecord = (voter: Voter) => {
    setSelectedVoter(voter);
    setSearchQuery(voter.fullName);
    setShowSuggestions(false);
  };

  // Typing matching checks
  const hasNoMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return false;
    
    const matchesCount = voters.filter(
      v => 
        (v.fullName && v.fullName.toLowerCase().includes(q)) ||
        (v.voterId && v.voterId.toLowerCase().includes(q))
    ).length;
    
    return matchesCount === 0;
  }, [searchQuery, voters]);

  // Clear query resets search layout
  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedVoter(null);
    setShowSuggestions(false);
  };

  // Calculate distinct grouped address segments
  const addressGroups = useMemo((): AddressGroup[] => {
    const segments: { [key: string]: Voter[] } = {};
    
    voters.forEach(voter => {
      const rawAddr = voter.address || "Unspecified Registered Location";
      const key = rawAddr.trim();
      if (!segments[key]) {
        segments[key] = [];
      }
      segments[key].push(voter);
    });

    return Object.keys(segments).map(addr => ({
      address: addr,
      voters: segments[addr],
      totalVoters: segments[addr].length
    })).sort((a, b) => b.totalVoters - a.totalVoters); // Largest residential clusters first
  }, [voters]);

  // Statistics summaries
  const totalRegisteredCount = voters.length;
  const totalAddressesCount = addressGroups.length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased text-slate-800 selection:bg-slate-900/10 selection:text-slate-900">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-white border border-slate-200/85 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden"
          id="password-gate-container"
        >
          {/* Top Decorative accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-900" />
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-slate-100 p-4 rounded-2xl text-slate-800 mb-6 border border-slate-200/50 shadow-inner">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              Access Control Verification
            </h1>
            <p className="text-sm text-slate-500 mt-2.5 max-w-xs leading-relaxed">
              Unlock the public voter database registry by entering the municipal access passcode below.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="registry-passcode" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Registry Passcode
              </label>
              <div className="relative">
                <input
                  id="registry-passcode"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  disabled={isVerifying}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  className="w-full bg-slate-50 text-slate-900 pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-base outline-none tracking-widest font-mono disabled:opacity-60"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-50 border border-rose-105 rounded-xl px-4 py-3 text-xs text-rose-700 flex items-start gap-2"
                id="login-error-alert"
              >
                <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span className="font-semibold leading-normal">{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer disabled:cursor-not-allowed mt-2"
              id="submit-auth-btn"
            >
              {isVerifying ? 'Verifying Passcode...' : 'Verify & Enter Registry'}
            </button>
          </form>

          {/* Footer branding */}
          <div className="mt-8 text-center text-[11px] text-slate-400 font-medium tracking-wide">
            Brookside Municipality Civic Registry System
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dynamic Search & Auto Suggestions Section (At the very top) */}
        <div className="lg:col-span-12 flex flex-col gap-6">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-rose-950">Spreadsheet Fetch Alert</h4>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Search Registered Voter Database</h3>
                <p className="text-xs text-slate-400 mt-0.5">Type key parameters such as Full Name or unique Voter ID to extract information.</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <button
                  onClick={() => handleSync()}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-sky-400 rounded-lg border border-slate-800 transition-all shadow-sm ${loading ? 'animate-spin' : ''}`}
                  title="Sync Spreadsheet Database"
                  disabled={loading}
                  id="sync-btn"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Sync Records</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 transition-all shadow-sm"
                  title="Lock Database Access"
                  id="logout-btn"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Registry</span>
                </button>
              </div>
            </div>

            <div className="relative z-40">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-sky-500" />
                  ) : (
                    <Search className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    if (!e.target.value) {
                      setSelectedVoter(null);
                    }
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter Voter ID or official full name..."
                  className="w-full bg-slate-50 text-slate-900 pl-11 pr-10 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm md:text-base outline-none font-medium"
                  id="voter-search-input"
                />

                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-650"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown Container */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                    id="suggestions-dropdown"
                  >
                    <div className="px-4 py-2 border-b border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                      Matches Found
                    </div>
                    <ul className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                      {suggestions.map((v, idx) => (
                        <li
                          key={`${v.voterId || 'voter'}-${v.fullName || 'name'}-${idx}`}
                          onClick={() => selectVoterRecord(v)}
                          className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between text-xs md:text-sm"
                        >
                          <div className="flex items-center gap-2.5">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <div>
                              <p className="font-semibold text-slate-800 leading-snug">{v.fullName}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{v.address}</p>
                            </div>
                          </div>
                          <span className="font-mono bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded text-[10px] shrink-0 uppercase border border-slate-200/50">
                            {v.voterId}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Empty Match Alerts */}
            {hasNoMatches && (
              <div className="mt-4 bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-950">Voter Not Found</h4>
                  <p className="text-xs text-rose-700 mt-0.5">We couldn't locate any records matching "{searchQuery}". Keep typing or verify index accuracy.</p>
                </div>
              </div>
            )}

            {/* Database Sync Status Note */}
            {failedSources.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-slate-500">
                <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="text-xs leading-relaxed">
                  <span className="font-semibold text-slate-700">Database Source Notice: </span>
                  Successfully downloaded {DEFAULT_SHEETS.length - failedSources.length} sheets. 
                  Sources <span className="font-mono text-[10px] bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded text-amber-850 font-bold">#{failedSources.join(', #')}</span> are set to restricted access on Google Drive. 
                  <span className="text-slate-400 ml-1">To synchronize these, ensure they are shared publicly ("Anyone with the link can view").</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Left Side Content - Groupings (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Core Analytics Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-705 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Indexed Voters</p>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">{totalRegisteredCount}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-705 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Grouped Addresses</p>
                <p className="text-xl font-extrabold text-slate-900 mt-0.5">{totalAddressesCount}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-705 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Database Sync</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5 whitespace-nowrap truncate">
                  {DEFAULT_SHEETS.length - failedSources.length} / {DEFAULT_SHEETS.length} Loaded
                </p>
                {failedSources.length > 0 && (
                  <p className="text-[9px] font-bold text-amber-600 truncate mt-0.5">
                    {failedSources.length} restricted
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Active Voter Smart Card Display */}
          <AnimatePresence mode="wait">
            {selectedVoter ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm"
                id="selected-voter-wrapper"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <Fingerprint className="w-5 h-5 text-sky-600" />
                    <h3>Detailed Registration Record</h3>
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-650 flex items-center gap-1 hover:underline"
                  >
                    Clear View
                  </button>
                </div>

                <div className="flex justify-center w-full">
                  {/* Smart Card Styling */}
                  <div className="w-full max-w-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border border-slate-750 rounded-2xl overflow-hidden shadow-xl text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-700/50 mb-6">
                        <div>
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest mb-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Authorized Registered Voter
                          </span>
                          <h4 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                            {selectedVoter.fullName}
                          </h4>
                          <p className="text-xs text-sky-300 mt-1 flex items-center gap-1.5 font-medium">
                            <Landmark className="w-3.5 h-3.5 text-sky-400" /> Brookside Municipality Ward Roll
                          </p>
                        </div>
                        
                        <div className="bg-slate-800/85 border border-slate-700 rounded-xl px-4 py-2 text-right shrink-0">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">VOTER ID</span>
                          <span className="text-sm md:text-base font-bold font-mono text-white mt-1 block leading-none">
                            {selectedVoter.voterId}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Father's Name</p>
                          <p className="text-xs md:text-sm font-semibold text-slate-200 mt-1.5">{selectedVoter.fatherName}</p>
                        </div>
                        
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Mother's Name</p>
                          <p className="text-xs md:text-sm font-semibold text-slate-200 mt-1.5">{selectedVoter.motherName}</p>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" /> Date of Birth
                          </p>
                          <p className="text-xs md:text-sm font-semibold text-slate-200 mt-1.5 leading-none">{selectedVoter.dateOfBirth}</p>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" /> Mobile Number
                          </p>
                          <p className="text-xs md:text-sm font-mono font-semibold text-slate-200 mt-1.5 leading-none">
                            {selectedVoter.mobileNumber || "Not Provided"}
                          </p>
                        </div>

                        <div className="sm:col-span-2 bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-sky-500" /> Registered Residential Address
                          </p>
                          <p className="text-xs md:text-sm font-semibold text-slate-100 mt-2 leading-relaxed">
                            {selectedVoter.address}
                          </p>
                        </div>
                      </div>

                      {/* Decors: Barcode */}
                      <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col items-center sm:items-start">
                          <div className="h-7 w-44 bg-[repeating-linear-gradient(90deg,white,white_3px,black_3px,black_7px,white_7px,white_8px,black_8px,black_10px)] opacity-60 filter invert"></div>
                          <span className="text-[8px] font-mono text-slate-400 tracking-widest mt-1">ROLL_{selectedVoter.voterId.replace(/[^a-zA-Z0-9]/g, "")}</span>
                        </div>
                        <div className="text-[9px] text-slate-400 text-center sm:text-right font-medium max-w-[180px] leading-relaxed">
                          Certified Census Registrar Official Copy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Address Category Groupings (Neighborhood Boards) */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="text-sky-600 w-5 h-5 shrink-0" /> Address Groupings & Precincts ({totalAddressesCount})
                </h3>
                <p className="text-xs text-slate-400 mt-1">Automatic grouping of co-residents sorted by shared physical addresses.</p>
              </div>
              <span className="text-xs text-slate-400 font-semibold uppercase bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
                Sorted by Cluster Weight
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="address-precision-boards">
              {addressGroups.map((group, groupIdx) => (
                <div
                  key={`${group.address || 'addr'}-${groupIdx}`}
                  className="bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm p-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header Address badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1 flex-1 overflow-hidden">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="text-[11px] font-bold text-slate-700 truncate block">
                          {group.address}
                        </span>
                      </div>
                      <span className="bg-sky-50 text-sky-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md shrink-0 block leading-tight">
                        {group.totalVoters} {group.totalVoters === 1 ? 'Voter' : 'Voters'}
                      </span>
                    </div>

                    {/* Neighborhood Roster */}
                    <ul className="divide-y divide-slate-100 mb-4 max-h-40 overflow-y-auto pr-1">
                      {group.voters.map((v, idx) => {
                        const isMatchActive = selectedVoter?.voterId === v.voterId;
                        return (
                          <li
                            key={`${v.voterId || 'voter'}-${v.fullName || 'name'}-${idx}`}
                            className={`py-2 px-2 rounded-lg transition-all flex items-center justify-between gap-2 group ${isMatchActive ? 'bg-sky-50/50 border border-sky-100/80' : 'hover:bg-slate-100/50'}`}
                          >
                            <div className="overflow-hidden">
                              <p className={`text-xs font-bold truncate ${isMatchActive ? 'text-sky-700' : 'text-slate-800'}`}>
                                {v.fullName}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate uppercase">
                                ID: {v.voterId}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                selectVoterRecord(v);
                                window.scrollTo({ top: 180, behavior: 'smooth' });
                              }}
                              className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 border transition-all ${isMatchActive ? 'bg-sky-600 text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:border-sky-200'}`}
                            >
                              Select
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Content - FAQ Console (4 Cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">System Attributes</h4>
            
            <ul className="space-y-4 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <p><strong className="text-slate-800">Auto-Categorization</strong>: Inhabitants are instantly matched and consolidated under unified physical addresses for collective residential queries.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <p><strong className="text-slate-800">Typing Matchings</strong>: Continuous scanning provides autocomplete profiles on both full name spellings and alphanumeric registration IDs.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <p><strong className="text-slate-800">Verified Credentials</strong>: Displays only vetted, certified voter information loaded securely from our verified municipal ledger.</p>
              </li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Brookside Municipal Government Registry. All rights reserved.</p>
          <div className="flex gap-4 font-semibold text-sky-600">
            <a href="#top" className="hover:underline">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
