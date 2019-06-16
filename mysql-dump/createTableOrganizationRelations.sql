CREATE TABLE organization_relations (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `org_id` int(10) unsigned DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `org_id_parent_id` (`org_id`, `parent_id`),
  FOREIGN KEY (`parent_id`) REFERENCES organization_relations (`id`),
  FOREIGN KEY (`org_id`) REFERENCES organization (`id`)
);
