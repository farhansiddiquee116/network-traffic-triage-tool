# Network Traffic Triage Tool (Advanced Enterprise SOC Edition)
> **Educational SOC Analyst Platform & Global Threat Triage Engine**

An advanced, browser-based network traffic analysis, threat hunting, and incident triage platform. Designed for cybersecurity students, enthusiasts, and aspiring SOC analysts to learn how Tier-1/Tier-2 security operations center analysts detect sophisticated intrusions, map events to the **MITRE ATT&CK® Enterprise Framework**, inspect raw packet frames, visualize live network traffic on an interactive **Global Cyber Traffic Map**, and produce executive incident reports.

---

## 🔒 100% Local & Privacy-Preserving Architecture
* **Zero Remote Data Transmission:** All packet records, IP addresses, and payload headers are parsed directly in your web browser using client-side JavaScript.
* **Zero External Dependencies:** Built completely with vanilla HTML5, CSS3, and modern standard JavaScript (no React, no Node.js backend, no Python backend, no npm packages, and no external CDN scripts).
* **Zero Telemetry or Analytics:** No cookies, trackers, ads, or external cloud AI calls.
* **Air-Gapped & Offline Ready:** Runs completely offline without an internet connection.

```
+-------------------------------------------------------------------------+
|                           YOUR WEB BROWSER                              |
|                                                                         |
|  [Wireshark CSV]                                                        |
|         │                                                               |
|         ▼                                                               |
|  [FileReader API] ──► [RFC-4180 Parser] ──► [Triage & Threat Engine]    |
|                                                    │                    |
|         ┌──────────────────────────────────────────┼──────────────────┐ |
|         ▼                                          ▼                  ▼ |
|  [Graphic Traffic Map]                      [MITRE Triage]     [Packet Inspector]
|  (Global Flight Arcs)                       (Tactics & Badges) (Paginated Frames)
|         │                                          │                  │ |
|         └──────────────────────────────────────────┴──────────────────┘ |
|                                                    │                    |
|                                                    ▼                    |
|                                     [Executive SOC Incident Report]     |
+-------------------------------------------------------------------------+
         ▲
         │ (Zero data leaves your laptop)
```

---

## 🚀 How to Run Locally on Windows
No installation or programming setup is required:
1. Navigate to the `network-traffic-triage-tool` folder on your laptop.
2. Double-click **`index.html`** (or right-click &rarr; *Open with* &rarr; Microsoft Edge / Google Chrome / Firefox).
3. The dashboard opens immediately.
4. Click any of the **Test Mode** buttons to load demonstration data, or drag-and-drop your own exported Wireshark CSV file.

---

## 🌟 Advanced Features Overview

### 1. 🌍 GUI Graphic Network Traffic & Threat Map
* Replaces static topology diagrams with a real-time **Global Cyber Attack & Traffic Map** drawn on native HTML5 Canvas.
* **Animated Trajectory Arcs:** Curved flight paths connect communication origins to global destinations with glowing packet particles traveling along the arcs in real time.
* **Intelligent Threat Color-Coding:**
  - 🔵 **Cyan Origin Nodes:** Local private subnet assets (`192.168.x.x`, `10.x.x.x`).
  - 🟢 **Green External Nodes & Arcs:** Standard, benign web and cloud traffic.
  - 🔴 **Glowing Red Radar Pulses & Crimson Arcs:** Flagged threat vectors (C2 beaconing, port scanning, data exfiltration).
* **Live Threat Ticker & HUD:** Displays real-time counts of active geographic flows and a dynamic ticker streaming flagged threats.
* **Interactive Drill-Down:** Click any city or IP node on the map to filter the entire triage dashboard, alert feed, and raw packet table to that specific host!

