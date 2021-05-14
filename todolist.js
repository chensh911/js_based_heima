$(function () {
    function getData() {
        var data = localStorage.getItem("todo");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveData(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }

    function load() {
        $('ol, ul').empty();
        var doneCount = 0;
        var doingCount = 0;
        var data = getData();
        $.each(data, function (i, e) {
            var li_string = '<li><input type="checkbox"'
            if (e.done) {
                li_string += ' checked';
            }
            li_string += '><p>' + e.title + '</p><a href="javascript:;" id=' + i + '></a></li>'
            var li = $(li_string);
            if (e.done) {
                $('ul').prepend(li);
                doneCount ++;
            } else {
                $('ol').prepend(li);
                doingCount ++;
            }
        })
        $('.doing-count').html(doingCount);
        $('.finish-count').html(doneCount);
    }

    load();
    $('header input').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != "") {
                var local = getData();
                local.push({title: $(this).val(), done: false});
                console.log(local);
                saveData(local);
                $(this).val("");
                load();
            }
        }
    })

    $('ol, ul').on('click', 'a', function () {
        var data = getData();
        var index = $(this).attr('id');
        data.splice(index, 1);
        saveData(data);
        load();
    });

    $('ol, ul').on('click', 'input', function () {
        var data = getData();
        var index = $(this).siblings('a').attr('id');
        var status = $(this).attr('checked');
        if (status === undefined) {
            data[index].done = true;
        } else {
            data[index].done = false;
        }
        saveData(data);
        load();
    });

    $('footer a').click(function () {
        localStorage.setItem("todo", "[]");
        load();
    })
});