<?php

namespace App\Http\Controllers;

use App\Services\RethinkService;
use App\Http\Requests\CreateTaskRequest;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    protected $rethinkService;

    public function __construct(RethinkService $rethinkService)
    {
        $this->rethinkService = $rethinkService;
    }

    public function index(): JsonResponse
    {
        $tasks = $this->rethinkService->getAllTasks();
        return response()->json($tasks);
    }

    public function store(CreateTaskRequest $request): JsonResponse
    {
        $taskData = $request->only(['title', 'description', 'status']);
        $task = $this->rethinkService->createTask($taskData);
        if ($task) {
            return response()->json($task, 201);
        }
        return response()->json(['error'=> 'Failed to create task'], 500);
    }
}
