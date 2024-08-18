<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\DocCate;
use App\Models\Category;
use App\Models\Document;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use Illuminate\Database\Eloquent\Builder;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoriesParent = Category::roots()->get();

        return Inertia::render('User/Upload', [
            'categoriesParent' => $categoriesParent
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $userId = Auth::id();
            // Lấy các giá trị từ request
            $description = $request->input('description');
            $source = $request->input('source');
            $point = $request->input('point');
            $categoryChildentId = $request->input('category_childent_id');

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $format = $file->getClientOriginalExtension();
                $title = $file->getClientOriginalName();
                $fileName = time() . '_' . $title;
                $file->move(public_path('document'), $fileName);
                $slug = Str::slug($title);
                //luu documnet
                $newDocument = new Document();
                $newDocument->title = $title;
                $newDocument->content = $fileName;
                $newDocument->slug = $slug;
                $newDocument->description = $description;
                $newDocument->format = $format;
                $newDocument->source = $source;
                $newDocument->point = $point;
                $newDocument->users_id = $userId;
                $newDocument->save();


                // luu download
                $documentId = $newDocument->id;
                $newDocCategory = new DocCate();
                $newDocCategory->document_id = $documentId;
                $newDocCategory->category_id = $categoryChildentId;
                $newDocCategory->save();
                return back()->with('message', 'Tải lên file thành công . Chờ Admin của wedsite duyệt !');
            }

            return back()->with('message', 'Tải lên ko file thành công');
        } catch (\Exception $e) {
            // Ghi log lỗi nếu cần
            Log::error('Lỗi khi tải lên file: ' . $e->getMessage());
            return back()->with('error', 'Đã xảy ra lỗi trong quá trình tải lên. Vui lòng thử lại sau.');
        }
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
    public function show($id)
    {
        $ParentCategoryId = category::find($id);
        if (!$ParentCategoryId) {
            return response()->json(['error' => 'Danh mục cha không tồn tại'], 404);
        } else {
            $categoryChildren = $ParentCategoryId->children()->get();


            return response()->json([
                'categoryChildren' => $categoryChildren,

            ], 200);
        }
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
