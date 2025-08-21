<?php

namespace App\Console\Commands;

use App\Services\RethinkService;
use Illuminate\Console\Command;

class SeedRethinkDB extends Command
{
    protected $signature = 'rethinkdb:seed';
    protected $description = 'Seed RethinkDB with initial tasks';

    public function handle()
    {
        $this->info('Starting to seed RethinkDB');
        try {
            $rethinkService = app(RethinkService::class);
            $defaultTasks = [
                [
                    'title'=> 'Make user login system',
                    'description'=> 'Build login and signup pages for users',
                    'status'=> 'Done'
                ],
                [
                    'title'=> 'Design database tables',
                    'description'=> 'Create tables for users and their tasks',
                    'status'=> 'In Progress'
                ],
                [
                    'title'=> 'Add API protection',
                    'description'=> 'Stop people from making too many requests',
                    'status'=> 'Pending'
                ],
                [
                    'title'=> 'Send email alerts',
                    'description'=> 'Tell users when their tasks change',
                    'status'=> 'Pending'
                ],
                [
                    'title'=> 'Make it work on phones',
                    'description'=> 'Check that the website looks good on mobile',
                    'status'=> 'In Progress'
                ],
                [
                    'title'=> 'Make it faster',
                    'description'=> 'Use caching to load pages quicker',
                    'status'=> 'Pending'
                ],
                [
                    'title'=> 'Write tests',
                    'description'=> 'Create tests to check everything works',
                    'status'=> 'Pending'
                ],
                [
                    'title'=> 'Set up automatic deployment',
                    'description'=> 'Make the app deploy itself when we push code',
                    'status'=> 'Pending'
                ]];


            foreach ($defaultTasks as $task) {
                $createdTask = $rethinkService->createTask($task);
                if ($createdTask) {
                        $this->line("Created task {$task['title']}");
                } else {
                        $this->error("Failed to create task {$task['title']}");
                }
            }

                $this->info('RethinkDB seeding completed');
            
        } catch (\Exception $e) {
            $this->error('Error seeding RethinkDB' . $e->getMessage());
            return 1;
        }
        return 0;
    }
}
