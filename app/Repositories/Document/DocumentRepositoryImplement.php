<?php

namespace App\Repositories\Document;

use Carbon\Carbon;

use App\Models\DocCate;
use App\Models\Document;
use Illuminate\Support\Arr;
use App\Data\CollectionData;
use App\Builders\FileBuilder;
use App\Builders\DocCateBuilder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Data\CollectionUploadDeleteData;
use LaravelEasyRepository\Implementations\Eloquent;

class DocumentRepositoryImplement extends Eloquent implements DocumentRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Document $model)
    {
        $this->model = $model;
    }


    public function checkFileExists($content, $user_id)
    {
        $fileQueryBuilder = new FileBuilder(new Document());
        $findFile = $fileQueryBuilder
            ->whereContent($content)
            ->whereUserId($user_id)
            ->whereStatus('notreviewed')
            ->first();

        return $findFile ? $findFile : null;
    }
    public function createDocument(array $data)
    {
        $fileBuilder = new FileBuilder(new Document());
        $document = $fileBuilder
            ->filterData($data)
            ->create(Document::class);
        return $document;
    }
    public function updateDocument(array $data, int $document_id): Document
    {
        $document = $this->model->find($document_id);
        if ($document) {
            $document->update($data);
            return $document;
        }
        return null;
    }

    public function DocumentItems($id)
    {

        return $this->model::with([
            'categories',
            'user' => function ($query) {
                $query->select('id', 'name');
            },

        ])
            ->withCount(['downloads as total_download'])

            ->where('id', $id)
            ->first();
    }
    public function findDocument($id)
    {
        return $this->model->findOrFail($id);
    }
    public function getUploaded(CollectionData $data)
    {
        return $this->model::withTrashed()->where('users_id', $data->user_id)->get();
    }


    public function findDocUpload(CollectionUploadDeleteData $data)
    {
        return $this->model->findOrFail($data->documentId);
    }
    public function softDeleteDocUploaded(Document $data)
    {
        return $data->delete();
    }
    public function forceDeleteDocUploaded(Document $data)
    {
        return $data->forceDelete();
    }
    public function FeaturedDocument()
    {
        // Đặt tên khóa cache
        $cacheKey = 'featured_documents_week_' . Carbon::now()->format('YW'); // Tạo khóa cache theo tuần (Year-Week)

        // Kiểm tra nếu dữ liệu đã có trong cache Redis
        return Cache::store('redis')->remember($cacheKey, 10, function () {
            // Lấy ngày bắt đầu và kết thúc của tuần hiện tại
            $startOfWeek = Carbon::now()->startOfWeek(); // Chủ nhật
            $endOfWeek = Carbon::now()->endOfWeek(); // Thứ bảy

            // Truy vấn các tài liệu nổi bật trong tuần
            return $this->model::with([
                'user' => function ($query) {
                    $query->select('id', 'name');
                },
            ])
                ->withCount(['downloads as total_download'])
                ->whereBetween('created_at', [$startOfWeek, $endOfWeek])
                ->orderBy('view', 'desc')
                ->limit(10)
                ->get();
        });
    }
}
