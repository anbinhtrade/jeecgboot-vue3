-- Note: The front-end directory corresponding to this page is under folder views/fundhistory
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024060402488700390', NULL, 'Bảng lưu lịch sử quỹ', '/fundhistory/fundHistoryList', 'fundhistory/FundHistoryList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710391', '2024060402488700390', 'Add Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710392', '2024060402488700390', 'Edit Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710393', '2024060402488700390', 'Delete Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710394', '2024060402488700390', 'Batch delete Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710395', '2024060402488700390', 'Export excel_Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402488710396', '2024060402488700390', 'Import excel_Bảng lưu lịch sử quỹ', NULL, NULL, 0, NULL, NULL, 2, 'fundhistory:tbl_fund_history:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:48:39', NULL, NULL, 0, 0, '1', 0);