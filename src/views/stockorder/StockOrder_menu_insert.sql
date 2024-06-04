-- Note: The front-end directory corresponding to this page is under folder views/stockorder
-- If you want to change to another directory, please modify the value corresponding to the component field in sql


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2024060403598540250', NULL, 'Danh sách lệnh mua/bán chứng khoán', '/stockorder/stockOrderList', 'stockorder/StockOrderList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0);

-- permission control sql
-- New
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598540251', '2024060403598540250', 'Add Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);
-- Edit
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598540252', '2024060403598540250', 'Edit Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);
-- Delete
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598540253', '2024060403598540250', 'Delete Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);
-- Batch deletion
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598540254', '2024060403598540250', 'Batch delete Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);
-- Export excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598550255', '2024060403598540250', 'Export excel_Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);
-- Import excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2024060403598550256', '2024060403598540250', 'Import excel_Danh sách lệnh mua/bán chứng khoán', NULL, NULL, 0, NULL, NULL, 2, 'stockorder:tbl_stock_order:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2024-06-04 15:59:25', NULL, NULL, 0, 0, '1', 0);