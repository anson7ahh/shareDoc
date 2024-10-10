<?php

namespace App\Listeners;

use App\Events\ViewDocumentEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Session\Session;
use Illuminate\Contracts\Queue\ShouldQueue;

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
