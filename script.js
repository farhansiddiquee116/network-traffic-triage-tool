/**
 * Network Traffic Triage Tool
 * Advanced Enterprise SOC Edition - Pure Vanilla JavaScript Engine
 * GUI Graphic Network Traffic on Map & Threat Triage Engine
 * 100% Client-Side In-Browser Execution - Zero External APIs - Zero Telemetry
 */

// Embedded Safe Sample Datasets (Guarantees instant 1-click loading without file:// CORS restrictions)
const EMBEDDED_SAMPLES = {
  normal: `"No.","Time","Source","Destination","Protocol","Length","Info"
"1","0.000000","192.168.1.15","192.168.1.1","DNS","78","Standard query 0x1a2b A router.local"
"2","0.001200","192.168.1.1","192.168.1.15","DNS","94","Standard query response 0x1a2b A router.local A 192.168.1.1"
"3","0.045000","192.168.1.15","93.184.216.34","TCP","66","52341 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460"
"4","0.065000","93.184.216.34","192.168.1.15","TCP","66","80 → 52341 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0"
"5","0.065200","192.168.1.15","93.184.216.34","TCP","54","52341 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0"
"6","0.070000","192.168.1.15","93.184.216.34","HTTP","420","GET /index.html HTTP/1.1"
"7","0.092000","93.184.216.34","192.168.1.15","HTTP","850","HTTP/1.1 200 OK (text/html)"
"8","0.093000","192.168.1.15","93.184.216.34","TCP","54","52341 → 80 [ACK] Seq=367 Ack=797 Win=63443 Len=0"
"9","0.120000","192.168.1.15","93.184.216.34","TCP","54","52341 → 80 [FIN, ACK] Seq=367 Ack=797 Win=63443 Len=0"
"10","0.141000","93.184.216.34","192.168.1.15","TCP","54","80 → 52341 [FIN, ACK] Seq=797 Ack=368 Win=65535 Len=0"
"11","0.141200","192.168.1.15","93.184.216.34","TCP","54","52341 → 80 [ACK] Seq=368 Ack=798 Win=63443 Len=0"
"12","0.300000","192.168.1.20","1.1.1.1","DNS","74","Standard query 0x3f12 A news.example.org"
"13","0.325000","1.1.1.1","192.168.1.20","DNS","90","Standard query response 0x3f12 A news.example.org A 198.51.100.10"
"14","0.350000","192.168.1.20","198.51.100.10","TLSv1.3","517","Client Hello"
"15","0.380000","198.51.100.10","192.168.1.20","TLSv1.3","1420","Server Hello, Change Cipher Spec, Application Data"
"16","0.385000","192.168.1.20","198.51.100.10","TLSv1.3","120","Change Cipher Spec, Application Data"
"17","0.400000","198.51.100.10","192.168.1.20","TLSv1.3","1380","Application Data"
"18","0.405000","192.168.1.20","198.51.100.10","TCP","54","54312 → 443 [ACK] Seq=584 Ack=2744 Win=64128 Len=0"
"19","1.200000","192.168.1.1","192.168.1.255","UDP","128","5678 → 5678 Len=86"
"20","2.000000","192.168.1.30","192.168.1.1","ARP","42","Who has 192.168.1.1? Tell 192.168.1.30"
"21","2.000500","192.168.1.1","192.168.1.30","ARP","42","192.168.1.1 is at 00:11:22:33:44:55"
"22","3.100000","192.168.1.15","8.8.8.8","DNS","70","Standard query 0x7a8b A time.cloudflare.com"
"23","3.125000","8.8.8.8","192.168.1.15","DNS","86","Standard query response 0x7a8b A 162.159.200.1"
"24","4.000000","192.168.1.15","162.159.200.1","NTP","90","NTP Version 4, client, poll 6"
"25","4.025000","162.159.200.1","192.168.1.15","NTP","90","NTP Version 4, server, poll 6"`,

  highVolume: `"No.","Time","Source","Destination","Protocol","Length","Info"
"1","0.000000","192.168.1.10","192.168.1.1","DNS","74","Standard query 0x1111 A gateway.corp"
"2","0.002000","192.168.1.1","192.168.1.10","DNS","90","Standard query response 0x1111 A 192.168.1.1"
"3","0.010000","192.168.1.50","10.0.0.12","TCP","66","49152 → 9000 [SYN] Seq=0 Win=65535 Len=0 MSS=1460"
"4","0.012000","10.0.0.12","192.168.1.50","TCP","66","9000 → 49152 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0"
"5","0.012100","192.168.1.50","10.0.0.12","TCP","54","49152 → 9000 [ACK] Seq=1 Ack=1 Win=65535 Len=0"
` + Array.from({ length: 60 }, (_, i) => 
  `"${i + 6}","${(0.015 + i * 0.001).toFixed(6)}","192.168.1.50","10.0.0.12","TCP","1514","49152 → 9000 [ACK] [TCP segment of a reassembled PDU]"`
).join('\n') + `\n"66","0.080000","10.0.0.12","192.168.1.50","TCP","54","9000 → 49152 [ACK] Seq=1 Ack=97241 Win=65535 Len=0"`,

  mixedLab: `"No.","Time","Source","Destination","Protocol","Length","Info"
"1","0.000000","192.168.1.10","192.168.1.1","DNS","74","Standard query 0x1001 A intranet.local"
"2","0.001000","192.168.1.1","192.168.1.10","DNS","90","Standard query response 0x1001 A 192.168.1.20"
"3","0.010000","192.168.1.10","192.168.1.20","TCP","66","51234 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460"
"4","0.011000","192.168.1.20","192.168.1.10","TCP","66","80 → 51234 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0"
"5","0.011200","192.168.1.10","192.168.1.20","TCP","54","51234 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0"
"6","0.015000","192.168.1.10","192.168.1.20","HTTP","350","GET /dashboard HTTP/1.1"
"7","0.020000","192.168.1.20","192.168.1.10","HTTP","1200","HTTP/1.1 200 OK (text/html)"
` + Array.from({ length: 35 }, (_, i) => 
  `"${i + 8}","${(0.050 + i * 0.001).toFixed(6)}","192.168.1.88","10.0.0.${i + 1}","ICMP","74","Echo (ping) request  id=0x0001, seq=${i + 1}/256, ttl=64"`
).join('\n') + `\n` + Array.from({ length: 45 }, (_, i) => 
  `"${i + 43}","${(0.100 + i * 0.001).toFixed(6)}","192.168.1.45","172.16.5.20","TCP","1420","58900 → 443 [ACK] Application Data"`
).join('\n') + `\n` + [21, 22, 23, 25, 53, 80, 110, 139, 143, 443, 445, 3389, 8080].map((port, i) => 
  `"${i + 88}","${(0.200 + i * 0.001).toFixed(6)}","192.168.1.99","192.168.1.200","TCP","66","4100${i} → ${port} [SYN] Seq=0 Win=1024 Len=0 MSS=1460"`
).join('\n'),

  advancedApt: `"No.","Time","Source","Destination","Protocol","Length","Info"
"1","0.000000","192.168.1.105","192.168.1.200","TCP","66","41001 → 21 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"2","0.010000","192.168.1.105","192.168.1.200","TCP","66","41002 → 22 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"3","0.020000","192.168.1.105","192.168.1.200","TCP","66","41003 → 80 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"4","0.030000","192.168.1.105","192.168.1.200","TCP","66","41004 → 443 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"5","0.040000","192.168.1.105","192.168.1.200","TCP","66","41005 → 445 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"6","0.050000","192.168.1.105","192.168.1.200","TCP","66","41006 → 3389 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"7","0.060000","192.168.1.105","192.168.1.200","TCP","66","41007 → 4444 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"8","0.070000","192.168.1.105","192.168.1.200","TCP","66","41008 → 8080 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"9","0.080000","192.168.1.105","192.168.1.200","TCP","66","41009 → 8443 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"10","0.090000","192.168.1.105","192.168.1.200","TCP","66","41010 → 9000 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"11","0.100000","192.168.1.105","192.168.1.200","TCP","66","41011 → 9999 [SYN] Seq=0 Win=1024 Len=0 MSS=1460"
"12","1.000000","192.168.1.105","203.0.113.88","TCP","74","53210 → 4444 [SYN] Seq=0 Win=64240 Len=0 MSS=1460"
"13","1.020000","203.0.113.88","192.168.1.105","TCP","74","4444 → 53210 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0"
"14","1.021000","192.168.1.105","203.0.113.88","TCP","60","53210 → 4444 [ACK] Seq=1 Ack=1 Win=64240 Len=0"
"15","1.050000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"16","3.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"17","5.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"18","7.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"19","9.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"20","11.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"21","13.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"22","15.000000","192.168.1.105","203.0.113.88","HTTP","180","POST /heartbeat HTTP/1.1 (id=wkst-105-alive)"
"23","15.500000","192.168.1.105","192.168.1.1","DNS","125","Standard query 0x4a11 TXT a8f930e42d7b1a99c0e2b4f7a192.tunnel.c2domain.net"
"24","15.550000","192.168.1.105","192.168.1.1","DNS","125","Standard query 0x4a12 TXT 99b31d044e1c2a88d1f0a3e5b611.tunnel.c2domain.net"
"25","15.600000","192.168.1.105","192.168.1.1","DNS","125","Standard query 0x4a13 TXT d4c2a1e0b5f89921c3d4e7a8b901.tunnel.c2domain.net"
"26","15.650000","192.168.1.105","192.168.1.1","DNS","125","Standard query 0x4a14 TXT f0e1d2c3b4a5968778695a4b3c2d.tunnel.c2domain.net"
"27","16.000000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 1/15"
"28","16.001000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 2/15"
"29","16.002000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 3/15"
"30","16.003000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 4/15"
"31","16.004000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 5/15"
"32","16.005000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 6/15"
"33","16.006000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 7/15"
"34","16.007000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 8/15"
"35","16.008000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 9/15"
"36","16.009000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 10/15"
"37","16.010000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 11/15"
"38","16.011000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 12/15"
"39","16.012000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 13/15"
"40","16.013000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 14/15"
"41","16.014000","192.168.1.105","203.0.113.99","TCP","1514","54120 → 8888 [ACK] Exfil Chunk payload block 15/15"
"42","16.050000","203.0.113.99","192.168.1.105","TCP","60","8888 → 54120 [ACK] Seq=1 Ack=22711 Win=65535 Len=0"
"43","17.000000","192.168.1.10","192.168.1.1","DNS","74","Standard query 0x1111 A google.com"
"44","17.005000","192.168.1.1","192.168.1.10","DNS","90","Standard query response 0x1111 A 142.250.190.46"
"45","17.100000","192.168.1.10","142.250.190.46","TLSv1.3","517","Client Hello"
"46","17.130000","142.250.190.46","192.168.1.10","TLSv1.3","1420","Server Hello, Application Data"
"47","17.135000","192.168.1.10","142.250.190.46","TCP","54","58921 → 443 [ACK] Seq=584 Ack=2744 Win=64128 Len=0"
"48","18.000000","192.168.1.1","192.168.1.255","UDP","128","5678 → 5678 Len=86"
"49","19.000000","192.168.1.30","192.168.1.1","ARP","42","Who has 192.168.1.1? Tell 192.168.1.30"
"50","19.001000","192.168.1.1","192.168.1.30","ARP","42","192.168.1.1 is at 00:11:22:33:44:55"`
};

