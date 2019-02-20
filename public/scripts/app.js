$(document).ready(function() {
    const tweetData = {
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
    };

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
    
    var $tweet = createTweetElement(tweetData);

    function renderTweets(tweets) {
        tweets.forEach($tweet);
        
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
    }
    
    $('#tweet-feed').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      renderTweets(data);
});