mqtt = require('mqtt');
const device = require("../controller/devicecontroller");
const workspace = require("../controller/workspacecontroller");
const trackingdata = require("../controller/trackingdatacontroller");
const brokerConfig = require("../config/BrokerConfig");

module.exports = class PubSubClient {

    constructor() {
        this.key = brokerConfig.accountKey;
        this.listDevice = [];
        
    };

    addDevice(listNewDevice){
      //this.listDevice = this.listDevice.concat(name);\
      this.listDevice = Object.assign(this.listDevice, listNewDevice);


    }

    loadAllDevice(){
      workspace.getAllWorkspaceName().then(async data =>{
        for (let value of data) {
          const temp = await device.getAllDeviceName(value);
          this.addDevice(temp);
        }
      })   
    }

    connect() {
        this.client = mqtt.connect({
            host: brokerConfig.host,
            port: 1883,
            protocol: 'mqtt',
            username: brokerConfig.accountName,
            password: this.key,
            connectTimeout: 60 * 1000,
            keepalive: 3600
        });

        this.client.on('connect', () => {
          const listDeviceName = Object.keys(this.listDevice);
          listDeviceName.forEach(function(value){
            console.log('subscribe to %s', value);
              this.client.subscribe(value);
            }.bind(this));

            console.log('connected');
          });
      
          this.client.on('reconnect', () => {
            
            const listDeviceName = Object.keys(this.listDevice);
            listDeviceName.forEach(function(value){
              console.log('subscribe to %s', value);
              this.client.subscribe(value);
            }.bind(this));

            console.log('reconnect connected');
          });
      
          this.client.on('error', (err) => console.log('error %s', err));
      
          this.client.on('offline', () => {
            console.log('offline')
        });
      
          this.client.on('close', () => {
            console.log('close')
          });
      
          this.client.on('message', (topic, message) => {
            console.log('message: %s', message);
            const deviceInfo = this.listDevice[topic];

            if (deviceInfo){
              console.log('message: %s %s', deviceInfo, deviceInfo);
              trackingdata.addDataBroker(deviceInfo.workspace, deviceInfo.id, Buffer.from(message).toString());
            }
          });
    };

    addNewDevice(schema, devicename, deviceId){
      this.listDevice[brokerConfig.feedDevice + devicename] = {id : deviceId, workspace : schema};
      this.client.subscribe(brokerConfig.feedDevice + devicename);
    }

};