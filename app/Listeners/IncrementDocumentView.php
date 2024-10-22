<?php

namespace App\Listeners;

use App\Events\ViewDocumentEvent;

use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Session\Session;


class IncrementDocumentView
{
    /**
     * Create the event listener.
     */
    private $session;

    /**
     * Create the event listener.
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * Handle the event.
     */
    public function handle(ViewDocumentEvent $event)
    {
        $document = $event->document;
        // Log::info('Document Info:',  $document->view);
        if (!$this->isDocumentViewed($document)) {
            $document->increment('view');

            $this->storeDocument($document);
        }
    }

    private function isDocumentViewed($document)
    {
        $viewed = $this->session->get('viewed_posts', []);

        return array_key_exists($document->id, $viewed);
    }

    private function storeDocument($document)
    {
        $key = 'viewed_posts.' . $document->id;

        $this->session->put($key, time());
    }
    // public function handle(ViewDocumentEvent $event)
    // {
    //     $document = $event->document;
    //     Log::info('Document Info:', ['document' =>  $document->increment('view')]);
    //     // Kiểm tra xem bài viết có được xem trong khoảng thời gian cho phép hay không
    //     if (!$this->isDocumentViewedRecently($document)) {
    //         // Tăng lượt xem nếu bài viết chưa được xem gần đây
    //         $document->increment('view');

    //         // Lưu lại bài viết đã xem vào session
    //         $this->storeDocument($document);
    //     }
    // }

    // /**
    //  * Kiểm tra xem bài viết đã được xem gần đây chưa (theo thời gian hết hạn).
    //  */
    // private function isDocumentViewedRecently($document)
    // {
    //     $viewed = $this->session->get('viewed_posts', []);

    //     // Nếu bài viết đã được xem trước đó
    //     if (array_key_exists($document->documents_id, $viewed)) {
    //         $lastViewed = $viewed[$document->documents_id];

    //         // Kiểm tra thời gian đã trôi qua từ lần xem cuối cùng
    //         $currentTime = time();
    //         $throttleTime = 86400; // 24 giờ

    //         // Nếu thời gian trôi qua ít hơn throttleTime, bài viết vẫn được coi là đã xem
    //         return ($lastViewed + $throttleTime) > $currentTime;
    //     }

    //     return false;
    // }

    // /**
    //  * Lưu lại bài viết đã xem vào session.
    //  */
    // private function storeDocument($document)
    // {
    //     $key = 'viewed_posts.' . $document->documents_id;
    //     $this->session->put($key, time());
    // }
}
