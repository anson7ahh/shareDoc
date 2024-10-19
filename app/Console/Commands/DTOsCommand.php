<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class DTOsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:dto {folder} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new DTO class';

    /**
     * Execute the console command.
     */
    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();
        $this->files = $files;
    }

    public function handle()
    {
        // Lấy tên và thư mục từ đối số
        $folder = $this->argument('folder');
        $name = $this->argument('name');

        // Tạo lớp DTO
        $this->createDTOsClass($folder, $name);
    }

    protected function createDTOsClass($folder, $name)
    {
        // Đường dẫn đến thư mục DTOs
        $folderPath = app_path("DTOs/{$folder}");

        // Kiểm tra và tạo thư mục nếu chưa tồn tại
        if (!$this->files->exists($folderPath)) {
            $this->files->makeDirectory($folderPath, 0755, true);
            $this->info("Thư mục đã được tạo: {$folderPath}");
        } else {
            $this->info("Thư mục đã tồn tại: {$folderPath}");
        }

        // Đường dẫn file dto
        $filePath = $folderPath . "/{$name}.php";

        // Kiểm tra file đã tồn tại chưa
        if ($this->files->exists($filePath)) {
            $this->error('File DTO đã tồn tại!');
        } else {
            // Nội dung của file DTO
            $stub = $this->getStubContent($folder, $name);

            // Tạo file
            $this->files->put($filePath, $stub);
            $this->info("DTO class đã được tạo: {$filePath}");
        }
    }

    protected function getStubContent($folder, $name)
    {
        return <<<EOT
<?php

namespace App\DTOs\\{$folder};

class {$name}
{
    // Các thuộc tính và phương thức sẽ được định nghĩa ở đây
}
EOT;
    }
}
