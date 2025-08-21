<?php

namespace App\Services;
use r\Connection;

class RethinkService
{
    protected $connection;
    protected $dbName = 'taskmanager';
    protected $tableName = 'tasks';

    public function __construct()
    {
        $this->connection = new Connection(
            env('RETHINKDB_HOST', 'localhost'),
            env('RETHINKDB_PORT', 32768),
            $this->dbName
        );
            $this->ensureDatabaseAndTableExist();
    }

    protected function ensureDatabaseAndTableExist()
    {
        try {
            $this->connection->useDb('rethinkdb');
            $this->connection->run(\r\dbCreate($this->dbName));
        } catch (\Exception $e) {
            \Log::info('RethinkDB: Database might already exist: ' . $e->getMessage());
        }

        try {
            $this->connection->useDb($this->dbName);
            $this->connection->run(\r\tableCreate($this->tableName));
        } catch (\Exception $e) {
            \Log::info('RethinkDB: Table might already exist' . $e->getMessage());
        }
        $this->connection->useDb($this->dbName);
    }

    public function dropTable()
    {
        try {
            $this->connection->useDb($this->dbName);
            $this->connection->run(\r\tableDrop($this->tableName));
            return true;
        } catch (\Exception $e) {
            \Log::info('RethinkDB: Table might not exist' . $e->getMessage());
            return false;
        }
    }

    public function ensureTableExists()
    {
        try {
            $this->connection->useDb($this->dbName);
            $this->connection->run(\r\tableCreate($this->tableName));
            return true;
        } catch (\Exception $e) {
            \Log::info('RethinkDB: Table might already exist' . $e->getMessage());
            return false;
        }
    }

    public function getAllTasks()
    {
        try {
            $result = $this->connection->run(\r\table($this->tableName));
            return $result ? $result->toArray() : [];
        } catch (\Exception $e) {
            \Log::error('RethinkDB getAllTasks error' . $e->getMessage());
            return [];
        }
    }

    public function createTask($taskData)
    {
        try {
            $taskData['id'] = $this->generateId();
            $taskData['created_at'] = now()->toISOString();
            $taskData['updated_at'] = now()->toISOString();
            $result = $this->connection->run(\r\table($this->tableName)->insert($taskData));
            if ($result && isset($result['inserted']) && $result['inserted'] > 0) {
                return $taskData;
            }
            
            return null;
        } catch (\Exception $e) {
            \Log::error('RethinkDB createTask error' . $e->getMessage());
            return null;
        }
    }

    protected function generateId()
    {
        return uniqid('task_', true);
    }
}
