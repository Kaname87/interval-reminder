var on = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  on = !on; //toggle
  if (on) {
    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
  } else {
    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
  }
});

// Notification
setInterval(function(){
    if (!on) return false;
    var cnt = localStorage.getItem("option-cnt");

    var d = new Date();
    var m = d.getMinutes();
    var s = d.getSeconds();

    for (var i =0; i < cnt; i++) {
        var option = JSON.parse(localStorage.getItem("option-" + i));
        // only Enable oprtion is used
        if (!option.enabled) continue;
        // for 3 seconds
        if (s < 3 && m == option.minute) {
            chrome.notifications.create(
                'name-for-notification',{
                type: 'basic',
                iconUrl: 'on.png',
                title: 'notice',
                message: option.message
            });
        }
    }
} , 500);


