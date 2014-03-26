Handlebars.registerHelper('timeMeasurement', function(time) {
  
  var diff = ((new Date).getTime() - time) / 60 / 1000;
  
  if(diff <= 60) {
    return Math.round(diff) + ' min';
  }else if(diff <= 1440){
    return Math.round(diff / 60) + ' h';
  }else if(diff <= 525600) {
    var date = new Date(time);
    return date.getDay() + 1 + ' ' + date.getMonthName(true);
  }else {
    var date = new Date(time);
    return date.getDay() + 1 + ' ' + date.getMonthName(true) + ' ' + date.getYear();    
  }
});