-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(200) NOT NULL,
    `lastname` VARCHAR(200) NOT NULL,
    `login` VARCHAR(200) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verifyCode` VARCHAR(191) NOT NULL DEFAULT 'null',
    `methodOfReg` VARCHAR(191) NOT NULL DEFAULT 'cw_id',
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'none',
    `avatarFileName` VARCHAR(191) NOT NULL DEFAULT 'none',

    UNIQUE INDEX `Users_login_key`(`login`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Premiumobj` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `userCwPremium` VARCHAR(200) NOT NULL DEFAULT 'none',
    `userMCWTgId` VARCHAR(200) NOT NULL DEFAULT 'none',
    `costFloatStr` VARCHAR(200) NOT NULL DEFAULT 'none',
    `paymentId` VARCHAR(200) NOT NULL DEFAULT 'none',
    `paidSuccessVerifiedAt` VARCHAR(191) NOT NULL DEFAULT 'none',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Licences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `licenceKey` VARCHAR(200) NOT NULL,
    `botId` VARCHAR(200) NOT NULL DEFAULT 'none',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Premiumobj` ADD CONSTRAINT `Premiumobj_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Licences` ADD CONSTRAINT `Licences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
