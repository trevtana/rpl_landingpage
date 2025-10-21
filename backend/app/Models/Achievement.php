<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'participant',
        'level',
        'rank',
        'year',
        'date',
        'description',
        'image',
    ];

    protected $casts = [
        'date' => 'date',
        'year' => 'integer',
    ];

    /**
     * Get the formatted date attribute
     */
    public function getFormattedDateAttribute(): ?string
    {
        return $this->date?->format('d F Y');
    }
}
