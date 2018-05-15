function sendNotification(username) {
    var SS = SpreadsheetApp.getActiveSpreadsheet()
    var slack = ""
    var data = {
      "text": "You've been assigned to a comment in " + SS.getName() + ". Click <" + SS.getUrl() + "|here> to access the Google Sheet!",
      "channel": username
    };
    
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      // Convert the JavaScript object to a JSON string.
      'payload' : JSON.stringify(data)
    };
    UrlFetchApp.fetch(slack, options);
  }
  
  function onInstall(e){
    onOpen(e);
  }
  
  function getSheetUrl() {
    var SS = SpreadsheetApp.getActiveSpreadsheet();
    var ss = SS.getActiveSheet();
    var url = '';
    url += SS.getUrl();
    url += '#gid=';
    url += ss.getSheetId(); 
    return url;
  }
  
  function getSheetName(){
    var SS = SpreadsheetApp.getActiveSpreadsheet();
    return SS.getSheetName()
  }
  
  function onOpen(e) {
    var mainMenu = SpreadsheetApp.getUi().createMenu('Slack Notification');
    mainMenu.addItem('Notify All', 'notifyAll');
    mainMenu.addToUi();
  }
  
  function notifyAll() {
    var usernames = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('slack').getDataRange().getValues();
    for(n = 1; n < usernames.length; ++n){ // start after header
      sendNotification(usernames[n][1]) ; // x is the index of the column starting from 0
    }
    SpreadsheetApp.getUi()
       .alert('Slack notification sent to all members of this sheet!');
  }