// Global App State
const DEFAULT_THRESHOLDS = {
  packetsPerSource: 50,
  uniqueDestinations: 10,
  uniquePorts: 10,
  icmpPackets: 30,
  dnsPackets: 30,
  repeatedPackets: 40,
  synHeavyCount: 10,
  dnsSubdomainLen: 25,
  exfilBytes: 12000,
  nonStandardPorts: [4444, 1337, 8888, 6667, 9999]
};

const appState = {
  thresholds: { ...DEFAULT_THRESHOLDS },
  currentRawData: null,
  currentFilename: "",
  isDemo: false,
  parsedPackets: [],
  analysisSummary: null,
  alerts: [],
  filters: {
    source: "",
    destination: "",
    protocol: "",
    severity: "",
    mitre: "",
    search: ""
  },
  inspector: {
    currentPage: 1,
    pageSize: 25,
    filteredPackets: []
  },
  // Geographic Traffic Map State
  geoMap: {
    nodes: [],
    flows: [],
    hoveredNode: null,
    selectedNode: null,
    animFrameId: null,
    time: 0
  }
};

// DOM Elements
const dom = {
  fileInput: document.getElementById("file-input"),
  dropzone: document.getElementById("dropzone"),
  fileBanner: document.getElementById("file-status-banner"),
  fileName: document.getElementById("file-name"),
  fileMeta: document.getElementById("file-meta"),
  statusBadge: document.getElementById("status-badge"),
  missingWarning: document.getElementById("missing-warning"),
  dashboard: document.getElementById("dashboard-section"),
  alertsContainer: document.getElementById("alerts-container"),
  alertsCountBadge: document.getElementById("alerts-count-badge"),
  scoreNumber: document.getElementById("score-number"),
  scoreTitle: document.getElementById("score-title"),
  scoreDesc: document.getElementById("score-desc"),
  scorePills: document.getElementById("score-pills"),
  // Filter elements
  filterSource: document.getElementById("filter-source"),
  filterDest: document.getElementById("filter-dest"),
  filterProtocol: document.getElementById("filter-protocol"),
  filterSeverity: document.getElementById("filter-severity"),
  filterMitre: document.getElementById("filter-mitre"),
  filterSearch: document.getElementById("filter-search"),
  btnClearFilters: document.getElementById("btn-clear-filters"),
  btnExportReport: document.getElementById("btn-export-report"),
  // Settings
  settingsSection: document.getElementById("settings-section"),
  settingsHeader: document.getElementById("settings-header"),
  btnResetThresholds: document.getElementById("btn-reset-thresholds"),
  // Metric elements
  metricTotalPackets: document.getElementById("metric-total-packets"),
  metricUniqueSources: document.getElementById("metric-unique-sources"),
  metricUniqueDests: document.getElementById("metric-unique-dests"),
  metricActiveSource: document.getElementById("metric-active-source"),
  metricActiveDest: document.getElementById("metric-active-dest"),
  metricTopProto: document.getElementById("metric-top-proto"),
  metricAvgLen: document.getElementById("metric-avg-len"),
  // Breakdown bars
  sourcesBarList: document.getElementById("sources-bar-list"),
  destsBarList: document.getElementById("dests-bar-list"),
  protocolBarList: document.getElementById("protocol-bar-list"),
  // Graphic Network Traffic Map
  trafficMapCanvas: document.getElementById("traffic-map-canvas"),
  mapTooltip: document.getElementById("map-tooltip"),
  mapFlowsCount: document.getElementById("map-flows-count"),
  mapThreatsCount: document.getElementById("map-threats-count"),
  mapTickerText: document.getElementById("map-ticker-text"),
  btnResetGeomap: document.getElementById("btn-reset-geomap"),
  // Inspector
  packetTableBody: document.getElementById("packet-table-body"),
  packetCountBadge: document.getElementById("packet-count-badge"),
  paginationInfo: document.getElementById("pagination-info"),
  btnPrevPage: document.getElementById("btn-prev-page"),
  btnNextPage: document.getElementById("btn-next-page"),
  // Report Modal
  reportModal: document.getElementById("report-modal"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  reportPreviewText: document.getElementById("report-preview-text"),
  btnCopyReport: document.getElementById("btn-copy-report"),
  btnPrintReport: document.getElementById("btn-print-report")
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  bindThresholdInputs();
  initTrafficMap();
});

// Event Listeners Setup
function setupEventListeners() {
  if (dom.dropzone) {
    dom.dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dom.dropzone.classList.add("dragover");
    });

    dom.dropzone.addEventListener("dragleave", () => {
      dom.dropzone.classList.remove("dragover");
    });

    dom.dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dom.dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    });

    dom.fileInput?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
      }
    });
  }

  // Demo Load Buttons
  document.getElementById("btn-demo-normal")?.addEventListener("click", () => {
    loadSample("normal", "normal-traffic.csv");
  });

  document.getElementById("btn-demo-high")?.addEventListener("click", () => {
    loadSample("highVolume", "high-volume-traffic.csv");
  });

  document.getElementById("btn-demo-mixed")?.addEventListener("click", () => {
    loadSample("mixedLab", "mixed-soc-lab.csv");
  });

  document.getElementById("btn-demo-apt")?.addEventListener("click", () => {
    loadSample("advancedApt", "advanced-apt-lab.csv");
  });

  // Settings Accordion
  dom.settingsHeader?.addEventListener("click", () => {
    dom.settingsSection.classList.toggle("open");
  });

  // Reset Thresholds Button
  dom.btnResetThresholds?.addEventListener("click", () => {
    appState.thresholds = { ...DEFAULT_THRESHOLDS };
    bindThresholdInputs();
    showToast("Settings reset to educational defaults");
    if (appState.parsedPackets.length > 0) {
      runTriageEngine();
    }
  });

  // Filter Listeners
  [dom.filterSource, dom.filterDest, dom.filterProtocol, dom.filterSeverity, dom.filterMitre].forEach(el => {
    el?.addEventListener("change", () => {
      updateFilterState();
      renderAlerts();
      updateInspectorPackets();
    });
  });

  dom.filterSearch?.addEventListener("input", () => {
    updateFilterState();
    renderAlerts();
    updateInspectorPackets();
  });

  dom.btnClearFilters?.addEventListener("click", () => {
    dom.filterSource.value = "";
    dom.filterDest.value = "";
    dom.filterProtocol.value = "";
    dom.filterSeverity.value = "";
    if (dom.filterMitre) dom.filterMitre.value = "";
    dom.filterSearch.value = "";
    appState.geoMap.selectedNode = null;
    updateFilterState();
    renderAlerts();
    updateInspectorPackets();
  });

  // Reset Map View
  dom.btnResetGeomap?.addEventListener("click", () => {
    appState.geoMap.selectedNode = null;
    dom.filterSource.value = "";
    updateFilterState();
    renderAlerts();
    updateInspectorPackets();
    showToast("Traffic Map view reset");
  });

  // Inspector Pagination
  dom.btnPrevPage?.addEventListener("click", () => {
    if (appState.inspector.currentPage > 1) {
      appState.inspector.currentPage--;
      renderInspectorTable();
    }
  });

  dom.btnNextPage?.addEventListener("click", () => {
    const totalPages = Math.ceil(appState.inspector.filteredPackets.length / appState.inspector.pageSize);
    if (appState.inspector.currentPage < totalPages) {
      appState.inspector.currentPage++;
      renderInspectorTable();
    }
  });

  // Export Report Modal Listeners
  dom.btnExportReport?.addEventListener("click", () => {
    generateSocReport();
    dom.reportModal.classList.remove("hidden");
  });

  dom.btnCloseModal?.addEventListener("click", () => {
    dom.reportModal.classList.add("hidden");
  });

  dom.reportModal?.addEventListener("click", (e) => {
    if (e.target === dom.reportModal) {
      dom.reportModal.classList.add("hidden");
    }
  });

  dom.btnCopyReport?.addEventListener("click", () => {
    const text = dom.reportPreviewText.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast("SOC Markdown Report copied to clipboard!");
    }).catch(() => {
      showToast("Unable to copy to clipboard.");
    });
  });

  dom.btnPrintReport?.addEventListener("click", () => {
    window.print();
  });
}

function updateFilterState() {
  appState.filters.source = dom.filterSource.value;
  appState.filters.destination = dom.filterDest.value;
  appState.filters.protocol = dom.filterProtocol.value;
  appState.filters.severity = dom.filterSeverity.value;
  appState.filters.mitre = dom.filterMitre ? dom.filterMitre.value : "";
  appState.filters.search = dom.filterSearch.value.trim().toLowerCase();
}

