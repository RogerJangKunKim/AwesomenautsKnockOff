<?php
	//HTML tags can be used in php.
	//take info from database.php in model folder to connect to database. __DIR__ creates path to directory.
	require_once(__DIR__ . "/../model/config.php");

	//query will create a table. put info in that database(more specifically, the table)
	//auto increments blogposts for us. maximum length of title is 255 characters. title and pot can't be null. 
	//primary key-hooks both tables together.
	//id is integer, title is string, post is text. none can be null.
	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
		  . "id int(11) NOT NULL AUTO_INCREMENT,"
		  . "username varchar(30) NOT NULL,"
		  . "email varchar(50) NOT NULL,"
		  . "password char(128) NOT NULL, "
		  . "salt char(128) NOT NULL,"
		  . "exp int(4),"
		  . "exp1 int(4),"
		  . "exp2 int(4),"
		  . "exp3 int(4),"
		  . "exp4 int(4),"
		  . "PRIMARY KEY (id))");
