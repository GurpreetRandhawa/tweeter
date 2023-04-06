$(document).ready(() => {
  /**
   *
   * @param {*} object containing tweet
   * @returns html
   */
  const createTweetElement = function (tweet_obj) {
    return `     <article>
        <header>
          <div class="header-right">
            <img src=${tweet_obj.user.avatars} alt="user-avatar" />
            <p>${tweet_obj.user.name}</p>
          </div>
          <p>${tweet_obj.user.handle}</p>
        </header>
        <p>
          ${escape(tweet_obj.content.text)}
        </p>
        <footer>
          <p class="footer-left">${timeago.format(tweet_obj.created_at)}</p>
          <div class="footer-right">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
  };
  /**
   *
   * @param {*} Array of tweets obejcts
   * Calls createTweetElement for each array index and prepends it to tweets-container element
   */
  const renderTweets = function (user_data) {
    $("#tweets-container").empty();
    user_data.map((user) => {
      $("#tweets-container").prepend(createTweetElement(user));
    });
  };
  //Function to prevent cross client scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //Event listener for form submission
  $("#tweet-form").submit((event) => {
    event.preventDefault();
    $(".error-container").removeClass("error-container-flex");
    $(".error-container").hide();
    //Check if tweet is null or empty
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(".error-container").slideDown("slow");
      $(".error-container").addClass("error-container-flex");
      $(".error-container").children("p").text("Tweet is empty");
    }
    //Check if tweet length is greater than 140
    else if ($("#tweet-text").val().length > 140) {
      $(".error-container").slideDown("slow");
      $(".error-container").addClass("error-container-flex");
      $(".error-container").children("p").text("Tweet length is more than 140");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#tweet-form").serialize(),
        success: () => {
          $("#tweet-form")[0].reset();
          $(".counter").text(140);
          loadTweets();
        },
      });
    }
  });
  /**
   * Function to get data from the server
   */
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function (response) {
        renderTweets(response);
      },
    });
  };
  loadTweets();
  //Event listener for clicking "Write a new tweet" nav item
  $(".right-text").click(() => {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow");
    } else {
      $("#tweet-form")[0].reset();
      $(".counter").text(140);
      $(".error-container").removeClass("error-container-flex");
      $(".error-container").hide();
      $(".new-tweet").slideUp();
    }
  });
  //Event listener for scrolling the winow
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#button-scroll").addClass("button-scroll-flex");
      $("#button-scroll").fadeIn();
    } else {
      $("#button-scroll").removeClass("button-scroll-flex");
      $("#button-scroll").fadeOut();
    }
  });
  $("#button-scroll").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    $(".new-tweet").slideDown("slow");
    return false;
  });
});
