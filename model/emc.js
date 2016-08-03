/**
 * Created by dg on 2016/8/3.
 */
var mysql = require('mysql');
var config = require("../config.js");
var conn = mysql.createConnection(config.db);
var emc = {};
var updateChat = function (room_id) {
    var sql = "update `chat_ingkee_2016_08_02` SET `active`=(SELECT  COUNT( DISTINCT `uid`) FROM `rank`.`ingkee_" + room_id + "_chat_2016_08_03`) WHERE room_id='" + room_id + "'"
    conn.query(sql, function (err, rows, field) {
        if (err) {
            console.log(err)
        }
    });
};
emc.doit = function () {
    var sql = "SELECT `room_id`  FROM `rank`.`chat_ingkee_2016_08_02`";
    conn.query(sql, function (err, rows, field) {
        if (err) {
            return console.log(err);
        }
        for(var i=0;i<rows.length;i++){
            updateChat(rows[i].room_id);
        }
    });
};
module.exports = emc;