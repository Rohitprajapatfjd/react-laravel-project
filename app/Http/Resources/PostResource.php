<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray( $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'desc'=>$this->desc,
            'image_path'=>$this->image_path,
            'created_at'=>$this->created_at ?  $this->created_at->format('Y-m-D H:i:s') : null,
        ];
    }
}
