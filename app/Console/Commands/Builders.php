<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class Builders extends Command
{
    // /**
    //  * The name and signature of the console command.
    //  *
    //  * @var string
    //  */
    // protected $signature = 'app:builders';
    // public function __construct()
    // {
    //     parent::__construct();
    // }
    // /**
    //  * The console command description.
    //  *
    //  * @var string
    //  */
    // protected $description = 'Command description';

    // /**
    //  * Execute the console command.
    //  */
    // public function handle()
    // {
    //     //
    // }
    // Đặt tên và mô tả cho command
    // Đặt tên và mô tả cho command
    protected $signature = 'make:builder {name}';
    protected $description = 'Tạo builder pattern class với kiểm tra thư mục';

    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();
        $this->files = $files;
    }

    public function handle()
    {
        // Lấy tên class builder từ tham số
        $name = $this->argument('name');
        $this->createBuilderClass($name);
    }

    // Hàm tạo file builder
    protected function createBuilderClass($name)
    {
        // Đường dẫn thư mục Builders trong app
        $folderPath = app_path('Builders');

        // Kiểm tra và tạo thư mục nếu chưa tồn tại
        if (!$this->files->exists($folderPath)) {
            $this->files->makeDirectory($folderPath, 0755, true);
            $this->info("Thư mục đã được tạo: {$folderPath}");
        } else {
            $this->info("Thư mục đã tồn tại: {$folderPath}");
        }

        // Đường dẫn file builder
        $filePath = $folderPath . "/{$name}Builder.php";

        // Kiểm tra file đã tồn tại chưa
        if ($this->files->exists($filePath)) {
            $this->error('File builder đã tồn tại!');
        } else {
            // Nội dung của file builder
            $stub = $this->getStubContent($name);

            // Tạo file
            $this->files->put($filePath, $stub);
            $this->info("Builder class đã được tạo: {$filePath}");
        }
    }

    // Nội dung của file builder
    protected function getStubContent($name)
    {
        return <<<EOT
<?php

namespace App\Builders;

class {$name}Builder 
{
   
}
EOT;
    }
}