### 2. 🛡️ MITRE ATT&CK® Enterprise Alignment
Every detection rule is mapped directly to official MITRE ATT&CK tactics and techniques:
* **T1046 — Network Service Discovery** (Port scanning, ping sweeps, SYN probing)
* **T1071.001 — Web Traffic Beaconing** (Periodic low-jitter heartbeats to C2 infrastructure)
* **T1071.004 — DNS Tunneling** (High-entropy, long subdomain strings used for exfiltration)
* **T1571 — Non-Standard Port Usage** (Communications over unconventional ports like 4444 or 8888)
* **T1048 — Exfiltration Over Alternative Protocol** (Disproportionate outbound data transfer bursts)

### 3. 🔍 Raw Packet Frame Inspector Grid
* A built-in, paginated Wireshark dissection table located directly below the alerts.
* Allows analysts to inspect raw frame numbers, relative arrival times, source/destination IPs, protocols, frame lengths, and full dissection strings.
* Clicking **"Inspect Packets"** on any alert card automatically filters and highlights the corresponding raw frames.

### 4. 📄 One-Click SOC Incident Triage Report Generator
* Click **"Export SOC Report"** in the toolbar to generate an executive-ready incident triage report:
  - Auto-generated Case Reference ID (e.g. `INC-20261005-4819`)
  - Incident Classification Level & Total Investigation Score
  - Executive Summary for management and recruiters
  - Affected Asset Inventory table
  - MITRE ATT&CK Matrix mapping table
  - Itemized Threat Evidence & Recommended Analyst Containment Checklist
  - Export options: **Copy Markdown** (for ticketing systems) or **Print / Save as PDF**.

---

## 🛡️ Detection Rules Catalog

| Rule | Detection Name | MITRE ATT&CK | Default Threshold | Why It Matters | Benign Explanation |
|---|---|---|---|---|---|
| **Rule 1** | **High Packet Volume** | `T1048.003` | `> 50 packets` | Disproportionate packet generation from a single host. | Large OS update, backup sync, streaming. |
| **Rule 2** | **Host / Subnet Discovery** | `T1046` | `> 10 unique destinations` | Rapid discovery sweeps across subnet address space. | Network inventory scanner, multicast discovery. |
| **Rule 3** | **Port Scanning** | `T1046` | `> 10 unique destination ports` | Probing multiple ports on a single host for open services. | Authorized vulnerability assessment, multi-service app. |
| **Rule 4** | **High ICMP Activity** | `T1046` | `> 30 ICMP packets` | Heavy ping volume characteristic of discovery sweeps. | Diagnostic ping, network monitoring tool (Nagios). |
| **Rule 5** | **High DNS Queries** | `T1071.004` | `> 30 DNS queries` | Rapid lookups indicating automated querying or crawling. | Complex media browsing with multiple CDNs. |
| **Rule 6** | **Repeated Communication** | `T1071` | `> 40 packets` | Sustained session between two specific endpoints. | Database query, SSH/RDP session, cloud backup. |
| **Rule 7** | **TCP SYN Heavy Activity** | `T1046` | `> 10 SYN requests` | Half-open connection requests without completed handshakes. | Offline server retry logic, aggressive client timeouts. |
| **Rule 8** | **Periodic C2 Beaconing** | `T1071.001` | `>= 5 pulses (Jitter < 0.6s)` | Regular periodic heartbeats to external infrastructure. | Software telemetry keep-alive, cloud sync polling. |
| **Rule 9** | **DNS Tunneling / Long Subdomain** | `T1071.004` | `Subdomain >= 25 chars` | Encoded data covertly embedded inside DNS query labels. | Antivirus cloud reputation lookup, CDN routing. |
| **Rule 10** | **Non-Standard Port Usage** | `T1571` | `Port in [4444, 1337, 8888...]` | Unusual services running across high/backdoor ports. | Developer test server, local microservice container. |
| **Rule 11** | **Asymmetric Data Exfiltration** | `T1048` | `> 12 KB outbound` | High volume of outbound bytes sent to external IPs. | User file upload, cloud drive synchronization. |

---

