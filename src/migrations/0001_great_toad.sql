ALTER TABLE `Comment` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3));--> statement-breakpoint
ALTER TABLE `Post` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3));--> statement-breakpoint
ALTER TABLE `Token` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3));--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3));