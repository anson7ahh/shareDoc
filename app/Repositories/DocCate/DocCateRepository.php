<?php

namespace App\Repositories\DocCate;

use App\Models\DocCate;
use LaravelEasyRepository\Repository;

interface DocCateRepository extends Repository
{

    public function createDocCate(array $data): DocCate;
}
