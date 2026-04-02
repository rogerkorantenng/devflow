from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import Workflow, WorkflowRun
from pydantic import BaseModel
from typing import Optional

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
async def list_workflows(
    username: str = Query("default"), db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Workflow).where(Workflow.username == username)
    )
    workflows = result.scalars().all()
    return {
        "workflows": [
            {
                "id": w.id,
                "name": w.name,
                "definition": w.definition,
                "is_active": w.is_active,
                "created_at": str(w.created_at),
                "updated_at": str(w.updated_at),
            }
            for w in workflows
        ]
    }


@router.get("/{workflow_id}")
async def get_workflow(workflow_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Workflow).where(Workflow.id == workflow_id))
    w = result.scalar_one_or_none()
    if not w:
        return {"error": "Not found"}
    return {
        "id": w.id,
        "name": w.name,
        "definition": w.definition,
        "is_active": w.is_active,
        "created_at": str(w.created_at),
        "updated_at": str(w.updated_at),
    }


@router.post("")
async def create_workflow(data: WorkflowCreate, db: AsyncSession = Depends(get_db)):
    workflow = Workflow(
        username=data.username, name=data.name, definition=data.definition
    )
    db.add(workflow)
    await db.commit()
    await db.refresh(workflow)
    return {"id": workflow.id, "name": workflow.name}


@router.put("/{workflow_id}")
async def update_workflow(
    workflow_id: int, data: WorkflowUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Workflow).where(Workflow.id == workflow_id))
    workflow = result.scalar_one_or_none()
    if not workflow:
        return {"error": "Workflow not found"}
    if data.name is not None:
        workflow.name = data.name
    if data.definition is not None:
        workflow.definition = data.definition
    if data.is_active is not None:
        workflow.is_active = data.is_active
    await db.commit()
    return {"id": workflow.id, "name": workflow.name, "updated": True}


@router.delete("/{workflow_id}")
async def delete_workflow(workflow_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Workflow).where(Workflow.id == workflow_id))
    workflow = result.scalar_one_or_none()
    if workflow:
        await db.delete(workflow)
        await db.commit()
    return {"deleted": True}


@router.get("/{workflow_id}/runs")
async def list_workflow_runs(workflow_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(WorkflowRun).where(WorkflowRun.workflow_id == workflow_id)
    )
    runs = result.scalars().all()
    return {
        "runs": [
            {
                "id": r.id,
                "status": r.status,
                "started_at": str(r.started_at),
                "completed_at": str(r.completed_at),
                "paused_at_node": r.paused_at_node,
            }
            for r in runs
        ]
    }
