<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deleted_modules', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Module name
            $table->text('description')->nullable(); // Module description
            $table->string('file')->nullable(); // File name or path
            $table->timestamp('deleted_at')->useCurrent(); // When the module was deleted
            $table->timestamps(); // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deleted_modules');
    }
};
