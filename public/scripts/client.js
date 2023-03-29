$(document).ready(() => {
  const createTweetElement = function (tweet_obj) {
    return $(`     <article>
        <header>
          <div class="header-right">
            <img src=${tweet_obj.user.avatars} alt="user-avatar" />
            <p>${tweet_obj.user.name}</p>
          </div>

          <p>${tweet_obj.user.handle}</p>
        </header>
        <h4>
          ${tweet_obj.content.text}
        </h4>
        <footer>
          <p class="footer-left">${timeago.format(tweet_obj.created_at)}</p>
          <div class="footer-right">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
  };
  const renderTweets = function (user_data) {
    user_data.map((user) => {
      $("#tweets-container").append(createTweetElement(user));
    });
  };

  $("#tweet-form").submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $("#tweet-form").serialize(),
    });
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
