module.exports = app => {

    var routerWorkspace = require("express").Router();
    const workspace = require("../controller/workspacecontroller");

    routerWorkspace.post("/create", workspace.createWorkSpace);
    app.use("/api/workspace", routerWorkspace);

    //Account
    var router = require("express").Router();
    const account = require("../controller/accountcontroller");

    router.post("/create/:schemaname", account.createAccount);
    router.post("/update/:schemaname", account.updateAccount)
    router.post("/login/:schemaname", account.login);

    router.get("/selectprojectaccount/:schemaname", account.selectprojectaccount);
    router.get("/:id", account.findById);

    router.delete("/:schemaname", account.deleteAccount);

    app.use("/api/account", router);


    //Project
    var routerProject = require("express").Router();
    const project = require("../controller/projectcontroller");

    routerProject.post("/create/:schemaname", project.createProject);
    routerProject.put("/update/:schemaname", project.updateProject);
    routerProject.put("/delete/:schemaname", project.deleteProject);

    routerProject.get("/getnproject/:schemaname", project.getNProject);
    routerProject.get("/getprojectid/:schemaname", project.findProjectById);

    routerProject.get("/countall/:schemaname", project.countProject);

    app.use("/api/project", routerProject);

    //station
    var routerStation = require("express").Router();
    const station = require("../controller/stationcontroller");

    routerStation.post("/create/:schemaname", station.createStation);
    routerStation.post("/update/:schemaname", station.updateStation);
    routerStation.post("/delete/:schemaname", station.deleteStation);

    routerStation.get("/getnstation/:schemaname", station.getNStation);
    routerStation.get("/getstationid/:schemaname", station.findStationById);
    routerStation.get("/countall/:schemaname", station.countStation);
    routerStation.get("/getallstationinproject/:schemaname", station.getAllStationInProject);

    app.use("/api/station", routerStation);

    //indicator
    var routeIndicator = require("express").Router();
    const indicator = require("../controller/indicatorcontroller");
    routeIndicator.post("/create/:schemaname", indicator.createIndicator);
    routeIndicator.put("/update/:schemaname", indicator.updateIndicator);
    routeIndicator.put("/delete/:schemaname", indicator.deleteIndicator);
    routeIndicator.get("/getallindicator/:schemaname", indicator.getAllIndicatorInfo);
    routeIndicator.get("/getindicator/:schemaname", indicator.getIndicatorInfo);

    app.use("/api/indicator", routeIndicator);


    //device
    var routerDevice = require("express").Router();
    const device = require("../controller/devicecontroller");
    const deviceusage = require("../controller/deviceusagecontroller");
    const deviceManager = require("../BrokerConnection/devicemanager");

    // routerDevice.post("/create/:schemaname", deviceManager.createNewDevice);
    routerDevice.post("/create/:schemaname", device.createDevice);
    routerDevice.put("/update/:schemaname", device.updateDevice);
    routerDevice.put("/delete/:schemaname", device.deleteDevice);
    routerDevice.get("/getalldevice/:schemaname", deviceusage.getAllDeviceInfo);
    routerDevice.get("/getdeviceinfo/:schemaname", deviceusage.getDeviceInfo);
    routerDevice.get("/getndevice/:schemaname", device.getNDevice);
    routerDevice.get("/getalldeviceinproject/:schemaname", device.getAllDeviceInProject);
    routerDevice.get("/getalldeviceinstation/:schemaname", device.getAllDeviceInStation);

    routerDevice.get("/getdeviceid/:schemaname", device.getDeviceById);
    routerDevice.get("/countall/:schemaname", device.countDevice);

    app.use("/api/device", routerDevice);




    //devcieType
    var routeIndicator = require("express").Router();
    const deviceType = require("../controller/devicetype");
    routeIndicator.post("/create/devicetype/:schemaname", deviceType.createDeviceType);
    routeIndicator.put("/update/devicetype/:schemaname", deviceType.updateDeviceType);
    routeIndicator.put("/delete/devicetype/:schemaname", deviceType.deleteDeviceType);
    routeIndicator.get("/getallindicator/devicetype/:schemaname", deviceType.getAllDeviceTypeInfo);
    routeIndicator.get("/getindicator/devicetype/:schemaname", deviceType.getDeviceTypeInfo);

    app.use("/api/indicator", routeIndicator);


    //Tracking data
    var routerTrackingData = require("express").Router();
    const trackingdata = require("../controller/trackingdatacontroller");

    routerTrackingData.post("/adddata/:schemaname", trackingdata.addData);
    routerTrackingData.get("/getdatainrangedate/:schemaname", trackingdata.getDataInRangeDate);
    routerTrackingData.get("/getlastnrecord/:schemaname", trackingdata.getLastNRecord);
    app.use("/api/trackingdata", routerTrackingData);
};