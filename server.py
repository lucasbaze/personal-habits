from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DB_PATH = 'habits.db'

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL,      -- 'daily', 'weekly', 'monthly', 'yearly'
                category TEXT NOT NULL,  -- 'personal' or 'work'
                company TEXT            -- NULL for personal habits
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS habit_completions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                habit_id INTEGER NOT NULL,
                completed_at TIMESTAMP NOT NULL,
                FOREIGN KEY (habit_id) REFERENCES habits (id)
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL,
                completed_at TIMESTAMP
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scratch_notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                updated_at TIMESTAMP NOT NULL
            )
        ''')
        
        conn.commit()

# Habit endpoints
@app.route('/habits', methods=['GET'])
def get_habits():
    category = request.args.get('category')  # 'personal' or 'work'
    habit_type = request.args.get('type')    # 'daily', 'weekly', 'monthly', 'yearly'
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        query = '''
            SELECT h.id, h.name, h.category, h.type, h.company,
                   (SELECT completed_at 
                    FROM habit_completions hc 
                    WHERE hc.habit_id = h.id 
                    AND DATE(hc.completed_at) = DATE('now')
                    LIMIT 1) as completed_today
            FROM habits h
            WHERE h.category = ? AND h.type = ?
        '''
        cursor.execute(query, (category, habit_type))
        habits = cursor.fetchall()
        
        return jsonify([{
            'id': h[0],
            'name': h[1],
            'category': h[2],
            'type': h[3],
            'company': h[4],
            'completed': h[5] is not None
        } for h in habits])

@app.route('/habits/complete', methods=['POST'])
def complete_habit():
    data = request.json
    habit_id = data.get('habit_id')
    completed = data.get('completed', True)
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        if completed:
            cursor.execute(
                'INSERT INTO habit_completions (habit_id, completed_at) VALUES (?, ?)',
                (habit_id, datetime.now())
            )
        else:
            cursor.execute(
                'DELETE FROM habit_completions WHERE habit_id = ? AND DATE(completed_at) = DATE(?)',
                (habit_id, datetime.now())
            )
        conn.commit()
        
    return jsonify({'success': True})

# Task endpoints
@app.route('/tasks', methods=['GET'])
def get_tasks():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, text, completed, created_at, completed_at
            FROM tasks
            ORDER BY created_at DESC
        ''')
        tasks = cursor.fetchall()
        
        return jsonify([{
            'id': t[0],
            'text': t[1],
            'completed': bool(t[2]),
            'created_at': t[3],
            'completed_at': t[4]
        } for t in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    text = data.get('text')
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO tasks (text, created_at) VALUES (?, ?)',
            (text, datetime.now())
        )
        conn.commit()
        
    return jsonify({'success': True})

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    completed = data.get('completed')
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        if completed:
            cursor.execute(
                'UPDATE tasks SET completed = ?, completed_at = ? WHERE id = ?',
                (completed, datetime.now(), task_id)
            )
        else:
            cursor.execute(
                'UPDATE tasks SET completed = ?, completed_at = NULL WHERE id = ?',
                (completed, task_id)
            )
        conn.commit()
        
    return jsonify({'success': True})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
        conn.commit()
        
    return jsonify({'success': True})

# Scratch notes endpoints
@app.route('/notes', methods=['GET'])
def get_notes():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT content FROM scratch_notes ORDER BY updated_at DESC LIMIT 1')
        result = cursor.fetchone()
        
        return jsonify({'content': result[0] if result else ''})

@app.route('/notes', methods=['POST'])
def update_notes():
    data = request.json
    content = data.get('content')
    
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO scratch_notes (content, updated_at) VALUES (?, ?)',
            (content, datetime.now())
        )
        conn.commit()
        
    return jsonify({'success': True})

if __name__ == '__main__':
    init_db()
    app.run(port=5000) 