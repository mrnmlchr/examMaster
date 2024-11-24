<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModulesController extends Controller
{
    public function index(Request $request)
    {
        $num_per_page = 10;

        // Get the requested page number, default to 1
        $page = $request->query('page', 1);

        // Fetch modules from the database with pagination
        $modules = DB::table('modules')
            ->orderBy('created_at', 'DESC') // Adjust 'created_at' to your actual timestamp column
            ->paginate($num_per_page, ['*'], 'page', $page);

        return response()->json([
            'modules' => $modules->items(),
            'total_pages' => $modules->lastPage(),
            'current_page' => $modules->currentPage(),
        ]);
    }

    public function upload(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'file' => 'required|file|mimes:pdf,doc,docx|max:2048', // Adjust file type and size as needed
        ]);

        // Save the uploaded file
        $filePath = $request->file('file')->store('modules', 'public');

        // Insert module data into the database
        $inserted = DB::table('modules')->insert([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'file' => $filePath,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        if ($inserted) {
            return response()->json(['success' => true, 'message' => 'Module uploaded successfully']);
        }

        return response()->json(['success' => false, 'message' => 'Failed to upload module'], 400);
    }
}
