<?php

namespace App\Listeners;

use App\Events\DocumentDeletePathEvent;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class DocumentDeletePathListener
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
    public function handle(DocumentDeletePathEvent $event): void
    {
        $fileWordPath = 'fileWord/' . $event->document->content . '.' . $event->document->format;
        $fileWordConvertPdfPath = 'file/' . $event->document->content . '.pdf';
        $filePdfPath = 'file/' . $event->document->content . '.' . $event->document->format;

        // Nếu định dạng của file không phải là PDF
        if ($event->document->format != 'pdf') {
            // Kiểm tra và xóa file Word gốc nếu tồn tại
            if (Storage::disk('public')->exists($fileWordPath)) {
                Storage::disk('public')->delete($fileWordPath);
            }

            // Kiểm tra và xóa file Word chuyển đổi sang PDF nếu tồn tại
            if (Storage::disk('public')->exists($fileWordConvertPdfPath)) {
                Storage::disk('public')->delete($fileWordConvertPdfPath);
            }
        } else {
            // Nếu định dạng là PDF, chỉ xóa file PDF
            if (Storage::disk('public')->exists($filePdfPath)) {
                Storage::disk('public')->delete($filePdfPath);
            }
        }
    }
}
