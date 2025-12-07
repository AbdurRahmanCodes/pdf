from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from services.scraper import get_flood_data
from services.chat_engine import chat_engine
import uvicorn


app = FastAPI(title="FloodWatch API", description="Backend for scraping river level data")

# CORS - Allow Frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, verify specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "FloodWatch Python Backend"}

@app.get("/api/flood-data")
def read_flood_data():
    """
    Returns the latest river/dam levels.
    Cached for 1 hour. Scrapes PDF if cache is old.
    """
    return get_flood_data()

@app.get("/api/chat")
def chat(query: str):
    """
    AI Analyst: Searches historical database for query.
    """
    response = chat_engine.ask(query)
    return {"response": response}

@app.get("/api/history-risk")
def history_risk(location: str):
    """
    Returns historical risk context for a location.
    """
    risk_summary = chat_engine.get_location_summary(location)
    return {"risk_analysis": risk_summary}


# Temporarily disabled until reportlab is properly installed
# @app.get("/api/generate-report")
# def generate_report():
#     """
#     Generate comprehensive PDF report with all flood/weather data.
#     Returns PDF file for download.
#     """
#     # Get latest flood data
#     flood_data = get_flood_data()
#     
#     # Generate PDF
#     pdf_buffer = generate_pdf_report(flood_data)
#     
#     # Return as downloadable file
#     from datetime import datetime
#     filename = f"NDMA_Alert_Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
#     
#     return StreamingResponse(
#         pdf_buffer,
#         media_type="application/pdf",
#         headers={
#             "Content-Disposition": f"attachment; filename={filename}"
#         }
#     )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
