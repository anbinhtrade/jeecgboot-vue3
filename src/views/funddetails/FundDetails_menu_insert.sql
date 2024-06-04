-- Note: The front-end directory corresponding to this page is under folder views/funddetails
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('202406040249780200', NULL, 'Bảng thông tin ETF chi tiết', '/funddetails/fundDetailsList', 'funddetails/FundDetailsList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780201', '202406040249780200', 'Add Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780202', '202406040249780200', 'Edit Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780203', '202406040249780200', 'Delete Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780204', '202406040249780200', 'Batch delete Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780205', '202406040249780200', 'Export excel_Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202406040249780206', '202406040249780200', 'Import excel_Bảng thông tin ETF chi tiết', NULL, NULL, 0, NULL, NULL, 2, 'funddetails:tbl_fund_details:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 14:49:20', NULL, NULL, 0, 0, '1', 0);