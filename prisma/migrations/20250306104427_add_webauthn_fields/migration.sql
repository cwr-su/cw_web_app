/*
  Warnings:

  - A unique constraint covering the columns `[credentialId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `challenge` VARCHAR(191) NULL,
    ADD COLUMN `counter` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `credentialId` VARCHAR(191) NULL,
    ADD COLUMN `publicKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_credentialId_key` ON `Users`(`credentialId`);
