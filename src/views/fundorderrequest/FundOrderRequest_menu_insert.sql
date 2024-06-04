-- Note: The front-end directory corresponding to this page is under folder views/fundorderrequest
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024060403019960120', NULL, 'Yêu cầu', '/fundorderrequest/fundOrderRequestList', 'fundorderrequest/FundOrderRequestList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960121', '2024060403019960120', 'Add Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960122', '2024060403019960120', 'Edit Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960123', '2024060403019960120', 'Delete Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960124', '2024060403019960120', 'Batch delete Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960125', '2024060403019960120', 'Export excel_Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403019960126', '2024060403019960120', 'Import excel_Yêu cầu', NULL, NULL, 0, NULL, NULL, 2, 'fundorderrequest:tbl_fund_order_request:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:01:12', NULL, NULL, 0, 0, '1', 0);