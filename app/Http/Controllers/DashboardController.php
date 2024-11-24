<?php

namespace App\Http\Controllers;

use App\Models\Exam; // Import the Exam model
use App\Models\Module; // Import the Module model
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retrieve dashboard statistics.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDashboardStats()
    {
        $modulesUploaded = Module::count();

        // Return the data as JSON
        return response()->json([
            'modules_uploaded' => $modulesUploaded,
        ]);
    }
}
