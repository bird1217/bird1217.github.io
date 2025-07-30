$(document).ready(function () {

    $('#Lesson').val('325');

    $('#Lesson').change(function () {
        var dom = $(this);

        var selectionText = dom.val();

        var distance = $('#Distance').val();

        getTrainingData(selectionText, distance);
    });

    $('#Distance').change(function () {
        var dom = $(this);

        var selectionText = dom.val();

        var lesson = $('#Lesson').val();

        getTrainingData(lesson, selectionText);
    });

//Week
$('#Week').change(function () {
        var dom = $(this);

        var selectionText = dom.val();

        $('#imgTraining').attr('src', 'img/' + selectionText + '.jpg');
    });

    getTrainingData('325', '1k');
});

function getTrainingData(speed, distance) {
    $('#ftpZoneTable tbody').empty();



    var filterArray = trainingArray.filter(function (item) {
        return item.目標 == speed;
    });

    var text = filterArray[0][distance];

    var item = text.split(' ').filter(Boolean);

    var colorSetting = { "輕鬆跑": "#ffffff", "短間歇": "#e2ffda", "長間歇": "#ddebf7", "節奏跑": "#fce4d6", "長跑": "#fff2cc", "恢復跑": "#ffffff" };

    var html = '';
    $.each(item, function (key, value) {
        html += '<tr>';

        var trainingType = value.split('：')[0];

        html += `<td style="background-color:${colorSetting[trainingType]};">${trainingType}</td>`;
        html += `<td style="background-color:${colorSetting[trainingType]};">${value.split('：')[1]}</td>`;

        html += '</tr>';
        console.log(html);
    });

    $('#ftpZoneTable').append(html);
}

