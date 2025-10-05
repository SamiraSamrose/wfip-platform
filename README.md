# WFIP (Web Feature Intelligence Platform)

**It is a production-ready, full-stack compatibility intelligence system that integrates MDN Baseline data with developer workflows to eliminate web compatibility issues before they reach users. By combining automated code scanning, real-time risk assessment and CI/CD enforcement, WFIP transforms browser compatibility from a reactive debugging problem into a proactive, data-driven development practice reducing compatibility bugs, preventing millions in lost revenue and enabling teams to confidently adopt modern web features while maintaining global accessibility across diverse browser ecosystems.

The platform serves three primary personas:

Engineers: Get real-time compatibility warnings while coding
Product Managers: Visualize technical debt and prioritize remediation
Leadership: Track compliance metrics and demonstrate ROI

By integrating directly into development workflows (linters, transpilers, CI/CD, IDEs), WFIP makes Baseline compatibility data actionable at every stage—from local development through production monitoring.**

- Demo: `https://samirasamrose.github.io/wfip-platform/`
- Code Repository: `https://github.com/SamiraSamrose/wfip-platform`
- Video: `https://youtu.be/OgQlscXUK2Y`


## Features

1. Real MDN Baseline Data Integration
- MDNBaselineDataStore class fetches from caniuse API and MDN BCD
- Real-time browser compatibility data
- Caching mechanism for performance
- Support percentage calculations based on actual market data

2. Playwright Crawler
- PlaywrightCrawler class for live website scanning
- Recursive crawling with depth control
- CSS, JavaScript, and HTML extraction
- Same-origin link following
- Configurable page limits

3. FastAPI REST API 
- Complete RESTful API with 12+ endpoints
- Interactive documentation at /docs
- CORS support for frontend
- Background task processing
- Health check endpoints

4. React Dashboard with D3.js/Recharts 
- Clean, modern UI with Tailwind CSS
- 4 main tabs: Overview, Features, Heatmap, History
- Real-time charts and visualizations
- Risk distribution pie charts
- Compliance trend line charts
- UI comparison bar charts
- Responsive design

5. Complete Integrations 
- GitHub Actions: Auto-comment on PRs with compliance reports
- Slack Webhooks: Real-time notifications with rich formatting
- Microsoft Teams: Adaptive card notifications
- CI/CD: Build failure on low compliance
- GitLab CI: Full pipeline integration

## Project Does,
- Scan Projects: POST /scan to analyze any codebase
- Crawl Websites: POST /crawl to scan live sites
- Risk Assessment: GET /risk/{feature} for any web feature
- Organization Heatmaps: See technical debt across all UIs
- CI/CD Enforcement: Fail builds on non-compliant code
- Auto PR Comments: GitHub bot comments with recommendations
- Team Notifications: Slack/Teams alerts on scan completion



## Use Cases
- **E-Commerce Platform - Global Marketplace**: Large online retailer (think Amazon, eBay scale)
- **SaaS Company - B2B Dashboard**: Project management tool (like Asana, Monday.com)
- **News Media - Global Audience**: International news organization (like BBC, CNN)
- **Financial Services - Regulatory Compliance**: Online banking platform

## Tech Stack
- **Backend**: Python, FastAPI 0.104+, Uvicorn, React 18, Playwright
- **Frontend**: React 18, Tailwind CSS 3.0+, Recharts
- **Icons**: Lucide React
- **Data Pipeline**: MDN BCD (GitHub raw JSON), caniuse.com, StatCounter API, JSON


##  Quick Start 
### Backend
 ```bash 
cd backend 
pip install -r requirements.txt 
playwright install chromium 
python wfip_server.py server

### Frontend
cd frontend
npm install
npm start

# Access: 
API: http://localhost:8000
Docs: http://localhost:8000/docs
Dashboard: http://localhost:3000


