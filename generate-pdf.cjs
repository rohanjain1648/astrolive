const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');

// File paths
const reportMdPath = 'C:\\Users\\ACER\\.gemini\\antigravity-ide\\brain\\d01b2461-4207-434c-9926-2641d5447d05\\AstroLive_Cosmic_DNA_Project_Report.md';
const tempHtmlPath = path.join(__dirname, 'AstroLive_Cosmic_DNA_Project_Report.html');
const outputPdfPath = path.join(__dirname, 'AstroLive_Cosmic_DNA_Project_Report.pdf');

console.log('Reading Markdown report...');
if (!fs.existsSync(reportMdPath)) {
  console.error(`Report file not found at: ${reportMdPath}`);
  process.exit(1);
}

const mdContent = fs.readFileSync(reportMdPath, 'utf8');

console.log('Converting Markdown to HTML...');
const htmlBody = marked(mdContent);

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AstroLive — Cosmic DNA Project Report</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #7c3aed;
      --secondary: #ec4899;
      --gold: #f59e0b;
      --text: #1e293b;
      --text-light: #64748b;
      --border: #e2e8f0;
      --bg-light: #f8fafc;
    }
    
    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      line-height: 1.7;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }

    /* Print settings */
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }

    /* Header & Footer simulation */
    header {
      font-size: 8pt;
      color: var(--text-light);
      border-bottom: 1px solid var(--border);
      padding-bottom: 5px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }

    /* Section Styling */
    h1, h2, h3, h4 {
      font-family: 'Cinzel', serif;
      color: #0f172a;
      page-break-after: avoid;
      font-weight: 700;
    }

    h1 {
      font-size: 22pt;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 8px;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 16pt;
      color: #1e1b4b;
      border-bottom: 1px solid var(--border);
      padding-bottom: 6px;
      margin-top: 25px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 13pt;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    p {
      margin-top: 0;
      margin-bottom: 15px;
      text-align: justify;
    }

    /* Lists */
    ul, ol {
      margin-top: 0;
      margin-bottom: 15px;
      padding-left: 25px;
    }

    li {
      margin-bottom: 6px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      page-break-inside: avoid;
      font-size: 9.5pt;
    }

    th, td {
      border: 1px solid var(--border);
      padding: 10px 12px;
      text-align: left;
    }

    th {
      background-color: var(--bg-light);
      color: #0f172a;
      font-weight: 600;
    }

    tr:nth-child(even) td {
      background-color: #fdfdfd;
    }

    /* Blockquotes */
    blockquote {
      margin: 15px 0;
      padding: 10px 20px;
      background-color: #faf5ff;
      border-left: 4px solid var(--primary);
      color: #5b21b6;
      font-style: italic;
    }

    /* Code blocks & Pre */
    pre, code {
      font-family: 'Orbitron', monospace;
      font-size: 9pt;
      background-color: var(--bg-light);
      border-radius: 4px;
    }

    code {
      padding: 2px 6px;
      border: 1px solid var(--border);
      color: #b91c1c;
    }

    pre {
      padding: 15px;
      border: 1px solid var(--border);
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 20px 0;
      page-break-inside: avoid;
    }

    pre code {
      padding: 0;
      border: none;
      background: none;
      color: #1e293b;
    }

    /* Helpers */
    .text-center { text-align: center; }
    .page-break { page-break-before: always; }
    
    /* Cover Page */
    .cover {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px;
      page-break-after: always;
    }

    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 28pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 10px;
      line-height: 1.2;
    }

    .cover-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 14pt;
      color: var(--text-light);
      margin-bottom: 40px;
      font-weight: 300;
    }

    .cover-divider {
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      margin-bottom: 40px;
    }

    .cover-meta {
      font-size: 10pt;
      color: var(--text-light);
      margin-top: 80px;
      line-height: 1.8;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover">
    <div style="font-family: 'Orbitron', sans-serif; font-size: 10pt; color: var(--primary); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px; font-weight: 700;">
      AstroLive Hackathon Submission
    </div>
    <div class="cover-title">COSMIC DNA</div>
    <div class="cover-subtitle">AI-Powered Astro-Social Growth Engine & Platform Evolution</div>
    <div class="cover-divider"></div>
    
    <div style="max-width: 500px; margin: 0 auto; font-size: 11pt; color: var(--text); line-height: 1.6;">
      A Comprehensive Product Teardown, Strategic Growth Architecture, and Technical Implementation Report on Transforming Transactional Astrology into a Retention-Led Viral Ecosystem.
    </div>

    <div class="cover-meta">
      <strong>Engineering Track</strong>: Core Product Growth & Monetization<br>
      <strong>Author</strong>: Senior Product Architect & Full-Stack Engineer<br>
      <strong>Target Platform</strong>: AstroLive (astrolive.app)<br>
      <strong>Date</strong>: August 2026
    </div>
  </div>

  <!-- Document Header for internal pages -->
  <header>
    <span>AstroLive Cosmic DNA — Project Report</span>
    <span>August 2026</span>
  </header>

  <!-- Report Body -->
  <div class="report-body">
    ${htmlBody}
  </div>

</body>
</html>
`;

console.log('Writing HTML file...');
fs.writeFileSync(tempHtmlPath, htmlTemplate, 'utf8');

console.log('Rendering HTML to PDF using Chrome Headless...');
const chromePath = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const chromeCmd = `${chromePath} --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPdfPath}" "${tempHtmlPath}"`;

try {
  execSync(chromeCmd);
  console.log(`Successfully generated PDF at: ${outputPdfPath}`);
  
  // Cleanup temporary HTML file
  fs.unlinkSync(tempHtmlPath);
  console.log('Temporary HTML file cleaned up.');
} catch (error) {
  console.error('Error generating PDF via Chrome:', error.message);
  process.exit(1);
}
