-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userAccount` VARCHAR(256) NOT NULL,
    `userPassword` VARCHAR(512) NOT NULL,
    `unionId` VARCHAR(256) NULL,
    `mpOpenId` VARCHAR(256) NULL,
    `userName` VARCHAR(256) NULL,
    `userAvatar` VARCHAR(1024) NULL,
    `userProfile` VARCHAR(512) NULL,
    `userRole` VARCHAR(256) NOT NULL DEFAULT 'user',
    `editTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `isDelete` TINYINT NOT NULL DEFAULT 0,

    INDEX `user_unionId_idx`(`unionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_bank` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) NULL,
    `description` TEXT NULL,
    `picture` VARCHAR(2048) NULL,
    `userId` BIGINT NOT NULL,
    `editTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `isDelete` TINYINT NOT NULL DEFAULT 0,

    INDEX `question_bank_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(256) NULL,
    `content` TEXT NULL,
    `tags` VARCHAR(1024) NULL,
    `answer` TEXT NULL,
    `userId` BIGINT NOT NULL,
    `editTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,
    `isDelete` TINYINT NOT NULL DEFAULT 0,

    INDEX `question_title_idx`(`title`),
    INDEX `question_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_bank_question` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `questionBankId` BIGINT NOT NULL,
    `questionId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `question_bank_question_questionBankId_questionId_key`(`questionBankId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `question_bank` ADD CONSTRAINT `question_bank_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_bank_question` ADD CONSTRAINT `question_bank_question_questionBankId_fkey` FOREIGN KEY (`questionBankId`) REFERENCES `question_bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_bank_question` ADD CONSTRAINT `question_bank_question_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_bank_question` ADD CONSTRAINT `question_bank_question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
