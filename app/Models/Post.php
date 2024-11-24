<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Post extends Model
{
        protected $fillable = [
            'message',
        ];

        public function user(): BelongsTo
        {
            return $this->belongsTo(User::class);
        }
}
