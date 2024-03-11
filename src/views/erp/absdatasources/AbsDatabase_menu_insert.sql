-- Note: The front-end directory corresponding to this page is under folder views/absdatasources
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024031103564270480', NULL, 'Abs Database Management', '/absdatasources/absDatabaseList', 'absdatasources/AbsDatabaseList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270481', '2024031103564270480', 'Add Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270482', '2024031103564270480', 'Edit Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270483', '2024031103564270480', 'Delete Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270484', '2024031103564270480', 'Batch delete Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270485', '2024031103564270480', 'Export excel_Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024031103564270486', '2024031103564270480', 'Import excel_Abs Database Management', NULL, NULL, 0, NULL, NULL, 2, 'absdatasources:abs_database:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-03-11 15:56:48', NULL, NULL, 0, 0, '1', 0);