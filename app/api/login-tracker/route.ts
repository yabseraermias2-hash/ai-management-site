import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_FILE = path.join(process.cwd(), "data", "login-records.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readRecords(): LoginRecord[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeRecords(records: LoginRecord[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export interface LoginRecord {
  id: string;
  email: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  isp: string;
  org: string;
  lat: number;
  lon: number;
  timezone: string;
  userAgent: string;
  browser: string;
  os: string;
  timestamp: string;
  success: boolean;
}

function parseUserAgent(ua: string): { browser: string; os: string } {
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, success = true } = body;

    // Extract IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    let ip = forwarded?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    // Normalize localhost
    if (ip === "::1" || ip === "127.0.0.1") ip = "127.0.0.1";

    const userAgent = request.headers.get("user-agent") || "";
    const { browser, os } = parseUserAgent(userAgent);

    // Geolocation via ip-api.com (free, no key needed)
    let geoData = {
      city: "Localhost",
      region: "Local",
      country: "Local",
      countryCode: "LO",
      isp: "Local Network",
      org: "Local",
      lat: 0,
      lon: 0,
      timezone: "Local",
    };

    if (ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${ip}?fields=status,city,regionName,country,countryCode,isp,org,lat,lon,timezone`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.status === "success") {
            geoData = {
              city: geo.city || "Unknown",
              region: geo.regionName || "Unknown",
              country: geo.country || "Unknown",
              countryCode: geo.countryCode || "XX",
              isp: geo.isp || "Unknown",
              org: geo.org || "Unknown",
              lat: geo.lat || 0,
              lon: geo.lon || 0,
              timezone: geo.timezone || "Unknown",
            };
          }
        }
      } catch {
        // Geo lookup failed, keep defaults
      }
    }

    const record: LoginRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      email: email || "unknown@nexusai.dev",
      ip,
      ...geoData,
      userAgent,
      browser,
      os,
      timestamp: new Date().toISOString(),
      success,
    };

    const records = readRecords();
    records.unshift(record); // newest first
    // Keep last 500 records
    writeRecords(records.slice(0, 500));

    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("[login-tracker] POST error:", err);
    return NextResponse.json({ error: "Failed to record login" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const records = readRecords();
    return NextResponse.json({ records });
  } catch {
    return NextResponse.json({ error: "Failed to read records" }, { status: 500 });
  }
}