function bindThresholdInputs() {
  const map = {
    "th-packets-per-source": "packetsPerSource",
    "th-unique-dests": "uniqueDestinations",
    "th-unique-ports": "uniquePorts",
    "th-icmp-packets": "icmpPackets",
    "th-dns-packets": "dnsPackets",
    "th-repeated-packets": "repeatedPackets",
    "th-dns-subdomain-len": "dnsSubdomainLen",
    "th-exfil-bytes": "exfilBytes"
  };

  for (const [id, key] of Object.entries(map)) {
    const input = document.getElementById(id);
    if (input) {
      input.value = appState.thresholds[key];
      input.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) {
          appState.thresholds[key] = val;
          if (appState.parsedPackets.length > 0) {
            runTriageEngine();
          }
        }
      };
    }
  }
}

function handleFileUpload(file) {
  if (!file) return;

  if (!file.name.toLowerCase().endsWith(".csv") && file.type && !file.type.includes("csv") && !file.type.includes("text")) {
    showMissingWarning("Warning: The uploaded file does not have a .csv extension. Attempting to parse as CSV text.");
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    processCSVContent(content, file.name, false);
  };
  reader.onerror = () => {
    showMissingWarning("Error: Could not read the selected file from disk.");
  };
  reader.readAsText(file);
}

function loadSample(key, filename) {
  const csvText = EMBEDDED_SAMPLES[key];
  if (csvText) {
    processCSVContent(csvText, filename, true);
  }
}

// RFC-4180 Compliant Robust CSV Parser
function parseCSV(text) {
  const lines = [];
  let row = [""];
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
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      if (row.length > 1 || row[0] !== '') {
        lines.push(row);
      }
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }

  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }

  return lines;
}

