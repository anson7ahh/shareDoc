<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doc_cates', function (Blueprint $table) {
            $table->id();
             $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('document_id');


            $table->foreign('category_id')->references('id')->on('categories')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('document_id')->references('id')->on('documents')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doc_cates');
    }
};
