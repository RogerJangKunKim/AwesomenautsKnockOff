<?php
	class Database{
		//Classes are used for representing data as objects, keeps data together and makes it easier to understand.
		// private= can only be accessed here. not global.
			
		private $connection;
		private $host;
		private $username;
		private $password;
		private $database; //take info from create-db.php and stores them in this variable. used for easier maintainance and easier coding.
		public $error; //must be public because we want to access it in create-db.php

		//constructor will build an object
		//variables used are global. but the variables inside are local.
				
		public function __construct($host, $username, $password, $database){
			//accessing host variable above. will only exist in this function, local variable. uses global variable to make an arguement
			$this->host = $host;
			$this->username = $username;
			$this->password = $password;
			$this->database = $database;
			//makes connection to a new database. mysqli-object used to connect to the database.
			$this->connection = new mysqli($host, $username, $password);

			//checks if there is a connection error. kill program if error.
			if($this->connection->connect_error){
				die("<p>Error: " . $this->connection->connect_error . "</p>");
			}
				

			//selecting a data base. returns true/not true
			$exists = $this->connection->select_db($database);
				

			//checking if database doesn't exists. queries are questions/commands sent to the database. ONLY runs if database does not exist.
			if(!$exists){
				$query = $this->connection->query("CREATE DATABASE $database"); /*will say true if successful, false if not*/
				/*check if successful/not*/
				if($query){
					echo "<p>Successfully created database: " . $database . "</p>";
				}
			}
			//if there is a database, this else statement will run.
			else{
				echo "<p>Database already exists.</p>";
			}
		}
		//functions are blocks of statements that can be repeated, but they will only run when they are called.
		//these functions will eliminate a lot of repetition because we can use these functions to open/close a connection
		public function openConnection(){
			$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
			//checks if there is a connection error. kill program if error.
			if($this->connection->connect_error){
				die("<p>Error: " . $this->connection->connect_error . "</p>");
			}
		}

		public function closeConnection(){
			//isset checks if variable has something within the variable. if no info, will return null.
			if (isset($this->connection)) {
				$this->connection->close();
			}
		}
		//data stored un $string, results stored in $query
		public function query($string){
			$this->openConnection();

			$query = $this->connection->query($string);

			//checking if query is false. it will make it true.
			if(!$query){
				$this->error = $this->connection->error;
			}

			$this->closeConnection();

			return $query;
		}
	}