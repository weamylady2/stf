module.exports = angular.module('stf.device-status', [])
  .filter('statusNameAction', function(gettext) {
    return function(text) {
      return {
        absent: gettext('Disconnected'),
        present: gettext('Connected'),
        offline: gettext('Offline'),
        unauthorized: gettext('Unauthorized'),
        preparing: gettext('Preparing'),
        ready: gettext('Ready'),
        using: gettext('Stop Using'),
        busy: gettext('Busy'),
        available: gettext('Use'),
        automation: gettext('Stop Automation')
      }[text] || text  
    }
  })
  .filter('statusNameActionFromDevice', function(gettext) {
   
    return function(device) {
      var text=device.state;
      
      if(!device.deivce_rent_conf || 
        !device.deivce_rent_conf.rent ||
        device.deivce_rent_conf.rent==false){
        return ('可租用');
      }
      else if(device.deivce_rent_conf && device.deivce_rent_conf.rent){
        var now = Date.now();
        if(device.deivce_rent_conf && device.deivce_rent_conf.now){
          now=device.deivce_rent_conf.now;
        }
        var time = device.deivce_rent_conf.start_time + device.deivce_rent_conf.rent_time*1000*60 - now;
        var hour = Math.floor(time/(1000*3600));
        var minute = Math.floor((time%(1000*3600))/(1000*60));
        var second = Math.floor((time%(1000*60))/(1000));
        if(time>=0){
          var tip = "剩" +hour+"时"+minute+"分"+second+"秒";
          if(device.deivce_rent_conf.owner){
            tip =  device.deivce_rent_conf.owner.name +':'+ tip;
          }
          return (tip) 
        }
        else{
          return gettext('租用过期')
        }
      }
      else {
        return ('Error State')
      }
    }
  })
  .filter('statusNamePassive', function(gettext) {
    return function(text) {
      return {
        absent: gettext('Disconnected'),
        present: gettext('Connected'),
        offline: gettext('Offline'),
        unauthorized: gettext('Unauthorized'),
        preparing: gettext('Preparing'),
        ready: gettext('Ready'),
        using: gettext('Using'),
        busy: gettext('Busy'),
        available: gettext('Available'),
        automation: gettext('Automating'),
      }[text] || gettext('Unknown')
    }
  })
 .filter('likelyLeaveReason', function(gettext) {
    return function(text) {
      return {
        ungroup_request: gettext('You (or someone else) kicked the device.'),
        owner_change: gettext('Someone stole your device.'),
        automatic_timeout: gettext('Device was kicked by automatic timeout.	'),
        device_absent: gettext('Device is not present anymore for some reason.'),
        status_change: gettext('Device is present but offline.')
      }[text] ||  text
    }
  })
  .filter('batteryHealth', function(gettext) {
    return function(text) {
      return {
        cold: gettext('Cold'),
        good: gettext('Good'),
        dead: gettext('Dead'),
        over_voltage: gettext('Over Voltage'),
        overheat: gettext('Overheat'),
        unspecified_failure: gettext('Unspecified Failure')
      }[text] || gettext('-')
    }
  })
  .filter('batterySource', function(gettext) {
    return function(text) {
      return {
        ac: gettext('AC'),
        usb: gettext('USB'),
        wireless: gettext('Wireless')
      }[text] || gettext('-')
    }
  })
  .filter('batteryStatus', function(gettext) {
    return function(text) {
      return {
        charging: gettext('Charging'),
        discharging: gettext('Discharging'),
        full: gettext('Full'),
        not_charging: gettext('Not Charging')
      }[text] || gettext('-')
    }
  })
  .filter('displayDensity', function() {
    return function(text) {
      return {
        '0.5': 'LDPI', // (120 dpi)
        '1': 'MDPI', // (160 dpi)
        '1.5': 'HDPI', // (240 dpi)
        '2': 'XHDPI', // (320 dpi)
        '3': 'XXHDPI', // (480 dpi)
        '4': 'XXXHDPI' // (640 dpi)
      }[text] || text
    }
  })
  .filter('networkType', function(gettext) {
    return function(text) {
      return {
        bluetooth: gettext('Bluetooth'),
        dummy: gettext('Dummy'),
        ethernet: gettext('Ethernet'),
        mobile: gettext('Mobile'),
        mobile_dun: gettext('Mobile DUN'),
        mobile_hipri: gettext('Mobile High Priority'),
        mobile_mms: gettext('Mobile MMS'),
        mobile_supl: gettext('Mobile SUPL'),
        mobile_wifi: gettext('WiFi'),
        wimax: gettext('WiMAX')
      }[text] || text
    }
  })
  .filter('networkSubType', function(gettext) {
    return function(text) {
      return {
        mobile_wifi: gettext('WiFi')
      }[text] || text
    }
  })
  .filter('humanizedBool', function(gettext) {
    return function(text) {
      switch (text) {
        case true:
          return gettext('Yes')
        case false:
          return gettext('No')
        default:
          return gettext('-')
      }
    }
  })
