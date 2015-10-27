/**
 * ����������� ������� ����������
 * Created 26.10.2015<br />
 * &copy; http://www.oknosoft.ru 2014-2015
 * @license content of this file is covered by Oknosoft Commercial license. Usage without proper license is prohibited. To obtain it contact info@oknosoft.ru
 * @author    Evgeniy Malyarov
 * @module  reg
 */

/**
 * ��������� ������������� ��������� ������ ���������, ����������� ��� ������� ������
 * @param prm {Object} - � ��������� ����� ������� ���������� ��������� ������ ���������
 * @param modifiers {Array} - ���� ����� �������� �����������, ���������������� ���������������� �������� ������
 */
$p.settings = function (prm, modifiers) {

	// ��� ���������� ���������� rest, � �� ������ http
	prm.rest = true;
	prm.irest_enabled = true;

	// ������������ rest-������� ut
	prm.rest_path = "/kademo/%1/odata/standard.odata/";

	// �� ���������, ���������� � ���� %%%
	prm.zone = 0;

	// ������������ ������ ������
	prm.data_url = "data/";

	// ������������ ����� ������������� ���� sql
	//prm.create_tables = "data/create_tables.sql";

	// ������������� ����� �� ��������� �����������
	prm.request_full_screen = true;

	// ��������� ��������� �� ������ ����
	prm.allow_post_message = "*";

	// ���������� ��������
	prm.use_google_geo = false;

	// ����� ��������� ������������
	prm.guest_name = "Admin";

	// ������ ��������� ������������
	prm.guest_pwd = "";

	// ��������� �������� �������� ��� ������ ��������
	$p.eve.redirect = true;

};

/**
 * ������ �������� ���� ��� ������������� ���������
 */
$p.iface.oninit = function() {

	var myTabbar = new dhtmlXTabBar({

		parent:             document.body,    // id/object, container for tabbar

		arrows_mode:        "auto",         // mode of showing tabs arrows (auto, always)

		offsets: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},

		tabs: [
			{
				id:      "scan",
				text:    "����",
				active:  true
			},
			{
				id:      "orders",
				text:    "������",
				active:  true
			},
			{
				id:      "report",
				text:    "�����",
				active:  true
			},
			{
				id:      "settings",
				text:    "���������",
				active:  true
			}
		]

	});
};

$p.eve.hash_route.push(function (hprm) {

	return false;
});

