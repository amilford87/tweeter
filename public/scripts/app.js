$(document).ready(function() {

    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];

    function createTweetElement(object){
        let tweetName = object.user.name;
        let avatar = object.user.avatars.regular;
        let handle = object.user.handle;
        let tweetText = object.content.text;
        let footerText = object.created_at;
        const newTweet = $('<article class="posted-tweet">').append(
            `<header class="posted-tweet-header">
            <img class="avatar" src="${avatar}">
            <h1 class="name">${tweetName}</h1>
            <p class="username">${handle}</p>
          </header>
          <p class="tweet-content">
            ${tweetText}
          </p>
          <footer class="tweet-footer">
            ${footerText}
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </footer>
        </article>`);     
        return newTweet;
    }
    
    
    function renderTweets(tweets) {
        tweets.forEach(function(element){
        var $tweet= createTweetElement(element);
        $('#tweet-feed').append($tweet);
        });
    }
    
    renderTweets(data);
});