function resolveColumnIndices(headers) {
  const normalized = headers.map(h => h.trim().toLowerCase().replace(/['"]/g, ''));

  const findIndex = (aliases) => {
    return normalized.findIndex(header => aliases.some(alias => header === alias || header.startsWith(alias)));
  };

  return {
    source: findIndex(["source", "src", "ip.src", "source address", "src_ip", "source ip"]),
    destination: findIndex(["destination", "dst", "ip.dst", "destination address", "dst_ip", "destination ip"]),
    protocol: findIndex(["protocol", "proto", "highest protocol", "ip.proto"]),
    length: findIndex(["length", "len", "packet length", "frame length", "frame.len"]),
    info: findIndex(["info", "description", "summary", "packet info", "info column"]),
    time: findIndex(["time", "timestamp", "frame.time_relative", "time relative"]),
    no: findIndex(["no.", "no", "packet", "frame.number", "number"])
  };
}

function processCSVContent(csvText, filename, isDemo) {
  hideMissingWarning();
  appState.currentRawData = csvText;
  appState.currentFilename = filename;
  appState.isDemo = isDemo;

  if (!csvText || !csvText.trim()) {
    showMissingWarning("The selected file is completely empty.");
    return;
  }

  const rawRows = parseCSV(csvText);
  if (rawRows.length < 2) {
    showMissingWarning("The CSV file does not contain enough rows. A header row and at least one data packet row are required.");
    return;
  }

  const headerRow = rawRows[0];
  const colMap = resolveColumnIndices(headerRow);

  if (colMap.source === -1) {
    showMissingWarning("This CSV does not appear to contain a Source address column. Analysis cannot proceed without source identifiers.");
    return;
  }

  if (colMap.destination === -1) {
    showMissingWarning("Notice: Destination column was not detected. Detections related to destinations or scanning will be limited.");
  }

  const packets = [];

  for (let i = 1; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (row.length === 1 && row[0].trim() === '') continue;

    const source = (colMap.source !== -1 && row[colMap.source]) ? row[colMap.source].trim() : "Unknown";
    const destination = (colMap.destination !== -1 && row[colMap.destination]) ? row[colMap.destination].trim() : "Broadcast/Unknown";
    const protocol = (colMap.protocol !== -1 && row[colMap.protocol]) ? row[colMap.protocol].trim() : "Unknown";
    const lengthVal = (colMap.length !== -1 && row[colMap.length]) ? parseInt(row[colMap.length].trim(), 10) : 0;
    const length = isNaN(lengthVal) ? 0 : lengthVal;
    const info = (colMap.info !== -1 && row[colMap.info]) ? row[colMap.info].trim() : "";
    
    let timeNum = 0;
    if (colMap.time !== -1 && row[colMap.time]) {
      const parsedTime = parseFloat(row[colMap.time].trim());
      if (!isNaN(parsedTime)) timeNum = parsedTime;
    }
    const time = (colMap.time !== -1 && row[colMap.time]) ? row[colMap.time].trim() : String(i);
    const no = (colMap.no !== -1 && row[colMap.no]) ? row[colMap.no].trim() : String(i);

    let destPort = null;
    let srcPort = null;
    if (info) {
      const portPair = info.match(/(\d{1,5})\s*(?:→|->)\s*(\d{1,5})/);
      if (portPair) {
        srcPort = parseInt(portPair[1], 10);
        destPort = parseInt(portPair[2], 10);
      } else {
        const destOnly = info.match(/(?:→|->)\s*(\d{1,5})/) || info.match(/:\s*(\d{1,5})/);
        if (destOnly) {
          const p = parseInt(destOnly[1], 10);
          if (p > 0 && p <= 65535) destPort = p;
        }
      }
    }

    packets.push({
      no,
      time,
      timeNum,
      source,
      destination,
      protocol,
      length,
      info,
      srcPort,
      destPort
    });
  }

  if (packets.length === 0) {
    showMissingWarning("No valid packet rows were extracted from the CSV file.");
    return;
  }

  appState.parsedPackets = packets;

  updateFileBanner(filename, packets.length, isDemo);
  populateFilterOptions(packets);
  runTriageEngine();
}

function updateFileBanner(filename, packetCount, isDemo) {
  dom.fileBanner?.classList.remove("hidden");
  if (dom.fileName) dom.fileName.textContent = filename;
  if (dom.fileMeta) dom.fileMeta.textContent = `${packetCount.toLocaleString()} packets successfully parsed in-browser`;

  if (dom.statusBadge) {
    if (isDemo) {
      dom.statusBadge.textContent = "Demo Data";
      dom.statusBadge.className = "status-badge demo";
    } else {
      dom.statusBadge.textContent = "Local File";
      dom.statusBadge.className = "status-badge custom";
    }
  }
}

function populateFilterOptions(packets) {
  const sources = new Set();
  const destinations = new Set();
  const protocols = new Set();

  packets.forEach(p => {
    if (p.source) sources.add(p.source);
    if (p.destination) destinations.add(p.destination);
    if (p.protocol) protocols.add(p.protocol);
  });

  populateSelect(dom.filterSource, Array.from(sources).sort());
  populateSelect(dom.filterDest, Array.from(destinations).sort());
  populateSelect(dom.filterProtocol, Array.from(protocols).sort());
}

function populateSelect(selectEl, values) {
  if (!selectEl) return;
  const currentVal = selectEl.value;
  selectEl.innerHTML = '<option value="">All</option>';
  values.forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    selectEl.appendChild(opt);
  });
  if (values.includes(currentVal)) {
    selectEl.value = currentVal;
  }
}

function isPrivateIP(ip) {
  if (!ip) return false;
  if (ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("127.")) return true;
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    const second = parseInt(parts[1], 10);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

// Core Triage Engine: Aggregations & Advanced Detection Rules (Rules 1-11)
function runTriageEngine() {
  const packets = appState.parsedPackets;
  if (!packets || packets.length === 0) return;

  const sourceCounts = {};
  const destCounts = {};
  const protocolCounts = {};
  const sourceToDests = {};
  const sourceToPorts = {};
  const sourceDestPairs = {};
  const sourceIcmpCounts = {};
  const sourceDnsCounts = {};
  const sourceSynCounts = {};
  const sourceOutboundBytes = {};
  const flowTimeHistories = {};
  const suspiciousDnsQueries = [];
  const nonStandardPortFlows = [];

  let totalLength = 0;
  let lengthCount = 0;

  packets.forEach(p => {
    sourceCounts[p.source] = (sourceCounts[p.source] || 0) + 1;
    destCounts[p.destination] = (destCounts[p.destination] || 0) + 1;
    sourceOutboundBytes[p.source] = (sourceOutboundBytes[p.source] || 0) + (p.length || 0);

    const rawProto = (p.protocol || "Other").toUpperCase();
    let protoKey = rawProto;
    if (rawProto.includes("TLS") || rawProto.includes("SSL") || rawProto === "HTTPS") {
      protoKey = "HTTPS/TLS";
    } else if (rawProto === "HTTP") {
      protoKey = "HTTP";
    } else if (rawProto === "DNS") {
      protoKey = "DNS";
    } else if (rawProto === "ICMP" || rawProto === "ICMPV6") {
      protoKey = "ICMP";
    } else if (rawProto === "ARP") {
      protoKey = "ARP";
    } else if (rawProto === "TCP") {
      protoKey = "TCP";
    } else if (rawProto === "UDP") {
      protoKey = "UDP";
    }
    protocolCounts[protoKey] = (protocolCounts[protoKey] || 0) + 1;

    if (!sourceToDests[p.source]) sourceToDests[p.source] = new Set();
    sourceToDests[p.source].add(p.destination);

    if (p.destPort) {
      const pairKey = `${p.source} -> ${p.destination}`;
      if (!sourceToPorts[pairKey]) sourceToPorts[pairKey] = new Set();
      sourceToPorts[pairKey].add(p.destPort);
    }

    const pairFlowKey = `${p.source}::${p.destination}`;
    if (!sourceDestPairs[pairFlowKey]) {
      sourceDestPairs[pairFlowKey] = {
        source: p.source,
        destination: p.destination,
        count: 0,
        bytes: 0,
        protocols: {}
      };
    }
    sourceDestPairs[pairFlowKey].count++;
    sourceDestPairs[pairFlowKey].bytes += (p.length || 0);
    sourceDestPairs[pairFlowKey].protocols[p.protocol] = (sourceDestPairs[pairFlowKey].protocols[p.protocol] || 0) + 1;

    if (!flowTimeHistories[pairFlowKey]) flowTimeHistories[pairFlowKey] = [];
    flowTimeHistories[pairFlowKey].push(p.timeNum);

    if (protoKey === "ICMP") {
      sourceIcmpCounts[p.source] = (sourceIcmpCounts[p.source] || 0) + 1;
    }

    if (protoKey === "DNS") {
      sourceDnsCounts[p.source] = (sourceDnsCounts[p.source] || 0) + 1;

      if (p.info) {
        const domainMatch = p.info.match(/(?:A|AAAA|TXT|CNAME|PTR)\s+([a-zA-Z0-9_\-\.]+)/i);
        if (domainMatch) {
          const domain = domainMatch[1];
          const subdomains = domain.split(".");
          if (subdomains[0] && subdomains[0].length >= appState.thresholds.dnsSubdomainLen) {
            suspiciousDnsQueries.push({
              source: p.source,
              destination: p.destination,
              query: domain,
              labelLength: subdomains[0].length,
              time: p.time
            });
          }
        }
      }
    }

    if (p.info && p.info.includes("[SYN]") && !p.info.includes("[SYN, ACK]")) {
      sourceSynCounts[p.source] = (sourceSynCounts[p.source] || 0) + 1;
    }

    if (p.destPort && appState.thresholds.nonStandardPorts.includes(p.destPort)) {
      nonStandardPortFlows.push({
        source: p.source,
        destination: p.destination,
        port: p.destPort,
        proto: p.protocol,
        info: p.info
      });
    }

    if (p.length > 0) {
      totalLength += p.length;
      lengthCount++;
    }
  });

  const uniqueSources = Object.keys(sourceCounts);
  const uniqueDests = Object.keys(destCounts);

  const sortedSources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);
  const sortedDests = Object.entries(destCounts).sort((a, b) => b[1] - a[1]);
  const sortedProtocols = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1]);

  const mostActiveSource = sortedSources[0] ? sortedSources[0][0] : "None";
  const mostContactedDest = sortedDests[0] ? sortedDests[0][0] : "None";
  const mostCommonProto = sortedProtocols[0] ? sortedProtocols[0][0] : "None";
  const avgPacketLen = lengthCount > 0 ? Math.round(totalLength / lengthCount) : "N/A";

  appState.analysisSummary = {
    totalPackets: packets.length,
    uniqueSourcesCount: uniqueSources.length,
    uniqueDestsCount: uniqueDests.length,
    mostActiveSource,
    mostContactedDest,
    mostCommonProto,
    avgPacketLen,
    topSources: sortedSources.slice(0, 10),
    topDests: sortedDests.slice(0, 10),
    protocolsPresent: sortedProtocols,
    sourceDestPairs
  };

  renderDashboardMetrics(appState.analysisSummary);

  const generatedAlerts = [];
  const scoreContributions = [];
  const th = appState.thresholds;

  // RULE 1: HIGH PACKET VOLUME
  for (const [source, count] of sortedSources) {
    if (count > th.packetsPerSource) {
      const severity = count > th.packetsPerSource * 2.5 ? "High" : "Medium";
      generatedAlerts.push({
        id: `rule1-${source}`,
        ruleNumber: 1,
        name: "High Packet Volume",
        severity: severity,
        mitreId: "T1048.003",
        mitreTactic: "Exfiltration",
        mitreName: "Exfiltration Over Unencrypted Protocol",
        source: source,
        destination: "Multiple / Network",
        protocol: "Various",
        observed: `${count} packets generated by source host`,
        threshold: `Configured threshold: > ${th.packetsPerSource} packets`,
        whyItMatters: "A single host generating significantly more traffic than expected may warrant investigation. Elevated traffic can represent heavy workload, automated processes, or unexpected transmission.",
        benignExplanations: [
          "Legitimate high-throughput file transfer (SMB, FTP, SFTP)",
          "Operating system or software background updates",
          "Automated cloud backup or database synchronization"
        ],
        investigations: [
          "Identify the device role (workstation, server, backup agent, or IoT).",
          "Review destination addresses to verify if transmissions are local or external.",
          "Check the protocols and ports carrying the volume."
        ]
      });
      scoreContributions.push({
        label: `High volume from ${source} (${count} pkts)`,
        points: severity === "High" ? 25 : 20
      });
    }
  }

  // RULE 2: POSSIBLE HOST SCANNING
  for (const [source, destSet] of Object.entries(sourceToDests)) {
    if (destSet.size > th.uniqueDestinations) {
      generatedAlerts.push({
        id: `rule2-${source}`,
        ruleNumber: 2,
        name: "Possible Host Discovery / Network Scanning",
        severity: "Medium",
        mitreId: "T1046",
        mitreTactic: "Reconnaissance",
        mitreName: "Network Service Discovery",
        source: source,
        destination: `${destSet.size} unique destinations`,
        protocol: "Various",
        observed: `Source communicated with ${destSet.size} distinct destination IP addresses`,
        threshold: `Configured threshold: > ${th.uniqueDestinations} unique destinations`,
        whyItMatters: "A single host communicating with an unusually large number of distinct systems over a short capture may indicate host discovery, sweep operations, or lateral movement reconnaissance.",
        benignExplanations: [
          "Network monitoring tools, asset management or inventory scanners",
          "Broadcast or multicast discovery from network printers / media servers"
        ],
        investigations: [
          "Confirm whether the source host is an authorized vulnerability scanner or management server.",
          "Examine whether destinations are sequential (e.g. 10.0.0.1, 10.0.0.2...) indicating an automated sweep."
        ]
      });
      scoreContributions.push({
        label: `Host scanning: ${source} contacted ${destSet.size} systems`,
        points: 25
      });
    }
  }

  // RULE 3: POSSIBLE PORT SCANNING
  for (const [pair, portSet] of Object.entries(sourceToPorts)) {
    if (portSet.size > th.uniquePorts) {
      const [src, dst] = pair.split(" -> ");
      generatedAlerts.push({
        id: `rule3-${pair}`,
        ruleNumber: 3,
        name: "Possible Port Scanning",
        severity: "Medium",
        mitreId: "T1046",
        mitreTactic: "Reconnaissance",
        mitreName: "Network Service Discovery: Port Scan",
        source: src,
        destination: dst,
        protocol: "TCP",
        observed: `Source contacted ${portSet.size} distinct ports on destination ${dst}`,
        threshold: `Configured threshold: > ${th.uniquePorts} unique ports on same target`,
        whyItMatters: "Probing multiple ports on a single destination is characteristic of port enumeration designed to locate open services and potential vulnerabilities.",
        benignExplanations: [
          "Authorized vulnerability assessment or penetration test in progress",
          "Multi-service application initializing multiple sub-channels"
        ],
        investigations: [
          "Identify targeted ports (e.g. common service ports 21, 22, 80, 443, 445, 3389).",
          "Determine whether the source machine is owned by an internal security team."
        ]
      });
      scoreContributions.push({
        label: `Port enumeration on ${dst} (${portSet.size} ports)`,
        points: 25
      });
    }
  }

  // RULE 4: HIGH ICMP ACTIVITY
  for (const [source, count] of Object.entries(sourceIcmpCounts)) {
    if (count > th.icmpPackets) {
      generatedAlerts.push({
        id: `rule4-${source}`,
        ruleNumber: 4,
        name: "High ICMP Traffic Activity",
        severity: "Medium",
        mitreId: "T1046",
        mitreTactic: "Reconnaissance",
        mitreName: "Network Service Discovery: Ping Sweep",
        source: source,
        destination: "Multiple / Network",
        protocol: "ICMP",
        observed: `${count} ICMP packets generated by source host`,
        threshold: `Configured threshold: > ${th.icmpPackets} ICMP packets`,
        whyItMatters: "High volume of ICMP packets (such as echo requests) can be associated with automated ping sweeps, network latency diagnostics, or potential flood attempts.",
        benignExplanations: [
          "Automated network health checks or monitoring agents (Nagios, Zabbix, PRTG)",
          "Network administrator running prolonged ping diagnostics"
        ],
        investigations: [
          "Inspect ICMP types and codes (Echo Request, Echo Reply).",
          "Determine if pings were directed to a single host or sequentially across a subnet."
        ]
      });
      scoreContributions.push({
        label: `High ICMP volume from ${source} (${count} pkts)`,
        points: 15
      });
    }
  }

  // RULE 5: HIGH DNS QUERY ACTIVITY
  for (const [source, count] of Object.entries(sourceDnsCounts)) {
    if (count > th.dnsPackets) {
      generatedAlerts.push({
        id: `rule5-${source}`,
        ruleNumber: 5,
        name: "High DNS Activity",
        severity: "Low",
        mitreId: "T1071.004",
        mitreTactic: "Command and Control",
        mitreName: "Application Layer Protocol: DNS",
        source: source,
        destination: "DNS Resolver",
        protocol: "DNS",
        observed: `${count} DNS packets generated by source host`,
        threshold: `Configured threshold: > ${th.dnsPackets} DNS packets`,
        whyItMatters: "Unusually high frequency of DNS queries can indicate rapid external browsing, automated web crawlers, or suspicious automated lookups.",
        benignExplanations: [
          "Heavy web browsing session loading complex sites with third-party trackers/CDNs",
          "Operating system or software checking for updates across mirrors"
        ],
        investigations: [
          "Review queried domain names in the Wireshark capture.",
          "Check for high numbers of NXDOMAIN (domain does not exist) responses."
        ]
      });
      scoreContributions.push({
        label: `High DNS activity from ${source} (${count} pkts)`,
        points: 10
      });
    }
  }

  // RULE 6: REPEATED SOURCE-TO-DESTINATION COMMUNICATION
  for (const flow of Object.values(sourceDestPairs)) {
    if (flow.count > th.repeatedPackets) {
      const topProto = Object.entries(flow.protocols).sort((a, b) => b[1] - a[1])[0][0];
      generatedAlerts.push({
        id: `rule6-${flow.source}-${flow.destination}`,
        ruleNumber: 6,
        name: "Repeated Source-to-Destination Communication",
        severity: "Low",
        mitreId: "T1071",
        mitreTactic: "Command and Control",
        mitreName: "Application Layer Protocol / Sustained Flow",
        source: flow.source,
        destination: flow.destination,
        protocol: topProto,
        observed: `${flow.count} packets exchanged between pair (${topProto})`,
        threshold: `Configured threshold: > ${th.repeatedPackets} packets between pair`,
        whyItMatters: "A sustained flow of packets between two specific hosts indicates continuous communication. Helps isolate dominant sessions.",
        benignExplanations: [
          "Long-lived database query, SSH terminal, or RDP remote desktop session",
          "File download, media streaming, or cloud backup transfer"
        ],
        investigations: [
          "Determine the business relationship between the source and destination.",
          "Review packet sizes (many small packets vs. 1500-byte full frame payload stream)."
        ]
      });
      scoreContributions.push({
        label: `Persistent flow ${flow.source} ↔ ${flow.destination} (${flow.count} pkts)`,
        points: 10
      });
    }
  }

  // RULE 7: TCP SYN HEAVY ACTIVITY
  for (const [source, count] of Object.entries(sourceSynCounts)) {
    if (count > th.synHeavyCount) {
      generatedAlerts.push({
        id: `rule7-${source}`,
        ruleNumber: 7,
        name: "Repeated TCP SYN Activity",
        severity: "Medium",
        mitreId: "T1046",
        mitreTactic: "Reconnaissance",
        mitreName: "SYN Stealth Scan / Connection Probing",
        source: source,
        destination: "Multiple / Targeted",
        protocol: "TCP",
        observed: `${count} TCP SYN connection requests observed from source`,
        threshold: `Heuristic threshold: > ${th.synHeavyCount} SYN packets without completed handshakes`,
        whyItMatters: "Repeated TCP SYN packets without completed sessions can occur when services are offline, during stealth TCP SYN scans (half-open scanning), or in flood scenarios.",
        benignExplanations: [
          "Attempting to connect to an offline server or temporarily unreachable service",
          "Aggressive connection retry logic in poorly configured client software"
        ],
        investigations: [
          "Check whether target ports vary (port scan) or remain identical (unreachable service).",
          "Check whether the destination systems responded with SYN-ACK or RST packets."
        ]
      });
      scoreContributions.push({
        label: `Repeated TCP SYN attempts from ${source} (${count} SYNs)`,
        points: 15
      });
    }
  }

  // RULE 8: PERIODIC C2 BEACONING DETECTION
  for (const [pairKey, times] of Object.entries(flowTimeHistories)) {
    if (times.length >= 5) {
      const sortedTimes = [...times].sort((a, b) => a - b);
      const intervals = [];
      for (let i = 1; i < sortedTimes.length; i++) {
        intervals.push(sortedTimes[i] - sortedTimes[i - 1]);
      }

      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval >= 0.8 && avgInterval <= 60.0) {
        const variance = intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);

        if (stdDev <= 0.6) {
          const [src, dst] = pairKey.split("::");
          generatedAlerts.push({
            id: `rule8-${pairKey}`,
            ruleNumber: 8,
            name: "Periodic Command & Control (C2) Beaconing Pattern",
            severity: "High",
            mitreId: "T1071.001",
            mitreTactic: "Command and Control",
            mitreName: "Application Layer Protocol: Web Traffic Beaconing",
            source: src,
            destination: dst,
            protocol: "HTTP/TCP",
            observed: `${times.length} periodic connection events spaced ~${avgInterval.toFixed(1)}s apart (Jitter &plusmn;${stdDev.toFixed(2)}s)`,
            threshold: "Periodic regularity check: >= 5 pulses with jitter < 0.6s",
            whyItMatters: "Compromised endpoints frequently establish periodic outbound HTTP/TCP heartbeats to an external Command and Control (C2) infrastructure to retrieve attacker instructions.",
            benignExplanations: [
              "Regular software telemetry polling (e.g. anti-virus definition check or NTP)",
              "Web application periodic keep-alive or server-sent events heartbeat",
              "Automated scheduled diagnostic script"
            ],
            investigations: [
              "Inspect the HTTP request path, headers, and user-agent string.",
              "Verify ownership and reputation of destination address.",
              "Check process tree on source machine for unapproved scripts or background daemons."
            ]
          });
          scoreContributions.push({
            label: `C2 Beaconing: ${src} &rarr; ${dst} (~${avgInterval.toFixed(1)}s interval)`,
            points: 30
          });
        }
      }
    }
  }

  // RULE 9: POTENTIAL DNS TUNNELING / EXFILTRATION
  if (suspiciousDnsQueries.length > 0) {
    const querySample = suspiciousDnsQueries[0];
    generatedAlerts.push({
      id: `rule9-dns-tunnel`,
      ruleNumber: 9,
      name: "Suspicious DNS Subdomain Length (Potential DNS Tunneling)",
      severity: "High",
      mitreId: "T1071.004",
      mitreTactic: "Exfiltration",
      mitreName: "Protocol Tunneling: DNS Exfiltration",
      source: querySample.source,
      destination: querySample.destination,
      protocol: "DNS",
      observed: `${suspiciousDnsQueries.length} DNS lookups with unusually long subdomains (Sample: "${querySample.query}")`,
      threshold: `Configured threshold: Subdomain label >= ${th.dnsSubdomainLen} characters`,
      whyItMatters: "Attackers use DNS tunneling to bypass firewalls and exfiltrate sensitive data or establish covert channels encoded directly inside DNS query hostnames.",
      benignExplanations: [
        "Anti-spam software querying DNSBL (DNS-based Blackhole Lists) with hashed hashes",
        "Legitimate software telemetry (e.g. antivirus cloud reputation lookups)",
        "Content delivery network (CDN) dynamic routing labels"
      ],
      investigations: [
        "Examine queried domains to see if labels appear to be base64 or hex encoded data.",
        "Check query frequency and whether queries result in TXT, CNAME, or A record responses.",
        "Identify the originating process on the endpoint using Sysmon or EDR."
      ]
    });
    scoreContributions.push({
      label: `DNS Tunneling heuristic on ${querySample.source} (${suspiciousDnsQueries.length} long queries)`,
      points: 25
    });
  }

  // RULE 10: NON-STANDARD PORT COMMUNICATION
  if (nonStandardPortFlows.length > 0) {
    const uniquePorts = Array.from(new Set(nonStandardPortFlows.map(f => f.port)));
    const sample = nonStandardPortFlows[0];
    generatedAlerts.push({
      id: `rule10-non-standard-port`,
      ruleNumber: 10,
      name: "Non-Standard Port Communication",
      severity: "Medium",
      mitreId: "T1571",
      mitreTactic: "Defense Evasion",
      mitreName: "Non-Standard Port Usage",
      source: sample.source,
      destination: sample.destination,
      protocol: sample.proto,
      observed: `Connection observed on unconventional port(s): ${uniquePorts.join(", ")}`,
      threshold: `Heuristic watchlist: [${th.nonStandardPorts.join(", ")}]`,
      whyItMatters: "Communications over unconventional ports (such as 4444 or 8888) frequently indicate custom proxies, unauthorized development servers, or adversary backdoors attempting to evade perimeter filtering.",
      benignExplanations: [
        "Local web server, developer staging service, or microservice container",
        "Alternate administration console or proxy server"
      ],
      investigations: [
        "Determine the service running on the targeted port.",
        "Check whether this host is authorised to run alternate services.",
        "Check the payload data for cleartext protocol indicators."
      ]
    });
    scoreContributions.push({
      label: `Non-standard port(s) used: ${uniquePorts.join(", ")}`,
      points: 15
    });
  }

  // RULE 11: ASYMMETRIC DATA EXFILTRATION VOLUME
  for (const flow of Object.values(sourceDestPairs)) {
    if (flow.bytes > th.exfilBytes && !isPrivateIP(flow.destination)) {
      generatedAlerts.push({
        id: `rule11-${flow.source}-${flow.destination}`,
        ruleNumber: 11,
        name: "Potential Asymmetric Data Exfiltration",
        severity: "High",
        mitreId: "T1048",
        mitreTactic: "Exfiltration",
        mitreName: "Exfiltration Over Alternative Protocol",
        source: flow.source,
        destination: flow.destination,
        protocol: "TCP",
        observed: `${(flow.bytes / 1024).toFixed(1)} KB transferred outbound to external destination ${flow.destination}`,
        threshold: `Configured threshold: > ${(th.exfilBytes / 1024).toFixed(1)} KB outbound`,
        whyItMatters: "Large outbound data transfers from internal clients to external addresses may signify data staging, archive upload, or unauthorized cloud storage syncing.",
        benignExplanations: [
          "Legitimate cloud drive file sync (OneDrive, Google Drive, Dropbox)",
          "Large video or media upload by user",
          "Operating system crash dump transmission"
        ],
        investigations: [
          "Verify the owner and geolocational registry of destination IP.",
          "Determine if file compression tools (7zip, WinRAR, tar) executed prior to transmission.",
          "Check data loss prevention (DLP) telemetry."
        ]
      });
      scoreContributions.push({
        label: `High outbound transfer: ${flow.source} &rarr; ${flow.destination} (${(flow.bytes / 1024).toFixed(1)} KB)`,
        points: 25
      });
    }
  }

  appState.alerts = generatedAlerts;

  renderInvestigationScore(scoreContributions);
  renderAlerts();
  updateInspectorPackets();

  // Build & Update GUI Graphic Network Traffic Map
  buildTrafficMapData();

  dom.dashboard?.classList.remove("hidden");
}

