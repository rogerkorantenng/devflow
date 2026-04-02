import json
from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional
from app.db.database import get_connection

router = APIRouter(prefix="/workflows", tags=["workflows"])


class WorkflowCreate(BaseModel):
    name: str
    definition: dict
    username: str = "default"


class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    definition: Optional[dict] = None
    is_active: Optional[bool] = None


@router.get("")
def list_workflows(username: str = Query("default")):
    conn = get_connection()
    rows = conn.execute(
        "SELECT id, name, definition, is_active, created_at, updated_at FROM workflows WHERE username = ?",
        (username,),
    ).fetchall()
    conn.close()
    return {
        "workflows": [
            {
                "id": r["id"],
                "name": r["name"],
                "definition": json.loads(r["definition"]),
                "is_active": bool(r["is_active"]),
                "created_at": r["created_at"],
                "updated_at": r["updated_at"],
            }
            for r in rows
        ]
    }


@router.get("/{workflow_id}")
def get_workflow(workflow_id: int):
    conn = get_connection()
    r = conn.execute(
        "SELECT id, name, definition, is_active, created_at, updated_at FROM workflows WHERE id = ?",
        (workflow_id,),
    ).fetchone()
    conn.close()
    if not r:
        return {"error": "Not found"}
    return {
        "id": r["id"],
        "name": r["name"],
        "definition": json.loads(r["definition"]),
        "is_active": bool(r["is_active"]),
        "created_at": r["created_at"],
        "updated_at": r["updated_at"],
    }


@router.post("")
def create_workflow(data: WorkflowCreate):
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO workflows (username, name, definition) VALUES (?, ?, ?)",
        (data.username, data.name, json.dumps(data.definition)),
    )
    conn.commit()
    wf_id = cursor.lastrowid
    conn.close()
    return {"id": wf_id, "name": data.name}


@router.put("/{workflow_id}")
def update_workflow(workflow_id: int, data: WorkflowUpdate):
    conn = get_connection()
    updates = []
    params = []
    if data.name is not None:
        updates.append("name = ?")
        params.append(data.name)
    if data.definition is not None:
        updates.append("definition = ?")
        params.append(json.dumps(data.definition))
    if data.is_active is not None:
        updates.append("is_active = ?")
        params.append(int(data.is_active))
    if updates:
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(workflow_id)
        conn.execute(
            f"UPDATE workflows SET {', '.join(updates)} WHERE id = ?", params
        )
        conn.commit()
    conn.close()
    return {"id": workflow_id, "updated": True}


@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int):
    conn = get_connection()
    conn.execute("DELETE FROM workflows WHERE id = ?", (workflow_id,))
    conn.commit()
    conn.close()
    return {"deleted": True}
