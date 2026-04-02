from fastapi import APIRouter, Query
from typing import Optional
from app.db.database import get_connection

router = APIRouter(prefix="/activity", tags=["activity"])


@router.get("")
def list_activity(
    username: str = Query("default"),
    service: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
):
    conn = get_connection()
    query = "SELECT id, service, action, scope_used, step_up_required, step_up_approved, timestamp, details FROM activity_log WHERE username = ?"
    params: list = [username]
    if service:
        query += " AND service = ?"
        params.append(service)
    query += " ORDER BY timestamp DESC LIMIT ?"
    params.append(limit)
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return {
        "entries": [
            {
                "id": r["id"],
                "service": r["service"],
                "action": r["action"],
                "scope_used": r["scope_used"],
                "step_up_required": bool(r["step_up_required"]),
                "step_up_approved": bool(r["step_up_approved"]) if r["step_up_approved"] is not None else None,
                "timestamp": r["timestamp"],
                "details": r["details"],
            }
            for r in rows
        ]
    }