function renderDashboardMetrics(summary) {
  if (dom.metricTotalPackets) dom.metricTotalPackets.textContent = summary.totalPackets.toLocaleString();
  if (dom.metricUniqueSources) dom.metricUniqueSources.textContent = summary.uniqueSourcesCount.toLocaleString();
  if (dom.metricUniqueDests) dom.metricUniqueDests.textContent = summary.uniqueDestsCount.toLocaleString();
  if (dom.metricActiveSource) dom.metricActiveSource.textContent = summary.mostActiveSource;
  if (dom.metricActiveDest) dom.metricActiveDest.textContent = summary.mostContactedDest;
  if (dom.metricTopProto) dom.metricTopProto.textContent = summary.mostCommonProto;
  if (dom.metricAvgLen) dom.metricAvgLen.textContent = summary.avgPacketLen !== "N/A" ? `${summary.avgPacketLen} B` : "N/A";

  if (dom.sourcesBarList) renderBarList(dom.sourcesBarList, summary.topSources, summary.totalPackets, false);
  if (dom.destsBarList) renderBarList(dom.destsBarList, summary.topDests, summary.totalPackets, false);
  if (dom.protocolBarList) renderBarList(dom.protocolBarList, summary.protocolsPresent, summary.totalPackets, true);
}

function renderBarList(container, items, total, isProtocol) {
  container.innerHTML = "";
  if (!items || items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "bar-value";
    empty.textContent = "No data available";
    container.appendChild(empty);
    return;
  }

  const maxVal = items[0][1];

  items.forEach(([label, count]) => {
    const item = document.createElement("div");
    item.className = "bar-item";

    const header = document.createElement("div");
    header.className = "bar-header";

    const labelSpan = document.createElement("span");
    labelSpan.className = "bar-label";
    labelSpan.textContent = label;

    const valSpan = document.createElement("span");
    valSpan.className = "bar-value";
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    valSpan.textContent = `${count.toLocaleString()} (${percent}%)`;

    header.appendChild(labelSpan);
    header.appendChild(valSpan);

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = isProtocol ? "bar-fill protocol" : "bar-fill";
    const widthPercent = maxVal > 0 ? (count / maxVal) * 100 : 0;
    fill.style.width = `${Math.max(widthPercent, 2)}%`;

    track.appendChild(fill);
    item.appendChild(header);
    item.appendChild(track);

    container.appendChild(item);
  });
}

