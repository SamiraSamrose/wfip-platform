# WFIP Backend

## Quick Start
```bash
pip install -r requirements.txt
playwright install chromium
python wfip_server.py server

## Requirements
fastapi==0.104.1
uvicorn[standard]==0.24.0
aiohttp==3.9.1
playwright==1.40.0
pydantic==2.5.0
python-multipart==0.0.6

## backend/.env.example
DATABASE_URL=sqlite:///./wfip.db
GITHUB_TOKEN=your_github_token_here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/.../WEBHOOK/URL
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/.../WEBHOOK/URL
MIN_COMPLIANCE_SCORE=80.0
