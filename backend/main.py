from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import requests

# from database import get_connection  # ❌ artık doğrudan DB kullanılmayacak

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme için her yerden erişim izni
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase REST API bilgileri
SUPABASE_URL = "https://causweuhihdqbfpgkqxi.supabase.co"  # ← kendi URL’inle değiştir
SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdXN3ZXVoaWhkcWJmcGdrcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDUzMjEsImV4cCI6MjA3NjgyMTMyMX0.HDZLxQpPKbLri3wmZssBfLdJPDsqxh8_XBOprxCI8s8"  # ← kendi anon key’inle değiştir

@app.get("/api/tasks")
def get_tasks():
    try:
        # ✅ REST API üzerinden veri çekiyoruz
        url = f"{SUPABASE_URL}/rest/v1/tasks?select=*"
        headers = {
            "apikey": SUPABASE_API_KEY,
            "Authorization": f"Bearer {SUPABASE_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return {"tasks": response.json()}
        else:
            return {"error": f"{response.status_code}: {response.text}"}

    except Exception as e:
        return {"error": str(e)}

    # ❌ Eski psycopg2 tabanlı bağlantı — devre dışı bırakıldı
