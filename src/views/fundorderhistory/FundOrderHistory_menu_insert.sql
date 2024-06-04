-- Note: The front-end directory corresponding to this page is under folder views/fundorderhistory
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024060402503530450', NULL, 'Lịch sử lệnh', '/fundorderhistory/fundOrderHistoryList', 'fundorderhistory/FundOrderHistoryList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530451', '2024060402503530450', 'Add Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530452', '2024060402503530450', 'Edit Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530453', '2024060402503530450', 'Delete Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530454', '2024060402503530450', 'Batch delete Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530455', '2024060402503530450', 'Export excel_Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060402503530456', '2024060402503530450', 'Import excel_Lịch sử lệnh', NULL, NULL, 0, NULL, NULL, 2, 'fundorderhistory:tbl_fund_order_history:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:50:45', NULL, NULL, 0, 0, '1', 0);