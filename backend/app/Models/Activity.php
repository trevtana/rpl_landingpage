<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'date',
        'location',
        'image',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Get the formatted date attribute
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->date->format('d F Y');
    }
}
