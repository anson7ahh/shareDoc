<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoriesParent = Category::roots()->get();
        // dd($categoriesParent);
        // print_r($categoriesParent);
        return Inertia::render('User/Upload', [
            'categoriesParent' => $categoriesParent
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

        $userId = Auth::id();
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $title = $file->getClientOriginalName();

            $checkFiles = Document::where('title', $title)
                ->where('users_id',  $userId)
                ->where('status', 'notreviewed')
                ->get();
            if ($checkFiles->isEmpty()) {
                return response()->json(['message' => 'file được tải lên thành công'], 200);
            } else {
                return response()->json(['message' => 'file của bạn có tên trùng với file đang chờ xét duyệt'], 400);
            }
        }
        return response()->json(['message' => 'file not fould'], 404);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
