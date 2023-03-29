const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];
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
          <p class="footer-left">${tweet_obj.created_at}</p>
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
  renderTweets(data);
});
