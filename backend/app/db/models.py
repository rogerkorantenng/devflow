from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.db.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False, index=True)
    created_at = Column(DateTime, server_default=func.now())


class ConnectedService(Base):
    __tablename__ = "connected_services"
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, index=True)
    service = Column(String, nullable=False)
    status = Column(String, default="active")
    connected_at = Column(DateTime, server_default=func.now())
    last_used_at = Column(DateTime, nullable=True)


class Workflow(Base):
    __tablename__ = "workflows"
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    definition = Column(JSON, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class WorkflowRun(Base):
    __tablename__ = "workflow_runs"
    id = Column(Integer, primary_key=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    status = Column(String, default="running")
    started_at = Column(DateTime, server_default=func.now())
    completed_at = Column(DateTime, nullable=True)
    paused_at_node = Column(String, nullable=True)
    results = Column(JSON, default=dict)


class ActivityLog(Base):
    __tablename__ = "activity_log"
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, index=True)
    service = Column(String, nullable=False)
    action = Column(String, nullable=False)
    scope_used = Column(String, default="")
    step_up_required = Column(Boolean, default=False)
    step_up_approved = Column(Boolean, nullable=True)
    timestamp = Column(DateTime, server_default=func.now())
    details = Column(JSON, default=dict)
