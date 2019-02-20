$(document).ready(function() {

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
    $('#tweet-feed').empty();
    tweets.forEach(function(element){
      var $tweet= createTweetElement(element);
      $('#tweet-feed').prepend($tweet);
    });
  }
    
  
  // Changing the submit button to an Ajax call to submit the tweet to the server
  var $tweetForm = $('#tweet-form');
  $tweetForm.submit(function(event) {
    event.preventDefault();
    var $tweet = $($tweetForm.children("textarea")[0]).val();
    if ($tweet === null || $tweet === "" || $tweet.length > 140){
      alert("invalid tweet");
    } else{
    $.post('/tweets', $tweetForm.serialize())
    .then(populateTweets);
    $('textarea').val("");
    let counter = $("textarea").siblings(".counter");
    counter[0].innerText = 140;
    }
  });
  
function populateTweets(){
  $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetFeed) {
      renderTweets(tweetFeed);
    });
  }

  populateTweets();

});