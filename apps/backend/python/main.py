from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.scraper import get_flood_data
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

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
