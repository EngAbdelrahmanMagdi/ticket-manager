<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'required|string',
            'status' => 'required|in:Pending,In Progress,Done'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'title.max' => 'Task title cannot exceed 100 characters',
            'description.required' => 'Task description is required',
            'status.required' => 'Task status is required',
            'status.in' => 'Task status must be Pending, In Progress, or Done'
        ];
    }
}
