var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./main.db');

/*
create table account(\
	unique_id varchar(40) not null primary key,\
    permission smallint not null);\
*/

const create_account = (unique_id) => {
	let result = 
	{
		action: "post",
		status: -1,
		unique_id: unique_id
	}
	return new Promise((resolve, reject) => {
		db.all("insert into account (unique_id) values (?)", unique_id, (err, res) => {
			if(err){
				result.status = 409;
				reject(result);
			}
			resolve({
				action:"create", 
				unique_id: unique_id
			})
		})
	})
}

const delete_account = (unique_id) => {
	let result = 
	{
		action: "delete",
		status: 400,
		unique_id: unique_id
	}
	return new Promise((resolve, reject) => {
		db.all("delete from account where unique_id = ?", unique_id, (err, res) => {
			resolve(result)
		})
	})
}

const update_permission = (unique_id, permission_level) => {
	let result = 
	{
		action: "put",
		status: -1,
		unique_id: unique_id,
		permission_level: permission_level
	}
	return new Promise((resolve, reject) => {
		db.all("update account set permission = ? where unique_id = ?", 
		[permission_level, unique_id], (err, res) => {
			if(err){
				result.status = 500;
				reject(result);
			}
			result.status = 200;
			resolve(result);
		})
	})
}

const get_account_metadata = (unique_id) => {
	let result = 
	{
		action: "get",
		status: -1,
		unique_id: unique_id,
		permission: -1
	}
	return new Promise((resolve, reject) => {
		db.all("select permission from account where unique_id = ?", unique_id, (err, res) => {
			if(err){
				result.status = 500;
				reject(result); 
			}
			else if(res.length < 1){
				result.status = 404;
				reject(result); 
			}
			result.status = 200
			result.permission = res[0]["permission"];
			resolve(result);
		})
	})
}



const test = async () => {
		console.log(await create_account("440562705716477952"))
		//console.log(await get_account_metadata("440562705716477952"))
		console.log(await delete_account("440562705716477952"))
		//update_permission("440562705716477952", 3);
		//console.log(await get_permission_level("440562705716477952"))
}

test().catch(err => {console.log(err)})