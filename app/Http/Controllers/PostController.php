<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        //return response('Hello World');
        return Inertia::render('Poste/Index', [
            'posts' => Post::width('user:id', 'name')->latest()->get(),
        ]);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request-> user()->posts()->create($validated);

        return redirect(route('poste.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
