from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.db.database import get_db
from app.db.models import ActivityLog
from typing import Optional

router = APIRouter(prefix="/activity", tags=["activity"])


@router.get("")
async def list_activity(
    user_id: int = 1,
    service: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    db: AsyncSession = Depends(get_db),
):
    query = (
        select(ActivityLog)
        .where(ActivityLog.user_id == user_id)
        .order_by(desc(ActivityLog.timestamp))
        .limit(limit)
    )
    if service:
        query = query.where(ActivityLog.service == service)
    result = await db.execute(query)
    entries = result.scalars().all()
    return {
        "entries": [
            {
                "id": e.id,
                "service": e.service,
                "action": e.action,
                "scope_used": e.scope_used,
                "step_up_required": e.step_up_required,
                "step_up_approved": e.step_up_approved,
                "timestamp": str(e.timestamp),
                "details": e.details,
            }
            for e in entries
        ]
    }
