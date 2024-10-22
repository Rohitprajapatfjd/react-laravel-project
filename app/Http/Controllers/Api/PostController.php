<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\updateRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(Post::paginate(10)) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $validate = $request->validated();
        $image = $request->file('image_path');
        $imageName =random_int(0,10000).'.'.$image->getClientOriginalExtension();
        $file =$image->move(public_path().'/uploads',$imageName);
        $data = Post::create([
            'title'=> $request->title,
            'desc'=> $request->desc,
            'image_path'=>  $imageName 
        ]);

        return response()->json(new PostResource($data),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $post)
    {
        $data = Post::findOrFail($post);
        return response()->json(new PostResource($data ),200);
    }

    /**
     * Update the specified resource in storage.
     * 
     */
    public function update(updateRequest $request, int $id)
    {
        $validate = $request->validated();
         $path = public_path().'/uploads';
         $post = Post::findOrFail($id);
        if($request->hasFile('image_path')){
            if(!empty($post->image_path)){
              $image = $path.'/'.$post->image_path;
              if(file_exists($image)){
                unlink($image);
              }
            }
               $image = $request->file('image_path');
             $imageName =random_int(0,10000).'.'.$image->getClientOriginalExtension();
             $file =$image->move($path,$imageName);
              
        }else{
          $imageName = $post->image_path;
        }
         
        $post->update([
          'title'=> $request->title,
          'desc'=> $request->desc,
          'image_path'=> $imageName
         ]);

        return response()->json(new PostResource($post ),200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $post)
    {
       $data = Post::findOrFail($post);
       $data->delete();
       return response('',204);
    }
}
