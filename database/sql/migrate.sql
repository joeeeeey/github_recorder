-- mysql -uroot -e "CREATE DATABASE github_recorder_development DEFAULT CHARSET utf8"
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- records
-- DROP TABLE IF EXISTS `records`;
CREATE TABLE `records`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `author` varchar(255) CHARACTER SET utf8 COMMENT 'author',
  `message` varchar(255) CHARACTER SET utf8 COMMENT 'message',
  `project_name` varchar(255) CHARACTER SET utf8 COMMENT 'project_name',
  `data` mediumtext CHARACTER SET utf8 NOT NULL COMMENT 'All callback data',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
