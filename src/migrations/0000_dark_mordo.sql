-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Comment` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`postId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`userName` varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Post` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(191) NOT NULL,
	`content` text NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`userName` varchar(191) NOT NULL,
	`categories` varchar(20)
);
--> statement-breakpoint
CREATE TABLE `Token` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`payload` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`userId` int NOT NULL,
	CONSTRAINT `Token_payload_key` UNIQUE(`payload`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`avatar` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	`vaild` tinyint DEFAULT 0,
	CONSTRAINT `User_email_key` UNIQUE(`email`),
	CONSTRAINT `User_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE INDEX `Post_userName_id_idx` ON `Post` (`userName`,`id`);--> statement-breakpoint
CREATE INDEX `Token_userId_idx` ON `Token` (`userId`);
*/