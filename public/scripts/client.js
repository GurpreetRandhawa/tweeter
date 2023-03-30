$(document).ready(() => {
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
  const renderTweets = function (user_data) {
    $("#tweets-container").empty();
    user_data.map((user) => {
      $("#tweets-container").append(createTweetElement(user));
    });
  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $("#tweet-form").submit((event) => {
    event.preventDefault();
    $(".error-container").hide();
    if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
      $(".error-container").slideDown("slow");
      $(".error-container").addClass("error-container-flex");
      $(".error-container").children("p").text("Tweet is empty");
    } else if ($("#tweet-text").val().length > 140) {
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
          loadTweets();
        },
      });
    }
  });
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
});
