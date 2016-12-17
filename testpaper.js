/**
 * Created by zhaojm on 17/12/2016.
 */




var page_main = function (num, danxuanItemsAll, duoxuanItemsAll, panduanItemsAll) {


    var getView = function () {
        var getDanxuanItemView = function (item, index) {
            var l = item.split(',');
            var result = "<div>" +
                "<p><span>" + index + "<span><span>" + l[1] + "</span></p>" +
                "<p>" +
                "<label><input name='" + l[0] + "' type='radio' value='A' />" + l[2] + "</label>" +
                "<label><input name='" + l[0] + "' type='radio' value='B' />" + l[3] + "</label>" +
                "<label><input name='" + l[0] + "' type='radio' value='C' />" + l[4] + "</label>" +
                "<label><input name='" + l[0] + "' type='radio' value='D' />" + l[5] + "</label>" +
                "</p>" +
                "</div>";
            return result;
        };

        var getDuoxuanItemView = function (item, index) {
            var l = item.split(',');
            var result = "<div>" +
                "<p><span>" + index + "<span><span>" + l[1] + "</span></p>" +
                "<p>" +
                "<label><input name='" + l[0] + "' type='checkbox' value='A' />" + l[2] + "</label>" +
                "<label><input name='" + l[0] + "' type='checkbox' value='B' />" + l[3] + "</label>" +
                "<label><input name='" + l[0] + "' type='checkbox' value='C' />" + l[4] + "</label>" +
                "<label><input name='" + l[0] + "' type='checkbox' value='D' />" + l[5] + "</label>" +
                "</p>" +
                "</div>";
            return result;
        };
        var getPanduanItemView = function (item, index) {
            var l = item.split(',');
            var result = "<div>" +
                "<p><span>" + index + "<span><span>" + l[1] + "</span></p>" +
                "<p>" +
                "<label><input name='" + l[0] + "' type='radio' value='错' />错</label>" +
                "<label><input name='" + l[0] + "' type='radio' value='对' />对</label>" +
                "</p>" +
                "</div>";
            return result;
        };

        var getDanxuanListView = function (items) {
            var result = "<h2>单选  （20个 每个两分）</h2>";

            items.forEach(function (item, index) {
                result += getDanxuanItemView(item, index);
            });
            return result;
        };
        var getDuoxuanListView = function (items) {
            var result = "<h2>多选（20个 每个两分）</h2>";

            items.forEach(function (item, index) {
                result += getDuoxuanItemView(item, index);
            });
            return result;
        };
        var getPanduanListView = function (items) {
            var result = "<h2>判断（20个 每个一分）</h2>";

            items.forEach(function (item, index) {
                result += getPanduanItemView(item, index);
            });
            return result;
        };

        var getLeftView = function () {
            var result = "<div>";
            result += getDanxuanListView(danxuanItems);
            result += getDuoxuanListView(duoxuanItems);
            result += getPanduanListView(panduanItems);
            result += "</div>";
            return result;
        };

        var getRightView = function () {
            var result = "<div>计时: <span id='time'></span></div>";
            return result;
        };

        var result = "";
        result += getRightView();
        result += getLeftView();
        result += "<button id='btn'>提交</button>";
        return result;
    };


    var randomData = function () {
        var getRandomArray = function (arr) {
            var len = arr.length;
            if (len < num) {
                return arr;
            }
            var result_index = [];
            while (result_index.length < num) {
                var r = Math.floor(Math.random() * arr.length);
                if (result_index.indexOf(r) == -1) {
                    result_index.push(r);
                }
            }
            result_index.sort();
            console.log(result_index);
            var result = [];
            result_index.forEach(function (i) {
                result.push(arr[i]);
            });
            return result;
        };

        danxuanItems = getRandomArray(danxuanItemsAll);
        duoxuanItems = getRandomArray(duoxuanItemsAll);
        panduanItems = getRandomArray(panduanItemsAll);
    };

    var getScore = function () {

        var getDanxuanScore = function () {
            var score = 0;
            danxuanItems.forEach(function (item) {
                var l = item.split(',');
                var number = l[0];
                var right = l[6];
                var val = document.getElementsByName(number).valueOf();
                if (val == right) {
                    score += 2;
                }
            });
            return score;
        };
        var getDuoxuanScore = function () {
            var score = 0;
            danxuanItems.forEach(function (item) {
                var l = item.split(',');
                var number = l[0];
                var right = l[6];
                var val = document.getElementsByName(number).valueOf();
                if (right.indexOf(val) > -1) {
                    score += 2;
                }
            });
            return score;
        };
        var getPanduanScore = function () {
            var score = 0;
            danxuanItems.forEach(function (item) {
                var l = item.split(',');
                var number = l[0];
                var right = l[2];
                var val = document.getElementsByName(number).valueOf();
                if (val == right) {
                    score += 1;
                }
            });
            return score;
        };

        return getDanxuanScore() + getDuoxuanScore() + getPanduanScore();
    };


    var init = function () {

        randomData();

        document.getElementById('main').innerHTML = getView();

        document.getElementById('btn').onclick = function () {
            var score = getScore();
            page_result(score);
        };

    };

    var danxuanItems, duoxuanItems, panduanItems = [];
    init();

};


var page_result = function (score) {
    var getView = function (score) {
        var result = "<div><p>得分:" + score + "</p><p><button id='btn'>再来一次</button></p></div>"
        return result;
    };

    var init = function () {
        document.getElementById('main').innerHTML = getView();

        document.getElementById('btn').onclick = function () {
            location.reload();
        };
    };

    init();
};

window.onload = function () {

    var danxuan_csv = $.ajax({url: "danxuan.csv", async: false});
    var duoxuan_csv = $.ajax({url: "duoxuan.csv", async: false});
    var panduan_csv = $.ajax({url: "panduan.csv", async: false});
    var danxuanItemsAll = danxuan_csv.responseText.split('\n');
    var duoxuanItemsAll = duoxuan_csv.responseText.split('\n');
    var panduanItemsAll = panduan_csv.responseText.split('\n');


    var num = 10;


    page_main(num, danxuanItemsAll, duoxuanItemsAll, panduanItemsAll);


};