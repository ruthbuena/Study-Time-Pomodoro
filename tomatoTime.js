var paramet = {}, current;

$(function () {
  current = 'pom';

  loadSettings();
  updateTimers();

  timer_local = false;

  $("#timer_default").createTimer({
    time_in_seconds: parseInt(paramet[current])
  });

  // chrome intermittent NaN on refresh workaround
  setTimeout(function() {
    $("#timer_default").resetTimer({
      time_in_seconds: parseInt(paramet[current])
    });
    //$("#timer_start, #timer_pause, #timer_reset").prop('disabled', false);
  }, 200);

  $("#pomodoro").click(function () {
    current = 'pom';
    toggleButtons('pomodoro');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.pom),
      autostart: true
    });
  });
  $("#short_break").click(function () {
    current = 'shrtbrk';
    toggleButtons('short_break');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.shrtbrk),
      autostart: true
    });
  });
  $("#long_break").click(function () {
    current = 'lngbrk';
    toggleButtons('long_break');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.lngbrk),
      autostart: true
    });
  });
  $("#timer_start").click(function () {
    $("#timer_default").startTimer();
  });
  $("#timer_pause").click(function () {
    if ($("#timer_default").data('countdown.state') == 'running') {
      $("#timer_default").pauseTimer();
    }
  });
  $("#timer_reset").click(function () {
    $("#timer_default").resetTimer({
      time_in_seconds: parseInt(paramet[current])
    });
  });
});
var isAlt = false;
$(document).keyup(function (e) {
  if (e.which == 18) isAlt = false;
}).keydown(function (e) {
  if (e.which == 18) isAlt = true;
  if (e.which == 80 && isAlt == true) {
    //ALT+P -- Pomodoro
    current = 'pom';
    toggleButtons('pomodoro');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.pom),
      autostart: true
    });
    return false;
  }
  if (e.which == 83 && isAlt == true) {
    //ALT+S -- Short Break
    current = 'shrtbrk';
    toggleButtons('short_break');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.shrtbrk),
      autostart: true
    });
    return false;
  }
  if (e.which == 76 && isAlt == true) {
    //ALT+L -- Long Break
    current = 'lngbrk';
    toggleButtons('long_break');
    $("#timer_default").createTimer({
      time_in_seconds: parseInt(paramet.lngbrk),
      autostart: true
    });
    return false;
  }
  if (e.which == 82 && isAlt == true) {
    //ALT+R -- Reset Timer
    $("#timer_default").resetTimer({
      time_in_seconds: parseInt(paramet[current])
    });
    return false;
    }
  if (e.which == 32) {
    //SPACE -- Start/Stop Timer
    if (timer_local) {$("#timer_default").pauseTimer(); timer_local=false;}
    else {$("#timer_default").startTimer(); timer_local=true;}
    return false;
  }
});

function toggleButtons(active) {
  $("#timer_selection button").removeClass('active');
  $("#" + active).addClass('active');
}

function updateTimers() {
  pom1 = localStorage.getItem("pomodoro") * 60;

  if (pom1 == 3600) {
    pom = 3599;
  } else {
    pom = pom1;
  }

  paramet = {
    pom: pom,
    shrtbrk: localStorage.getItem("shortbreak") * 60,
    lngbrk: localStorage.getItem("longbreak") * 60
  };

  $("#timer_default").resetTimer({
    time_in_seconds: parseInt(paramet[current])
  });
}

function loadSettings() {
  if (localStorage["pomflag"] != 1) {
    localStorage.setItem("pomodoro", 25);
    localStorage.setItem("shortbreak", 5);
    localStorage.setItem("longbreak", 10);
    localStorage.setItem("pomflag", 1);
    localStorage.setItem("alertoption","alarmwatch");
    localStorage.setItem("volumeoption",0.5);
  }

  $("#alertoption").val(localStorage.getItem("alertoption"));
  $("#volume").val(localStorage.getItem("volumeoption"));
  $("#time_pomodoro").val(localStorage.getItem("pomodoro"));
  $("#time_shortbreak").val(localStorage.getItem("shortbreak"));
  $("#time_longbreak").val(localStorage.getItem("longbreak"));
}
