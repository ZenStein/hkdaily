var google = require('googleapis')
var client = require('./sheetstest')
// "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"
// 'https://www.googleapis.com/auth/gmail.modify'
client.execute(["https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"], function(tokens){
    console.log('tokens', tokens)
    var sheets = google.sheets('v4');
    //console.log(sheets)
    var request = {
    // The spreadsheet to request.
    spreadsheetId: '1ay7N_Nz1iqzbTcpeccPAMT0wD5qzijAx7TcYmOMwOMw',  // TODO: Update placeholder value.

    // The ranges to retrieve from the spreadsheet.
    range: "A1:B2",  // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    // includeGridData: false,  // TODO: Update placeholder value.

    access_token: tokens.access_token,
  };

  sheets.spreadsheets.values.clear(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
})
