var weight;
$(document).ready(function () {

    let url_string = window.location;
    let url = new URL(url_string);

    weight = url.searchParams.get("w");
    if (weight == null) {
        weight = 67;
    }

    var targetFTP = url.searchParams.get("ftp");
    if (targetFTP == null) {
        targetFTP = 265;
    }

    var ftpWeight = parseFloat(parseInt(targetFTP) / parseInt(weight)).toFixed(2);

    $('#ftpWeight').text(ftpWeight);

    initJQTable(parseFloat(targetFTP));

});

function btnClick() {
    var targetFTP = $('#ftpValue').val();

    var targetWeight = parseInt($('#weightValue').val());

    if (parseInt(targetWeight)) {
        weight = targetWeight;
    }
    if (!isNaN(parseInt(targetFTP))) {
        $('#example tbody').empty();

        $('#ftpZoneTable tbody').empty();

        var ftpWeight = parseFloat(parseInt(targetFTP) / parseInt(weight)).toFixed(2);
        $('#ftpWeight').text(ftpWeight);

        initJQTable(+targetFTP);
    }
}

function initJQTable(targetFTP) {
    $('#example').DataTable(
        {
            paging: false
            , ordering: false
            , info: false
            , bFilter: false
            , bInfo: false
            , destroy: true
            , dom: 'Bfrtip'
        }
    );

    $('#ftpZoneTable').DataTable(
        {
            paging: false
            , ordering: false
            , info: false
            , bFilter: false
            , bInfo: false
            , destroy: true
            , dom: 'Bfrtip'
        }
    );

    $(".dataTables_empty").empty();
    $('.odd').hide();

    var data = [];

    for (var index = -3; index <= 4; index = index + 1) {
        data.push({ "FTP": targetFTP + 5 * index, "cell1": 1.05, "cell2": 0.92, "cell3": 1.1, "cell4": 0.8, "cell5": 0.85, "cell6": 0.82, "cell7": 0.78 });
    }

    var ftpRange = [
        { "Zone": 1, "From": 0, "To": 0.55, "Color": "#D9EAD3" }
        , { "Zone": 2, "From": 0.56, "To": 0.75, "Color": "#D9EAD3" }
        , { "Zone": 3, "From": 0.76, "To": 0.9, "Color": "#FFE599" }
        , { "Zone": 4, "From": 0.91, "To": 1.05, "Color": "#F1C232" }
        , { "Zone": 5, "From": 1.06, "To": 1.2, "Color": "#EA9999" }
        , { "Zone": 6, "From": 1.21, "To": 1.5, "Color": "#CC0000" }];


    var student = '';
    $('#weight').text('Weight:' + weight);
    $('#ftp').text('FTP:' + targetFTP);
    $('#ftpZone').text('FTP:' + targetFTP);

    $.each(ftpRange, function (key, value) {
        var ftpValue = targetFTP;
        var cell0 = Math.floor(value["From"] * 100) + '%';
        var cell1 = Math.floor(value["To"] * 100) + '%';
        var cell2 = value["Zone"];
        var background = value["Color"];

        var ftpFrom = ftpValue * value["From"];
        var ftpTo = ftpValue * value["To"];

        student += '<tr>';

        var colorClass = '';

        student += '<td class="cellRight_nonFTP" style="background-color:' + background + ';"">' + cell0 + '</td>';
        student += '<td class="cellRight_nonFTP" style="background-color:' + background + ';"">' + cell1 + '</td>';
        student += '<td class="cellRight_nonFTP" style="background-color:' + background + ';"">' + cell2 + '</td>';
        student += '<td class="cellRight_nonFTP" style="background-color:' + background + ';"">' + Math.floor(ftpFrom) + '</td>';
        student += '<td class="cellRight_nonFTP" style="background-color:' + background + ';"">' + Math.floor(ftpTo) + '</td>';

        student += '</tr>';
    });
    $('#ftpZoneTable').append(student);


    var student = '';

    $.each(data, function (key, value) {
        var ftpValue = value["FTP"];

        var cell1 = ftpValue * value["cell1"];
        var cell2 = ftpValue * value["cell2"];

        var cell3 = ftpValue * value["cell3"];
        var cell4 = ftpValue * value["cell4"];

        var cell5 = ftpValue * value["cell5"];
        var cell6 = ftpValue * value["cell6"];
        var cell7 = ftpValue * value["cell7"];

        student += '<tr>';

        var colorClass = 'cellRight_nonFTP';
        if (ftpValue === targetFTP) {
            colorClass = 'cellRight_targetFTP';
        }

        student += '<td id="' + colorClass + '">' + Math.floor(cell1) + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell2) + '</td>';
        student += '<td id="' + colorClass + '">' + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell3) + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell4) + '</td>';
        student += '<td id="' + colorClass + '">' + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell5) + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell6) + '</td>';
        student += '<td id="' + colorClass + '">' + Math.floor(cell7) + '</td>';
        student += '</tr>';
    });

    //INSERTING ROWS INTO TABLE 
    $('#example').append(student);
}