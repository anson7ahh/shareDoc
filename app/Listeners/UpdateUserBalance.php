<?php

namespace App\Listeners;

use App\Models\User;
use App\Models\Document;
use App\Events\DownloadSuccessful;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateUserBalance
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DownloadSuccessful $event)
    {
        $userId = $event->downloadDTO->user_id;
        $documentId = $event->downloadDTO->document_id;

        $document = Document::find($documentId);

        if ($document && $document) {
            DB::transaction(function () use ($userId, $document, $event) {
                // Trừ điểm người tải
                User::where('id', $userId)->decrement('total_points', $event->downloadDTO->document_point);

                // Cộng điểm cho người đăng
                User::where('id', $document->users_id)->increment('total_points', $event->downloadDTO->document_point);
            });
        } else {
            throw new \Exception('Document or document owner not found');
        }
    }
}
