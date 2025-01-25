-- AlterTable
ALTER TABLE `User` ADD COLUMN `premium_end` DATETIME(3) NULL,
    ADD COLUMN `premium_start` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `BillingHistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillingHistory` ADD CONSTRAINT `BillingHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