function renderInvestigationScore(contributions) {
  let totalScore = contributions.reduce((acc, c) => acc + c.points, 0);
  const displayScore = Math.min(totalScore, 100);
  
  if (dom.scoreNumber) dom.scoreNumber.textContent = displayScore;

  let title = "Normal Baseline Activity";
  let desc = "Observed traffic conforms to expected baseline behavior without threshold deviations.";

  if (displayScore >= 60) {
    title = "High Investigative Priority (Potential APT / Incident)";
    desc = "Multiple correlated threat indicators detected across reconnaissance, beaconing, or exfiltration channels. Immediate SOC triage recommended.";
  } else if (displayScore >= 25) {
    title = "Elevated Activity Deserving Review";
    desc = "One or more anomalous patterns exceeded configured thresholds. Review the suggested investigation steps below to verify operational legitimacy.";
  } else if (displayScore > 0) {
    title = "Low Priority Observation";
    desc = "Minor activity flagged for analyst awareness. Likely routine background activity, but worth reviewing.";
  }

  if (dom.scoreTitle) dom.scoreTitle.textContent = title;
  if (dom.scoreDesc) dom.scoreDesc.textContent = desc;

  if (dom.scorePills) {
    dom.scorePills.innerHTML = "";
    if (contributions.length === 0) {
      const pill = document.createElement("div");
      pill.className = "score-pill";
      pill.textContent = "No threshold violations detected";
      dom.scorePills.appendChild(pill);
    } else {
      contributions.forEach(c => {
        const pill = document.createElement("div");
        pill.className = "score-pill";
        const strong = document.createElement("strong");
        strong.textContent = `+${c.points} `;
        pill.appendChild(strong);
        pill.appendChild(document.createTextNode(c.label));
        dom.scorePills.appendChild(pill);
      });
    }
  }
}

function renderAlerts() {
  const container = dom.alertsContainer;
  if (!container) return;
  container.innerHTML = "";

  const f = appState.filters;

  const filtered = appState.alerts.filter(alert => {
    if (f.source && alert.source !== f.source) return false;
    if (f.destination && alert.destination !== f.destination && !alert.destination.includes(f.destination)) return false;
    if (f.protocol && alert.protocol !== f.protocol && alert.protocol !== "Various") return false;
    if (f.severity && alert.severity.toLowerCase() !== f.severity.toLowerCase()) return false;
    if (f.mitre && alert.mitreTactic && alert.mitreTactic.toLowerCase() !== f.mitre.toLowerCase()) return false;
    if (f.search) {
      const haystack = `${alert.name} ${alert.source} ${alert.destination} ${alert.observed} ${alert.whyItMatters} ${alert.mitreId || ''} ${alert.mitreTactic || ''}`.toLowerCase();
      if (!haystack.includes(f.search)) return false;
    }
    return true;
  });

  if (dom.alertsCountBadge) {
    dom.alertsCountBadge.textContent = `${filtered.length} of ${appState.alerts.length} alerts`;
  }

  if (filtered.length === 0) {
    const emptyBox = document.createElement("div");
    emptyBox.className = "empty-alerts-box";

    const h3 = document.createElement("h3");
    h3.textContent = appState.alerts.length === 0 
      ? "No Alerts Triggered" 
      : "No Alerts Match Your Active Filters";

    const p = document.createElement("p");
    p.textContent = appState.alerts.length === 0
      ? "Traffic appears consistent with normal baseline activity under current thresholds."
      : "Try clearing search or filter selections to view all flagged events.";

    emptyBox.appendChild(h3);
    emptyBox.appendChild(p);
    container.appendChild(emptyBox);
    return;
  }

  filtered.forEach(alert => {
    const card = document.createElement("article");
    card.className = `alert-card sev-${alert.severity.toLowerCase()}`;

    const topRow = document.createElement("div");
    topRow.className = "alert-top";

    const titleRow = document.createElement("div");
    titleRow.className = "alert-title-row";

    const nameEl = document.createElement("h3");
    nameEl.className = "alert-name";
    nameEl.textContent = alert.name;

    const sevTag = document.createElement("span");
    sevTag.className = `severity-tag ${alert.severity.toLowerCase()}`;
    sevTag.textContent = alert.severity;

    titleRow.appendChild(nameEl);
    titleRow.appendChild(sevTag);

    if (alert.mitreId) {
      const mitrePill = document.createElement("span");
      mitrePill.className = "mitre-pill";
      mitrePill.textContent = `MITRE ${alert.mitreId}`;
      titleRow.appendChild(mitrePill);

      if (alert.mitreTactic) {
        const tacticPill = document.createElement("span");
        tacticPill.className = "mitre-tactic";
        tacticPill.textContent = alert.mitreTactic;
        titleRow.appendChild(tacticPill);
      }
    }

    topRow.appendChild(titleRow);

    const metaGrid = document.createElement("div");
    metaGrid.className = "alert-meta-grid";

    metaGrid.appendChild(createMetaItem("Source Host", alert.source));
    metaGrid.appendChild(createMetaItem("Destination", alert.destination));
    metaGrid.appendChild(createMetaItem("Observed Activity", alert.observed));
    metaGrid.appendChild(createMetaItem("Configured Threshold", alert.threshold));

    const whySection = document.createElement("div");
    whySection.className = "alert-body-section";
    const whyLabel = document.createElement("div");
    whyLabel.className = "alert-body-label";
    whyLabel.textContent = "Why This Could Matter";
    const whyText = document.createElement("div");
    whyText.className = "alert-body-text";
    whyText.textContent = alert.whyItMatters;
    whySection.appendChild(whyLabel);
    whySection.appendChild(whyText);

    const benignSection = document.createElement("div");
    benignSection.className = "alert-body-section";
    const benignLabel = document.createElement("div");
    benignLabel.className = "alert-body-label";
    benignLabel.textContent = "Possible Benign Explanations";
    const benignList = document.createElement("ul");
    benignList.className = "alert-bullets";
    alert.benignExplanations.forEach(exp => {
      const li = document.createElement("li");
      li.textContent = exp;
      benignList.appendChild(li);
    });
    benignSection.appendChild(benignLabel);
    benignSection.appendChild(benignList);

    const invSection = document.createElement("div");
    invSection.className = "alert-body-section";
    const invLabel = document.createElement("div");
    invLabel.className = "alert-body-label";
    invLabel.textContent = "Suggested Investigation Steps";
    const invList = document.createElement("ol");
    invList.className = "alert-bullets";
    invList.style.listStyleType = "decimal";
    alert.investigations.forEach(inv => {
      const li = document.createElement("li");
      li.textContent = inv;
      invList.appendChild(li);
    });
    invSection.appendChild(invLabel);
    invSection.appendChild(invList);

    const filterBtn = document.createElement("button");
    filterBtn.type = "button";
    filterBtn.className = "btn-filter-packets";
    filterBtn.textContent = `Inspect Packets for ${alert.source}`;
    filterBtn.onclick = () => {
      dom.filterSource.value = alert.source;
      updateFilterState();
      renderAlerts();
      updateInspectorPackets();
      document.getElementById("inspector-section")?.scrollIntoView({ behavior: "smooth" });
    };

    card.appendChild(topRow);
    card.appendChild(metaGrid);
    card.appendChild(whySection);
    card.appendChild(benignSection);
    card.appendChild(invSection);
    card.appendChild(filterBtn);

    container.appendChild(card);
  });
}

function createMetaItem(label, value) {
  const item = document.createElement("div");
  item.className = "alert-meta-item";
  const strong = document.createElement("strong");
  strong.textContent = label;
  const span = document.createElement("span");
  span.textContent = value;
  item.appendChild(strong);
  item.appendChild(span);
  return item;
}

// Raw Packet Table Inspector
function updateInspectorPackets() {
  const f = appState.filters;

  appState.inspector.filteredPackets = appState.parsedPackets.filter(p => {
    if (f.source && p.source !== f.source) return false;
    if (f.destination && p.destination !== f.destination) return false;
    if (f.protocol && p.protocol !== f.protocol) return false;
    if (f.search) {
      const haystack = `${p.no} ${p.source} ${p.destination} ${p.protocol} ${p.info}`.toLowerCase();
      if (!haystack.includes(f.search)) return false;
    }
    return true;
  });

  appState.inspector.currentPage = 1;
  renderInspectorTable();
}

