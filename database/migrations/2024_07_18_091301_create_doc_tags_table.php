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
        Schema::create('doc_tags', function (Blueprint $table) {
            $table->primary(['tag_id', 'document_id']);
            $table->unsignedBigInteger('tag_id');
            $table->unsignedBigInteger('document_id');

            $table->foreign('document_id')->references('id')->on('documents')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('tag_id')->references('id')->on('tags')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doc_tags');
    }
};
