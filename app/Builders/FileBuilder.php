<?php

namespace App\Builders;

use App\Models\Document;
use Illuminate\Support\Arr;

class FileBuilder
{
    protected $query;
    protected $data;
    public function __construct(Document $model)
    {
        $this->query = $model->newQuery();
    }

    // Thêm điều kiện where cho nội dung
    public function whereContent($content)
    {
        $this->query->where('content', $content);
        return $this;
    }

    // Thêm điều kiện where cho users_id
    public function whereUserId($user_id)
    {
        $this->query->where('users_id', $user_id);
        return $this;
    }

    // Thêm điều kiện where cho trạng thái
    public function whereStatus($status)
    {
        $this->query->where('status', $status);
        return $this;
    }

    // Lấy bản ghi đầu tiên
    public function first()
    {
        return $this->query->first();
    }
    public function filterData(array $data)
    {
        $this->data = Arr::only($data, ['content', 'format', 'users_id']);
        return $this;
    }
    public function create($modelClass)
    {
        return $modelClass::create($this->data);
    }

    public function findById($id)
    {
        $this->query->where('id', $id);
        return $this;
    }
}
