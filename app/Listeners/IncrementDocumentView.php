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
}
