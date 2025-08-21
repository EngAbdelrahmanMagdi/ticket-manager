<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\RethinkService;

class ClearRethinkDB extends Command
{
    protected $signature = 'rethinkdb:clear';
    protected $description = 'Clear all tasks from RethinkDB by dropping and recreating the table';

    public function handle()
    {
        $this->info('Starting to clear RethinkDB');
        try {
            $rethinkService = app(RethinkService::class);
            $tasks = $rethinkService->getAllTasks();
            $taskCount = count($tasks);
            $this->info("Found {$taskCount} tasks. Dropping and recreating table");
            $rethinkService->dropTable();
            $rethinkService->ensureTableExists();
            
            $this->info("Successfully cleared RethinkDB. Table dropped and recreated");
            $this->info("{$taskCount} tasks removed");
            
        } catch (\Exception $e) {
            $this->error('Error clearing RethinkDB' . $e->getMessage());
        }
    }
}
