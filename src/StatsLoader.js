export const tableToJson = table => { 
    var data = [];
    for (var i=1; i<table.rows.length; i++) { 
        var tableRow = table.rows[i]; 
        var rowData = []; 
        for (var j=0; j<tableRow.cells.length; j++) { 
            rowData.push(tableRow.cells[j].innerHTML);; 
        } 
        data.push(rowData); 
    } 
    return data;
}

export const parseTableToGoals = table => {
    const parsedData = table.reduce((previousValue, currentValue, index) => {
      if (currentValue.length < 5) {
        return previousValue;
      } else if (isNaN(+currentValue[9])) {
        previousValue.push({round: index+1, goals: previousValue[previousValue.length-1].goals})
      }  else {
        previousValue.push({round: index+1, goals: previousValue[previousValue.length-1].goals + +currentValue[9]})
      }
      return previousValue;
    }, [{round:0, goals: 0}]);
    
    parsedData.shift();
    
    return parsedData;
  }

  export const parseData = async url => {
    const document = await fetch(url)
        .then((data) => data.text())
        .then(res => {
            var parser = new DOMParser();
            return parser.parseFromString(res, 'text/html');
        });
    const seasonTable = document
      .querySelectorAll('.table-header img[title="1. Bundesliga"]')[0]
      .closest('div.box')
      .querySelector('div.responsive-table table');
    
    const tableAsJSON = tableToJson(seasonTable);
    
    return parseTableToGoals(tableAsJSON);
  } 