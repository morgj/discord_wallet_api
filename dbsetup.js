var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./main.db');

db.serialize(function() {

    const CREATE_ACCOUNT = 'create table account(\
	unique_id varchar(40) not null primary key,\
    permission smallint not null default 0);\
	'

    const CREATE_BALANCE_SHEET = 'create table balance_sheet(\
    currency_name varchar(40) not null,\
    unique_id varchar(44) not null);\
    '
    
    const CREATE_BALANCE_HISTORY = 'create table balance_history(\
	id integer primary key autoincrement,\
	sender_unique_id varchar(44) not null,\
	receiver_unique_id varchar(44) not null,\
	balance varchar(55) default "0",\
	difference varchar(55) default "0",\
	date text);\
	'

	/*
	db.run("drop table account")
	db.run("drop table balance_sheet")
	db.run("drop table balance_history")
	*/

    db.run(CREATE_ACCOUNT);
    db.run(CREATE_BALANCE_SHEET);
    db.run(CREATE_BALANCE_HISTORY);

});

db.close();