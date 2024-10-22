<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

  protected $fillable = [
        'title',
        'desc',
        'image_path',
  ];

  // protected function title(): Attribute {
  //   return Attribute::make(
  //       set : fn(string $value) => strtolower($value),
  //       get: fn (string $value) => ucwords($value)
  //   );
  // }
}
