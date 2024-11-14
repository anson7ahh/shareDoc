<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use App\Enums\DocumentStatusEnum;

class CollectionUploadDeleteData extends Data
{
  public function __construct(
    public ?int $documentId,
    public ?int $userId,

  ) {
  }
}
