import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).parent.parent.parent / "devflow.db"


def get_connection():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_connection()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS connected_services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            service TEXT NOT NULL,
            status TEXT DEFAULT 'active',
            connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_used_at TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS workflows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            name TEXT NOT NULL,
            definition TEXT NOT NULL,
            is_active INTEGER DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS workflow_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workflow_id INTEGER NOT NULL,
            status TEXT DEFAULT 'running',
            started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP,
            paused_at_node TEXT,
            results TEXT DEFAULT '{}'
        );
        CREATE TABLE IF NOT EXISTS activity_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            service TEXT NOT NULL,
            action TEXT NOT NULL,
            scope_used TEXT DEFAULT '',
            step_up_required INTEGER DEFAULT 0,
            step_up_approved INTEGER,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            details TEXT DEFAULT '{}'
        );
        CREATE INDEX IF NOT EXISTS idx_services_username ON connected_services(username);
        CREATE INDEX IF NOT EXISTS idx_workflows_username ON workflows(username);
        CREATE INDEX IF NOT EXISTS idx_activity_username ON activity_log(username);
    """)
    conn.close()