## 🎯 Explainable Investigation Scoring
Rather than producing a fake "97% malicious AI score", the tool computes an **itemized, transparent investigation score**:
* High packet volume: **+20 / +25 pts**
* Possible host discovery: **+25 pts**
* Possible port scanning: **+25 pts**
* High ICMP activity: **+15 pts**
* High DNS activity: **+10 pts**
* Repeated flow: **+10 pts**
* TCP SYN activity: **+15 pts**
* Periodic C2 Beaconing: **+30 pts**
* DNS Tunneling heuristic: **+25 pts**
* Non-Standard port usage: **+15 pts**
* Asymmetric outbound exfiltration: **+25 pts**

### Score Classifications:
* **0 pts:** *Normal Baseline Activity*
* **1 – 25 pts:** *Low Priority Observation*
* **26 – 59 pts:** *Elevated Activity Deserving Review*
* **60+ pts:** *High Investigative Priority (Potential APT / Incident)*

---

## 🧪 Demonstration Sample Datasets
The application includes four pre-packaged demonstration datasets located in `samples/`:

1. **`normal-traffic.csv`**: Benign web browsing, DNS queries, and ARP broadcasts. Generates **0 alerts** (Normal Baseline Activity).
2. **`high-volume-traffic.csv`**: Benign baseline traffic plus one workstation generating 65 packets to an internal server. Triggers **Rule 1 (High Packet Volume)**.
3. **`mixed-soc-lab.csv`**: Simulated lab scenario with host discovery across a subnet (35 ICMP pings), port scanning across 13 ports, and sustained application flows.
4. **`advanced-apt-lab.csv`**: Realistic 4-stage cyber intrusion scenario:
   - *Phase 1:* Port scanning (`192.168.1.105` probing ports 21–9999 on `192.168.1.200`)
   - *Phase 2:* Periodic C2 Beaconing heartbeats every 2.0 seconds to `203.0.113.88` on port 4444
   - *Phase 3:* DNS Tunneling data exfiltration with long encoded subdomains
   - *Phase 4:* Asymmetric outbound data exfiltration burst to external IP `203.0.113.99`

---

## 🎥 Recruiter & Video Walkthrough Guide
Demonstrate this tool to technical recruiters or video audiences using this 5-step narrative:

### Step 1: Baseline Demonstration (False Positive Avoidance)
* Click **Load Normal Sample**.
* Show that the score is **0 (Normal Baseline Activity)** and 0 alerts are triggered.
* Explain: *"In a real Security Operations Center, a tool that alerts on normal web traffic creates alert fatigue. Our baseline demonstrates clean discrimination."*

### Step 2: Global Cyber Traffic Map Demonstration
* Click **Load Advanced APT Scenario**.
* Point out the **Global Network Traffic & Threat Map**:
  - Show the local origin host in North America transmitting crimson curved arcs across the Pacific to Tokyo (C2 Beacon) and Singapore (Data Exfiltration).
  - Note the animated packet photons traveling along the arcs and the expanding threat radar rings.
  - Click on the Tokyo node to filter the entire dashboard to that threat flow.

### Step 3: MITRE ATT&CK Threat Mapping
* Scroll to the **Alerts Feed** and point out the MITRE badges:
  - `[T1046: Network Service Discovery]`
  - `[T1071.001: Web Traffic Beaconing]` (point out the exact 2.0s periodic pulse interval calculated from timestamps)
  - `[T1071.004: DNS Tunneling]`
  - `[T1048: Data Exfiltration]`
* Click **"Inspect Packets for 192.168.1.105"** on an alert card to jump straight to the raw frame table.

### Step 4: Executive SOC Incident Report Generation
* Click **"Export SOC Report"** in the toolbar.
* Show the professional incident brief with Case ID, classification, asset inventory, evidence table, and containment checklist.
* Demonstrate the **Copy Markdown** and **Print / Save as PDF** options.

### Step 5: The Core Cybersecurity Takeaway
* Reference the core educational lesson:
  > **"Detection tells an analyst where to look. Investigation determines what actually happened."**
* Emphasize the privacy design: *"All this analysis, geographic mapping, and threat detection happened 100% inside the browser with zero cloud dependencies or external data leaks."*
