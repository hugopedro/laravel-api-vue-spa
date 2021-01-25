<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'label', 'is_complete',
    ];

    public function tasks()
    {
        return $this->belongsTo(Todo::class);
    }
}
