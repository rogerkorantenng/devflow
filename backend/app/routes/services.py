from fastapi import APIRouter, Query
from pydantic import BaseModel
from app.db.database import get_connection

router = APIRouter(prefix="/services", tags=["services"])


class ServiceConnect(BaseModel):
    service: str
    username: str = "default"


@router.get("")
def list_services(username: str = Query("default")):
    conn = get_connection()
    rows = conn.execute(
        "SELECT id, service, status, connected_at, last_used_at FROM connected_services WHERE username = ?",
        (username,),
    ).fetchall()
    conn.close()
    return {
        "services": [
            {
                "id": r["id"],
                "service": r["service"],
                "status": r["status"],
                "connected_at": r["connected_at"],
                "last_used_at": r["last_used_at"],
            }
            for r in rows
        ]
    }


@router.post("")
def connect_service(data: ServiceConnect):
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO connected_services (username, service, status) VALUES (?, ?, 'active')",
        (data.username, data.service),
    )
    conn.commit()
    svc_id = cursor.lastrowid
    conn.close()
    return {"id": svc_id, "service": data.service, "status": "active"}


@router.delete("/{service_name}")
def disconnect_service(service_name: str, username: str = Query("default")):
    conn = get_connection()
    conn.execute(
        "UPDATE connected_services SET status = 'revoked' WHERE username = ? AND service = ?",
        (username, service_name),
    )
    conn.commit()
    conn.close()
    return {"disconnected": True}
