-- CreateTable
CREATE TABLE `AdsType` (
    `id` VARCHAR(191) NOT NULL,
    `type_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AdsType_type_name_key`(`type_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ads` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ads` ADD CONSTRAINT `Ads_type_fkey` FOREIGN KEY (`type`) REFERENCES `AdsType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
