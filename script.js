var holidays = new Set();

function count(){

  var startDate = Date.parse(document.getElementById("start").value);
  var endDate = Date.parse(document.getElementById("end").value);
  var duration = parseInt(document.getElementById("duration").value);

  var date = new Date(endDate - startDate);
  var stdate = new Date(startDate);
  var endate = new Date(endDate);

  if(startDate > Date.now() && endDate > Date.now() && endDate - startDate > 86399999 && endDate - startDate < 5616000001 )
  { 
    if(stdate.getDay() == 0)
    { 
      alert("Отпуск начинается в воскресенье!");
    }
    var dur = ((date.getTime()/(24*60*60*1000)) + 1);
    dur = dur - countDays(stdate, dur)
    document.getElementById("resultText").textContent = "Итого: дней: " + dur + ", начало: " + stdate.toLocaleDateString() + ", конец: " + endate.toLocaleDateString()
  } 
  else 
  {
    if(startDate > Date.now() && duration > 0 && duration < 61){
      endate.setTime(stdate.getTime() + (duration-1) * (24*60*60*1000))
      var dur = duration;
      if(stdate.getDay() == 0){
        alert("Отпуск начинается в воскресенье!");
      }
      dur = dur - countDays(stdate, dur) ;
      document.getElementById("resultText").textContent = "Итого: дней: " + dur + ", начало: " + stdate.toLocaleDateString() + ", конец: " + endate.toLocaleDateString()
    }
     else {
      if(endDate > Date.now() && duration > 0 && duration < 61){
        var dur = duration;
        stdate.setTime(endate.getTime() - (duration-1) * (24*60*60*1000))
       dur = dur - countDays(stdate, dur) ;
        if(stdate.getDay() == 0){
          alert("Отпуск начинается в воскресенье!");
        }
        document.getElementById("resultText").textContent = "Итого: дней: " + dur + ", начало: " + stdate.toLocaleDateString() + ", конец: " + endate.toLocaleDateString()
      } else {
        alert("Неверные данные!")
      }
    }
  }   
}

function addHoliday(){
  var holiday = Date.parse(document.getElementById("holiday").value);
  var date = new Date(holiday);
  var holidayIsWas = false

  for (let item of holidays){
    if(item.getTime() == date.getTime()){
      holidayIsWas = true
      alert("Такой праздник уже есть!")
    } 
  }
  if(holidayIsWas != true) {
    holidays.add(date);
    document.getElementById("holidayString").append(date.toLocaleDateString());
    document.getElementById("holidayString").append(", ");
  }
}

function countDays(startDate, duration){
  var newStartDate = new Date(startDate.getTime());
  var counter = 0;
  for (let i = 0; i < duration; i++) { 
    console.log(newStartDate.toLocaleDateString())
    console.log("dur = " + duration)
    for (let item of holidays){
      if(item.getTime() == newStartDate.getTime()){
        counter++;
      } 
    }
    newStartDate.setTime(newStartDate.getTime() + (24*60*60*1000));
    console.log("counter = " + counter)
  }
  return counter
}


