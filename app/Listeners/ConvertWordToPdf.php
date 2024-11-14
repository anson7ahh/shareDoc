<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Log;
use App\Events\WordFileUploaded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\IOFactory;

class ConvertWordToPdf
{
    use InteractsWithQueue;
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
    public function handle(WordFileUploaded $event)
    {
        $filePath = $event->filePath;
        $content = $event->content;

        try {
            // Cấu hình PdfRenderer để sử dụng mPDF
            Settings::setPdfRendererPath(base_path('vendor/mpdf/mpdf'));
            Settings::setPdfRendererName('MPDF');

            // Đọc tệp tin Word
            $Content = IOFactory::load($filePath);
            $PDFWriter = IOFactory::createWriter($Content, 'PDF');

            // Đường dẫn cho tệp tin PDF mới
            $pdfFileName = $content . '.pdf';
            $outputPath = storage_path('app/public/file/' . $pdfFileName);

            // Kiểm tra và tạo thư mục nếu không tồn tại
            if (!file_exists(dirname($outputPath))) {
                mkdir(dirname($outputPath), 0777, true);
            }

            // Lưu tệp tin PDF
            $PDFWriter->save($outputPath);

            // Ghi log thông tin
            Log::info('Đã lưu tệp tin PDF tại: ' . $outputPath);
        } catch (\Exception $e) {
            Log::error('Lỗi khi chuyển Word sang PDF: ' . $e->getMessage());
            // Không trả về response ở đây
            throw $e; // Ném lại lỗi để có thể xử lý bên ngoài nếu cần
        }
    }
}
