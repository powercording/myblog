CREATE TABLE `AutoSave` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`content` text,
	`userId` int NOT NULL
);
--> statement-breakpoint
CREATE INDEX `AutoSave_content_id_idx` ON `AutoSave` (`userId`,`id`);