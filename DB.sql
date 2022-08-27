CREATE TABLE Project(
	id INT PRIMARY KEY,
	projectID INT NOT NULL,
	customerID INT NOT NULL,
	salePersonID INT NOT NULL,
	projectName CHAR(256) NOT NULL,
	createAt TIMESTAMP NOT NULL,
	createBy INT NOT NULL NOT NULL,
	deleteAt TIMESTAMP,
	deleteBy INT,
	updateAt TIMESTAMP,
	updateBy INT,
	startDate TIMESTAMP NOT NULL,
	endDate TIMESTAMP,
	city CHAR(20),
	district CHAR(20),
	ward CHAR(20),
	longitude DECIMAL(10,7),
	latitude DECIMAL(10,7),
	addressDetail CHAR(128),
	fileAttached CHAR(256),
	description CHAR(256)
);

CREATE TABLE Station(
	id INT PRIMARY KEY,
	stationName CHAR(256) NOT NULL,
	createAt TIMESTAMP NOT NULL,
	createBy INT NOT NULL NOT NULL,
	deleteAt TIMESTAMP,
	deleteBy INT,
	updateAt TIMESTAMP,
	updateBy INT,
	startDate TIMESTAMP NOT NULL,
	endDate TIMESTAMP,
	phoneNumber CHAR(10),
	balance INT,
	expiredDay TIMESTAMP,
	qualityScore INT,
	city CHAR(20),
	district CHAR(20),
	ward CHAR(20),
	longitude DECIMAL(10,7),
	latitude DECIMAL(10,7),
	addressDetail CHAR(128),
	description CHAR(256)
);

CREATE TABLE Device(
	id INT PRIMARY KEY,
	parentID INT,
	status SMALLINT,
	protocol SMALLINT,
	deviceType SMALLINT,
	serialNumber CHAR(16),
	createAt TIMESTAMP NOT NULL,
	createBy INT NOT NULL NOT NULL,
	deleteAt TIMESTAMP,
	deleteBy INT,
	updateAt TIMESTAMP,
	updateBy INT,
	startDate TIMESTAMP NOT NULL,
	endDate TIMESTAMP,
	description CHAR(256)
);

CREATE TABLE DeviceUsage(
	id INT PRIMARY KEY,
	deviceID INT,
	projectID INT,
	stationID INT,
	startDate TIMESTAMP,
	endDate TIMESTAMP
);

CREATE TABLE DeviceUsage(
	id INT PRIMARY KEY,
	deviceID INT,
	projectID INT,
	stationID INT,
	startDate TIMESTAMP,
	endDate TIMESTAMP
);

CREATE TABLE DeviceLog(
	id INT PRIMARY KEY,
	deviceID INT,
	date TIMESTAMP,
	logType SMALLINT,
	logContent CHAR(256)	
);

CREATE TABLE Attribute(
	id INT PRIMARY KEY,
	category SMALLINT,
	attributeName CHAR(20),
	valueType SMALLINT,
	defaultValue INT
);

CREATE TABLE DeviceAttribute(
	id INT PRIMARY KEY,
	attributeID INT,
	deviceID INT
);

CREATE TABLE DeviceType(
	id INT PRIMARY KEY,
	typeName CHAR(20),
	description CHAR(256)
);

CREATE TABLE Alarm(
	id INT PRIMARY KEY,
	deviceID INT,
	alarmName CHAR(20),
	severity SMALLINT,
	schedule CHAR(256),
	emailNotify SMALLINT,
	smsNotify SMALLINT,
	notifyExpression CHAR(256),
	notifyContent CHAR(256),
	description CHAR (256)
);

CREATE TABLE Indicator(
	id INT PRIMARY KEY,
	deviceID INT,
	indicatorName CHAR(20),
	methodType SMALLINT,
	api SMALLINT,
	unitType SMALLINT,
	minValue INT,
	maxValue INT,
	argument CHAR(256),
	threshold INT
);

CREATE TABLE DeviceData(
	id INT PRIMARY KEY,
	deviceID INT,
	indicatorID INT,
	value INT,
	second INT,
	minute INT,
	hour INT,
	day SMALLINT,
	month SMALLINT,
	year BYTE
);

CREATE TABLE Notification(
	id INT PRIMARY KEY,
	type SMALLINT,
	alarmID INT,
	deviceID INT,
	projectID INT,
	time TIMESTAMP
);

CREATE TABLE NotificationAddress(
	id INT PRIMARY KEY,
	type SMALLINT,
	address CHAR(56)
);

CREATE TABLE Widget(
	id INT PRIMARY KEY,
	projectID INT,
	userID INT,
	widgetInfo CHAR(256)
);

CREATE TABLE Account(
	id INT PRIMARY KEY,
	accountName CHAR(50),
	accountPassword CHAR(15),
	projectID INT,
	firstName CHAR(20),
	lastName CHAR(20),
	startDate TIMESTAMP NOT NULL,
	endDate TIMESTAMP,
	city CHAR(20),
	district CHAR(20),
	ward CHAR(20),
	addressDetail CHAR(256),
	phoneNumber CHAR(10),
	email CHAR(50),
	accountType SMALLINT,
	accountRole SMALLINT,
	avatar CHAR(256)
);

CREATE TABLE Role(
	id INT PRIMARY KEY,
	level SMALLINT,
	description CHAR(256)
);

CREATE TABLE Permission(
	id INT PRIMARY KEY,
	permissionName CHAR(20),
	description CHAR(256)
);

CREATE TABLE Setting(
	id INT PRIMARY KEY,
	defaultProjectID INT,
	fontSize INT,
	displayMode SMALLINT,
	language BYTE
);

CREATE TABLE Ticket(
	id INT PRIMARY KEY,
	creatorID INT,
	assignID INT,
	priority SMALLINT,
	description CHAR(250),
	statuc SMALLINT,
	fileAttached CHAR(256),
	createAt TIMESTAMP,
	closeDate TIMESTAMP,
	deadline TIMESTAMP,
	type BYTE
);

CREATE TABLE Comment(
	id INT PRIMARY KEY,
	userID INT,
	date TIMESTAMP,
	content CHAR(256),
	fileAttached CHAR(256)
);


CREATE TABLE workspaces(
	id INT PRIMARY KEY,
	workspaceName CHAR(256),
	allowCreateAccount CHAR(256),
	description CHAR(256)
);