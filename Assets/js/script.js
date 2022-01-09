var workDayPlanner = [];

// create and loop array
for (time = 9; time <= 17; time++) {
    var id = time - 9;
    var dataPlanner = "";
    var aHour = 0;
    var ampm = "";
  
    if (time === 12) {
      aHour = 12;
      ampm = "pm";
    } else if (time > 12) {
      aHour = time - 12;
      ampm = "pm";
    } else if (time < 12) {
      aHour = time;
      ampm = "am";
    }
    aHour = aHour.toString();
  
    dataPlanner = {
      id: id,
      aHour: aHour,
      time: time,
      ampm: ampm,
      dataPlanner: dataPlanner,
    };
    workDayPlanner.push(dataPlanner);
  }

//   Current date information
function currentDate() {
    var aDate = moment().format("dddd, MMMM Do");
    $("#currentDay").text(aDate);
  }

//   Store data in the localstorage
function storePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(workDayPlanner));
  }

//   Display the data in localstorage
function plannerDataDisplay() {
    workDayPlanner.forEach(function (hour) {
      $("#" + hour.id).val(hour.dataPlanner);
    });
  }

//   Load the data
function dataLoader() {
    var dataLoad = JSON.parse(localStorage.getItem("dayPlanner"));
    if (dataLoad) {
      workDayPlanner = dataLoad;
    }
    storePlannerData();
    plannerDataDisplay();
  }

  workDayPlanner.forEach(function (hour) {
    var aRow = $("<form>");
    aRow.addClass("row");
    $(".container").append(aRow);
  
    var elField = $("<div>");
    elField.addClass("col-md-2 hour");
    elField.text(hour.aHour + hour.ampm);
  
    var dInput = $("<div>");
    dInput.addClass("col-md-9 description p-0");
  
    var elArea = $("<textarea>");
    elArea.addClass("col-md-12 width")
    elArea.attr("id", hour.id);

    // color-code the time blocks
    if (hour.time == moment().format("HH")) {
        elArea.addClass("present");
      } else if (hour.time < moment().format("HH")) {
        elArea.addClass("past");
      } else if (hour.time > moment().format("HH")) {
        elArea.addClass("future");
      }
      dInput.append(elArea);

    //   create the save button to define the end of a row
    var saveIcon = $("<i class='far fa-save fa-lg'></i>");
    var saveEnd = $("<button>").addClass("col-md-1 saveBtn");

    // append the elements to a row
    saveEnd.append(saveIcon);
  aRow.append(elField, dInput, saveEnd);
});

// Save button features and functionality
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    //store the information in the array
    var saveIndex = $(this).siblings(".description").children().attr("id");
    workDayPlanner[saveIndex].dataPlanner = $(this)
      .siblings(".description")
      .children()
      .val();
  
    storePlannerData();
    plannerDataDisplay();
  });

//   Load the dated date when the page loads
currentDate();
// Load contents of the page when page refreshes
dataLoader();
  