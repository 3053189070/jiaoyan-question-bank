CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`answer` text DEFAULT '' NOT NULL,
	`analysis` text DEFAULT '' NOT NULL,
	`subject` text DEFAULT '数学' NOT NULL,
	`grade` text DEFAULT '九年级' NOT NULL,
	`type` text DEFAULT '解答题' NOT NULL,
	`difficulty` text DEFAULT '中等' NOT NULL,
	`source` text DEFAULT '手动录入' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