function renderInspectorTable() {
  const tbody = dom.packetTableBody;
  if (!tbody) return;
  tbody.innerHTML = "";

  const packets = appState.inspector.filteredPackets;
  const total = packets.length;
  const page = appState.inspector.currentPage;
  const size = appState.inspector.pageSize;

  if (dom.packetCountBadge) {
    dom.packetCountBadge.textContent = `${total.toLocaleString()} frames`;
  }

  const startIdx = (page - 1) * size;
  const endIdx = Math.min(startIdx + size, total);
  const pageSlice = packets.slice(startIdx, endIdx);

  if (dom.paginationInfo) {
    dom.paginationInfo.textContent = total > 0 
      ? `Showing frames ${startIdx + 1} to ${endIdx} of ${total.toLocaleString()}` 
      : "No frames match active filters";
  }

  if (dom.btnPrevPage) dom.btnPrevPage.disabled = page <= 1;
  if (dom.btnNextPage) dom.btnNextPage.disabled = endIdx >= total;

  if (pageSlice.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.style.textAlign = "center";
    td.style.padding = "2rem";
    td.style.color = "var(--text-muted)";
    td.textContent = "No packet frames match your filter selection.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  pageSlice.forEach(p => {
    const tr = document.createElement("tr");
    tr.tabIndex = 0;

    const tdNo = document.createElement("td");
    tdNo.textContent = p.no;

    const tdTime = document.createElement("td");
    tdTime.textContent = p.time;

    const tdSrc = document.createElement("td");
    tdSrc.className = "col-ip";
    tdSrc.textContent = p.source;

    const tdDst = document.createElement("td");
    tdDst.className = "col-ip";
    tdDst.textContent = p.destination;

    const tdProto = document.createElement("td");
    tdProto.className = "col-proto";
    tdProto.textContent = p.protocol;

    const tdLen = document.createElement("td");
    tdLen.textContent = p.length;

    const tdInfo = document.createElement("td");
    tdInfo.textContent = p.info;

    tr.appendChild(tdNo);
    tr.appendChild(tdTime);
    tr.appendChild(tdSrc);
    tr.appendChild(tdDst);
    tr.appendChild(tdProto);
    tr.appendChild(tdLen);
    tr.appendChild(tdInfo);

    tr.onclick = () => {
      document.querySelectorAll(".packet-table tr").forEach(r => r.classList.remove("active"));
      tr.classList.add("active");
    };

    tbody.appendChild(tr);
  });
}

// ========================================================
// GUI GRAPHIC NETWORK TRAFFIC ON MAP (CANVAS)
// ========================================================

// 1. Geographic Database & Resolution (100% Client-Side / Zero API)
const KNOWN_GEO_HUBS = [
  { city: "Ashburn (US East)", lat: 39.04, lon: -77.48 },
  { city: "San Francisco (US West)", lat: 37.77, lon: -122.41 },
  { city: "Mountain View (US)", lat: 37.42, lon: -122.08 },
  { city: "Frankfurt (Germany)", lat: 50.11, lon: 8.68 },
  { city: "London (United Kingdom)", lat: 51.50, lon: -0.12 },
  { city: "Amsterdam (Netherlands)", lat: 52.36, lon: 4.90 },
  { city: "Tokyo (Japan)", lat: 35.67, lon: 139.65 },
  { city: "Singapore", lat: 1.35, lon: 103.81 },
  { city: "Sydney (Australia)", lat: -33.86, lon: 151.20 },
  { city: "Mumbai (India)", lat: 19.07, lon: 72.87 },
  { city: "Sao Paulo (Brazil)", lat: -23.55, lon: -46.63 },
  { city: "Dallas (US Central)", lat: 32.77, lon: -96.79 },
  { city: "Paris (France)", lat: 48.85, lon: 2.35 },
  { city: "Seoul (South Korea)", lat: 37.56, lon: 126.97 },
  { city: "Stockholm (Sweden)", lat: 59.32, lon: 18.06 }
];

const KNOWN_IP_GEO_MAP = {
  "93.184.216.34": { city: "Ashburn, VA (US)", lat: 39.04, lon: -77.48 },
  "1.1.1.1": { city: "San Francisco, CA (US)", lat: 37.77, lon: -122.41 },
  "1.0.0.1": { city: "Los Angeles, CA (US)", lat: 34.05, lon: -118.24 },
  "8.8.8.8": { city: "Mountain View, CA (US)", lat: 37.42, lon: -122.08 },
  "8.8.4.4": { city: "Dallas, TX (US)", lat: 32.77, lon: -96.79 },
  "142.250.190.46": { city: "London (UK)", lat: 51.50, lon: -0.12 },
  "162.159.200.1": { city: "Frankfurt (Germany)", lat: 50.11, lon: 8.68 },
  "198.51.100.10": { city: "Amsterdam (Netherlands)", lat: 52.36, lon: 4.90 },
  "203.0.113.88": { city: "Tokyo (Japan) [C2 Host]", lat: 35.67, lon: 139.65 },
  "203.0.113.99": { city: "Singapore [Exfil Target]", lat: 1.35, lon: 103.81 }
};

// World Continents Vector Polygons for High-Tech Dark Cyber Map
const CONTINENT_POLYGONS = [
  // North America
  [[-168, 65], [-140, 70], [-100, 72], [-60, 70], [-55, 48], [-75, 35], [-80, 25], [-97, 20], [-105, 23], [-117, 32], [-125, 48], [-140, 60], [-168, 65]],
  // South America
  [[-80, 10], [-60, 12], [-35, -5], [-40, -22], [-55, -38], [-70, -55], [-75, -45], [-80, -20], [-80, 10]],
  // Europe
  [[-10, 36], [0, 43], [15, 38], [28, 41], [30, 60], [20, 70], [5, 60], [-5, 58], [-10, 36]],
  // Africa
  [[-17, 32], [32, 31], [43, 12], [51, 12], [40, -10], [33, -34], [18, -34], [12, -15], [9, 5], [-15, 12], [-17, 32]],
  // Asia
  [[30, 60], [60, 70], [100, 75], [170, 65], [140, 35], [105, 10], [100, 20], [80, 10], [75, 25], [60, 25], [45, 40], [30, 60]],
  // Australia
  [[114, -22], [130, -12], [145, -15], [153, -28], [150, -38], [138, -35], [115, -34], [114, -22]],
  // UK
  [[-5, 50], [1, 51], [-1, 58], [-5, 58], [-5, 50]],
  // Japan
  [[130, 32], [138, 35], [142, 43], [140, 40], [132, 33], [130, 32]]
];

function resolveIPCoordinates(ip) {
  if (isPrivateIP(ip)) {
    // Pinned to Local Subnet Origin (e.g. Washington DC / Local Enterprise)
    return { city: "Local Subnet (Enterprise Origin)", lat: 38.90, lon: -77.03, isLocal: true };
  }

  if (KNOWN_IP_GEO_MAP[ip]) {
    return { ...KNOWN_IP_GEO_MAP[ip], isLocal: false };
  }

  // Deterministic Hash Fallback for any arbitrary user IP
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  const hub = KNOWN_GEO_HUBS[Math.abs(hash) % KNOWN_GEO_HUBS.length];
  return { ...hub, isLocal: false };
}

function projectGeo(lat, lon, width, height) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function initTrafficMap() {
  const canvas = dom.trafficMapCanvas;
  if (!canvas) return;

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
  };

  window.addEventListener("resize", resize);
  resize();

  // Mouse hover detection
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;

    let found = null;
    for (const node of appState.geoMap.nodes) {
      const dist = Math.hypot(node.screenX - x, node.screenY - y);
      if (dist <= node.radius + 10) {
        found = node;
        break;
      }
    }

    appState.geoMap.hoveredNode = found;

    if (found && dom.mapTooltip) {
      dom.mapTooltip.style.display = "block";
      dom.mapTooltip.style.left = `${e.clientX - rect.left + 15}px`;
      dom.mapTooltip.style.top = `${e.clientY - rect.top + 10}px`;
      dom.mapTooltip.innerHTML = `
        <div style="font-weight:700; color:#38bdf8; margin-bottom:2px;">${found.ip}</div>
        <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:4px;">📍 ${found.city}</div>
        <div style="font-size:0.775rem;"><strong>Packets:</strong> ${found.packets.toLocaleString()}</div>
        <div style="font-size:0.775rem;"><strong>Status:</strong> ${found.isThreat ? "<span style='color:#f43f5e; font-weight:700;'>🚨 Threat / Flagged</span>" : (found.isLocal ? "<span style='color:#38bdf8;'>Internal Subnet</span>" : "<span style='color:#10b981;'>Benign External</span>")}</div>
      `;
    } else if (dom.mapTooltip) {
      dom.mapTooltip.style.display = "none";
    }
  });

  canvas.addEventListener("click", () => {
    if (appState.geoMap.hoveredNode) {
      const clickedIP = appState.geoMap.hoveredNode.ip;
      appState.geoMap.selectedNode = clickedIP;
      dom.filterSource.value = clickedIP;
      updateFilterState();
      renderAlerts();
      updateInspectorPackets();
      showToast(`Filtered dashboard to map node: ${clickedIP}`);
    }
  });

  // Start Animation Loop
  if (!appState.geoMap.animFrameId) {
    animateTrafficMap();
  }
}

