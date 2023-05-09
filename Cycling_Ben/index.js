var tripColumn = [
	{ data: '105%' },
	{ data: '92%' },
	{ data: '98%' },
	{ data: 'FTP' },
	{ data: 'EMPTY' },
	{ data: '110%' },
	{ data: '80%' },
	{ data: 'EMPTY' },
	{ data: '85%' },
	{ data: '82%' },
	{ data: '78%' }
];


//<!-- {"zone":1,"From":0,"To":0.55,"ValueFrom":0,"ValueTo":0} -->

var zoneColumn = [
	{ data: 'From' },
	{ data: 'To' },
	{ data: 'zone' },
	{ data: 'ValueFrom' },
	{ data: 'ValueTo' },
	{ data: 'ClimePower' }

];


var defaultFTP = 295;
var defaultWeight = 69;

var sampleData = {
	"105%": 1.05
	, "92%": 0.92
	, "98%": 0.98
	, "FTP": "FTP"
	, "EMPTY": ""
	, "110%": 1.1
	, "80%": 0.8
	, "EMPTY": ""
	, "85%": 0.85
	, "82%": 0.82
	, "78%": 0.78
};

$(function () {
	var ftp = defaultFTP;


	var powerArray = getPowerData();

	//TrainingGrid
	commonManager.jqDataTable.tableConfig["createdRow"] = function (row, data, dataIndex) {
		if (this.selector.toString() == '.businessTripGrid') {
			if (data["FTP"] == defaultFTP) {
				$(row).addClass('cellRight_targetFTP');
			}
			else {
				$(row).addClass('cellRight_nonFTP');
			}
		}


		if (this.selector.toString() == '.zoneGrid') {
			$(row).css("background-color", data["Color"]);
		}
	};

	commonManager.jqDataTable.tableSetting(".businessTripGrid", tripColumn, [], true, false);
	commonManager.jqDataTable.businessTripGrid.columns.adjust().draw(); // Redraw the DataTable


	//ZoneGrid
	commonManager.jqDataTable.tableSetting(".zoneGrid", zoneColumn, [], true, false);
	commonManager.jqDataTable.zoneGrid.columns.adjust().draw(); // Redraw the DataTable


	showChart();
});


function showChart()
{
	drawFTPChart();

	drawZoneChart();
}

function drawZoneChart() {
	var zoneArray = getZoneData(defaultFTP);

	commonManager.jqDataTable.zoneGrid.clear().draw();


	commonManager.jqDataTable.zoneGrid.rows.add(zoneArray); // Add new data
	commonManager.jqDataTable.zoneGrid.columns.adjust().draw(); // Redraw the DataTable
}


function drawFTPChart() {
	var txtFTP = document.getElementById("ftpValue").value;
	var valueFTP = Number.parseInt(txtFTP);
	if (!isNaN(valueFTP)) {
		defaultFTP = valueFTP;
	}

	var txtWeight = document.getElementById("weightValue").value;
	var valueWeight = Number.parseInt(txtWeight);
	if (!isNaN(valueWeight)) {
		defaultWeight = valueWeight;
	}

	document.getElementById("ftpDisplay").textContent = defaultFTP;
	document.getElementById("weightDisplay").textContent = defaultWeight;
	document.getElementById("climePowerDisplay").textContent = (defaultFTP / defaultWeight).toFixed(1);


	var powerArray = [];

	//設定ftp列表
	for (i = -3; i < 4; i++) {
		var shiftValue = (5 * i);

		var powerData = calculatePowerObject(defaultFTP + shiftValue);

		powerArray.push(powerData);
	}

	commonManager.jqDataTable.businessTripGrid.clear().draw();


	commonManager.jqDataTable.businessTripGrid.rows.add(powerArray); // Add new data
	commonManager.jqDataTable.businessTripGrid.columns.adjust().draw(); // Redraw the DataTable
}


function getPowerData() {
	var ftp = defaultFTP;


	var powerArray = [];

	//設定ftp列表
	for (i = -3; i < 4; i++) {
		var powerData = calculatePowerObject(ftp + (5 * i));
		powerArray.push(powerData);
	}

	return powerArray;
}


function calculatePowerObject(ftp) {
	var powerObject = JSON.parse(JSON.stringify(sampleData));


	Object.keys(powerObject).forEach(key => {
		if (Number.parseFloat(powerObject[key])) {
			var powerValue = (ftp * powerObject[key]).toFixed(0);
			powerObject[key] = powerValue;
		}

		if (key == "FTP") {
			powerObject[key] = ftp;
		}
	});

	return powerObject;
}


function getZoneData(ftp) {
	var zoneDts = [];

	zoneDts.push({ "Color": "#3DB39F", "zone": 1, "From": 0, "To": 0.55, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });
	zoneDts.push({ "Color": "#3DB33F", "zone": 2, "From": 0.56, "To": 0.75, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });
	zoneDts.push({ "Color": "#FCD549", "zone": 3, "From": 0.76, "To": 0.9, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });
	zoneDts.push({ "Color": "#FC9C49", "zone": 4, "From": 0.91, "To": 1.05, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });
	zoneDts.push({ "Color": "#E34074", "zone": 5, "From": 1.06, "To": 1.2, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });
	zoneDts.push({ "Color": "#8963D8", "zone": 6, "From": 1.21, "To": 1.5, "ValueFrom": 0, "ValueTo": 0, "ClimePower": "" });


	for (i = 0; i < zoneDts.length; i++) {
		let zoneObject = zoneDts[i];

		zoneObject.ValueFrom = Number.parseInt((zoneObject.From * defaultFTP).toFixed(0));

		zoneObject.ValueTo = Number.parseInt((zoneObject.To * defaultFTP).toFixed(0));

		zoneObject.From = (zoneObject.From * 100).toFixed(0) + "%";

		zoneObject.To = (zoneObject.To * 100).toFixed(0) + "%";

		var climePowerFrom = (Number.parseInt(zoneObject.ValueFrom) / defaultWeight).toFixed(1);
		var climePowerTo = (Number.parseInt(zoneObject.ValueTo) / defaultWeight).toFixed(1);

		if (climePowerFrom == "0.0") {
			climePowerFrom = "0";
		}

		zoneObject.ClimePower = climePowerFrom + " ~ " + climePowerTo;
	}

	return zoneDts;
}

