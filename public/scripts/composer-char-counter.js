$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    $(this)
      .siblings("div")
      .children("output")
      .text(140 - $(this).val().length);
    7;
    if (140 - $(this).val().length < 0) {
      $("output").addClass("counter-red");
    }
  });
});