function buildTrafficMapData() {
  const flows = appState.analysisSummary?.sourceDestPairs || {};
  const alerts = appState.alerts || [];
  const threatIPs = new Set(alerts.map(a => a.source));

  const nodeMap = {};
  const geoFlows = [];

  Object.values(flows).forEach(f => {
    const srcGeo = resolveIPCoordinates(f.source);
    const dstGeo = resolveIPCoordinates(f.destination);

    if (!nodeMap[f.source]) {
      nodeMap[f.source] = {
        ip: f.source,
        ...srcGeo,
        packets: 0,
        isThreat: threatIPs.has(f.source)
      };
    }
    nodeMap[f.source].packets += f.count;

    if (!nodeMap[f.destination]) {
      nodeMap[f.destination] = {
        ip: f.destination,
        ...dstGeo,
        packets: 0,
        isThreat: threatIPs.has(f.destination)
      };
    }
    nodeMap[f.destination].packets += f.count;

    const isThreatFlow = threatIPs.has(f.source) || threatIPs.has(f.destination);

    geoFlows.push({
      srcIP: f.source,
      dstIP: f.destination,
      srcGeo,
      dstGeo,
      count: f.count,
      bytes: f.bytes,
      isThreat: isThreatFlow,
      // Multiple animated packet photons
      particles: [
        { t: Math.random(), speed: 0.006 + Math.random() * 0.005 },
        { t: Math.random(), speed: 0.006 + Math.random() * 0.005 }
      ]
    });
  });

  appState.geoMap.nodes = Object.values(nodeMap);
  appState.geoMap.flows = geoFlows;

  // Update HUD Counters
  if (dom.mapFlowsCount) {
    dom.mapFlowsCount.textContent = `${geoFlows.length} Geographic Flows`;
  }
  const threatFlowCount = geoFlows.filter(f => f.isThreat).length;
  if (dom.mapThreatsCount) {
    dom.mapThreatsCount.textContent = `${threatFlowCount} Flagged Threat Vectors`;
  }

  // Update Live Ticker Text
  if (dom.mapTickerText) {
    if (alerts.length > 0) {
      const topAlert = alerts[0];
      dom.mapTickerText.textContent = `🚨 ${topAlert.name.toUpperCase()} [${topAlert.severity}] &bull; Origin: ${topAlert.source} &rarr; Target: ${topAlert.destination} &bull; ${topAlert.observed}`;
    } else {
      dom.mapTickerText.textContent = `✅ Normal baseline network traffic &bull; ${geoFlows.length} active global communication links verified`;
    }
  }
}

function animateTrafficMap() {
  renderTrafficMapFrame();
  appState.geoMap.time += 0.02;
  appState.geoMap.animFrameId = requestAnimationFrame(animateTrafficMap);
}

function renderTrafficMapFrame() {
  const canvas = dom.trafficMapCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const dpr = window.devicePixelRatio || 1;

  ctx.clearRect(0, 0, width, height);

  // 1. Draw Lat/Lon Cyber Grid
  ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
  ctx.lineWidth = 1 * dpr;

  for (let lon = -180; lon <= 180; lon += 30) {
    const pt = projectGeo(0, lon, width, height);
    ctx.beginPath();
    ctx.moveTo(pt.x, 0);
    ctx.lineTo(pt.x, height);
    ctx.stroke();
  }

  for (let lat = -60; lat <= 80; lat += 20) {
    const pt = projectGeo(lat, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, pt.y);
    ctx.lineTo(width, pt.y);
    ctx.stroke();
  }

  // 2. Draw World Continents
  ctx.fillStyle = "rgba(23, 37, 64, 0.55)";
  ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
  ctx.lineWidth = 1.2 * dpr;

  CONTINENT_POLYGONS.forEach(poly => {
    ctx.beginPath();
    poly.forEach(([lon, lat], idx) => {
      const pt = projectGeo(lat, lon, width, height);
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  const flows = appState.geoMap.flows;
  const nodes = appState.geoMap.nodes;

  // 3. Update & Draw Animated Flows (Curved Flight Arcs with Photons)
  flows.forEach(flow => {
    const p1 = projectGeo(flow.srcGeo.lat, flow.srcGeo.lon, width, height);
    const p2 = projectGeo(flow.dstGeo.lat, flow.dstGeo.lon, width, height);

    // If source & destination project to the exact same spot (e.g. internal subnet communication), offset slightly
    let endX = p2.x;
    let endY = p2.y;
    if (Math.hypot(p2.x - p1.x, p2.y - p1.y) < 10) {
      endX += 18 * dpr;
      endY += 12 * dpr;
    }

    const midX = (p1.x + endX) / 2;
    const dist = Math.hypot(endX - p1.x, endY - p1.y);
    const arcHeight = Math.min(dist * 0.35, 110 * dpr);
    const ctrlX = midX;
    const ctrlY = Math.min(p1.y, endY) - arcHeight;

    // Draw Arc Path
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);

    if (flow.isThreat) {
      ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
      ctx.lineWidth = 2 * dpr;
    } else {
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1.2 * dpr;
    }
    ctx.stroke();

    // Draw Animated Traveling Photons
    flow.particles.forEach(pt => {
      pt.t += pt.speed;
      if (pt.t > 1) pt.t = 0;

      const t = pt.t;
      // Quadratic Bezier Formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const curX = Math.pow(1 - t, 2) * p1.x + 2 * (1 - t) * t * ctrlX + Math.pow(t, 2) * endX;
      const curY = Math.pow(1 - t, 2) * p1.y + 2 * (1 - t) * t * ctrlY + Math.pow(t, 2) * endY;

      ctx.beginPath();
      ctx.arc(curX, curY, (flow.isThreat ? 3.5 : 2.5) * dpr, 0, 2 * Math.PI);
      ctx.fillStyle = flow.isThreat ? "#f43f5e" : "#38bdf8";
      ctx.shadowColor = flow.isThreat ? "#f43f5e" : "#38bdf8";
      ctx.shadowBlur = 8 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });
  });

  // 4. Draw Geo Nodes & Radar Rings
  nodes.forEach(node => {
    const pt = projectGeo(node.lat, node.lon, width, height);
    node.screenX = pt.x;
    node.screenY = pt.y;
    node.radius = (node.isThreat ? 6 : 4.5) * dpr;

    const isHovered = appState.geoMap.hoveredNode === node;
    const isSelected = appState.geoMap.selectedNode === node.ip;

    // Pulse radar ring for threats
    if (node.isThreat) {
      const pulseSize = (node.radius + (appState.geoMap.time * 15) % 22) * dpr;
      const alpha = Math.max(0, 1 - (pulseSize / (28 * dpr)));
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pulseSize, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(244, 63, 94, ${alpha})`;
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();
    }

    // Node Outer Ring
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, node.radius + (isHovered || isSelected ? 4 : 2) * dpr, 0, 2 * Math.PI);
    ctx.fillStyle = node.isThreat 
      ? "rgba(244, 63, 94, 0.3)" 
      : (node.isLocal ? "rgba(56, 189, 248, 0.3)" : "rgba(16, 185, 129, 0.3)");
    ctx.fill();

    // Node Center
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, node.radius, 0, 2 * Math.PI);
    ctx.fillStyle = node.isThreat ? "#f43f5e" : (node.isLocal ? "#38bdf8" : "#10b981");
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = (isHovered || isSelected ? 2 : 1) * dpr;
    ctx.stroke();

    // City / Host Label
    ctx.font = `${Math.round(10 * dpr)}px monospace`;
    ctx.fillStyle = isHovered || isSelected ? "#ffffff" : "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText(node.city.split(" ")[0], pt.x, pt.y - node.radius - 4 * dpr);
  });
}

// ========================================================
// SOC INCIDENT REPORT GENERATOR
// ========================================================
function generateSocReport() {
  const summary = appState.analysisSummary || {};
  const alerts = appState.alerts || [];
  const caseId = `INC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

  let classification = "NORMAL_BASELINE";
  if (alerts.some(a => a.severity === "High")) classification = "HIGH_PRIORITY_INCIDENT";
  else if (alerts.length > 0) classification = "ELEVATED_INVESTIGATION_REQUIRED";

  const uniqueAttackTechniques = Array.from(new Set(alerts.filter(a => a.mitreId).map(a => `${a.mitreId}: ${a.mitreName} (${a.mitreTactic})`)));

  const report = `# SOC INCIDENT TRIAGE REPORT
**Case Reference ID:** ${caseId}  
**Classification:** ${classification}  
**Date of Triage:** ${new Date().toUTCString()}  
**Target File:** ${appState.currentFilename} (${appState.isDemo ? "Demo Dataset" : "Authorized User Capture"})

---

## 1. Executive Summary
During automated packet analysis, ${summary.totalPackets || 0} network frames were inspected across ${summary.uniqueSourcesCount || 0} unique source hosts.
A total of ${alerts.length} investigative anomaly alert(s) were triggered based on deterministic threshold violations.
All analysis was executed client-side in-browser in accordance with strict zero-telemetry privacy principles.

*Important Note:* Detections indicate activity worth investigating and do not constitute absolute proof of malicious compromise.

---

## 2. Affected Asset Inventory
- **Primary Initiating Host:** ${summary.mostActiveSource || "None"}
- **Dominant Contacted Target:** ${summary.mostContactedDest || "None"}
- **Primary Network Protocol:** ${summary.mostCommonProto || "None"}
- **Average Frame Size:** ${summary.avgPacketLen} Bytes

---

## 3. MITRE ATT&CK® Enterprise Alignment
${uniqueAttackTechniques.length > 0 
  ? uniqueAttackTechniques.map(t => `- **${t}**`).join("\n")
  : "_No MITRE ATT&CK techniques flagged._"}

---

## 4. Itemized Findings & Threat Evidence
${alerts.length > 0 
  ? alerts.map((a, i) => `### Alert ${i + 1}: ${a.name} [Severity: ${a.severity}]
- **Source Host:** \`${a.source}\`
- **Destination:** \`${a.destination}\`
- **Observed:** ${a.observed} (${a.threshold})
- **Why It Matters:** ${a.whyItMatters}
- **Benign Explanations:**
${a.benignExplanations.map(b => `  - ${b}`).join("\n")}
- **Recommended Investigation:**
${a.investigations.map(inv => `  - ${inv}`).join("\n")}
`).join("\n")
  : "_No anomalies observed. Baseline activity confirmed._"}

---

## 5. SOC Analyst Remediation & Containment Checklist
- [ ] 1. Identify owner and designated role of host \`${summary.mostActiveSource}\`.
- [ ] 2. Cross-reference network timestamp with endpoint EDR process execution logs.
- [ ] 3. Validate whether network scanning or high-volume transfers were pre-approved.
- [ ] 4. If periodic beaconing or exfiltration is confirmed, isolate the host adapter immediately.
- [ ] 5. Preserve volatile memory and capture full PCAP stream if further forensics are needed.
`;

  if (dom.reportPreviewText) {
    dom.reportPreviewText.textContent = report;
  }
}

function showMissingWarning(msg) {
  if (!dom.missingWarning) return;
  dom.missingWarning.textContent = msg;
  dom.missingWarning.classList.remove("hidden");
}

function hideMissingWarning() {
  if (!dom.missingWarning) return;
  dom.missingWarning.textContent = "";
  dom.missingWarning.classList.add("hidden");
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}
