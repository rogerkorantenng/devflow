from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import ConnectedService
from pydantic import BaseModel

router = APIRouter(prefix="/services", tags=["services"])


class ServiceConnect(BaseModel):
    service: str
    user_id: int = 1


@router.get("")
async def list_services(user_id: int = 1, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ConnectedService).where(ConnectedService.user_id == user_id)
    )
    services = result.scalars().all()
    return {
        "services": [
            {
                "id": s.id,
                "service": s.service,
                "status": s.status,
                "connected_at": str(s.connected_at),
                "last_used_at": str(s.last_used_at) if s.last_used_at else None,
            }
            for s in services
        ]
    }


@router.post("")
async def connect_service(data: ServiceConnect, db: AsyncSession = Depends(get_db)):
    svc = ConnectedService(
        user_id=data.user_id, service=data.service, status="active"
    )
    db.add(svc)
    await db.commit()
    await db.refresh(svc)
    return {"id": svc.id, "service": svc.service, "status": svc.status}


@router.delete("/{service_name}")
async def disconnect_service(
    service_name: str, user_id: int = 1, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(ConnectedService).where(
            ConnectedService.user_id == user_id,
            ConnectedService.service == service_name,
        )
    )
    svc = result.scalar_one_or_none()
    if svc:
        svc.status = "revoked"
        await db.commit()
    return {"disconnected": True}
