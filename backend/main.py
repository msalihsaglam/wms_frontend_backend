from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database import get_connection

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme için her yerden erişim izni
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/tasks")
def get_tasks():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            SELECT 
                id, 
                description, 
                status, 
                priority, 
                location_from, 
                location_to, 
                assigned_to, 
                created_at 
            FROM tasks 
            ORDER BY priority ASC, created_at ASC
        """)
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        tasks = []
        for row in rows:
            tasks.append({
                "id": row[0],
                "description": row[1],
                "status": row[2],
                "priority": row[3],
                "location_from": row[4],
                "location_to": row[5],
                "assigned_to": row[6],
                "created_at": row[7].isoformat() if row[7] else None
            })
        return {"tasks": tasks}
    except Exception as e:
        return {"error": str(e)}
