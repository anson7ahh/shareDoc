<?php

namespace App\Data;


use Spatie\LaravelData\Data;

class CreateDownloadData extends Data
{
  public function __construct(
    public ?int $document_point,
    public int $document_id,
    public int $user_id,
    public int $user_total_point,
  ) {
  }
}
