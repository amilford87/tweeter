$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }



  
  function createTweetElement(object){
    let tweetName = object.user.name;
    let avatar = object.user.avatars.regular;
    let handle = object.user.handle;
    let tweetText = object.content.text;
    let footerText = object.created_at;
    
    const timeDifference = (Date.now() - footerText) / 1000;
    let timePosted;

    if (timeDifference < 1){
      timePosted = "Posted: Now.";
    }
    else if (timeDifference > 1 && timeDifference < 60){
      timePosted = "Posted: " + Math.floor(timeDifference) + " seconds ago.";
    }
    else if (timeDifference >= 60 && timeDifference < 3600){
      timePosted = "Posted: " + Math.floor(timeDifference / 60) + " minutes ago.";
    }
    else if (timeDifference >= 3600 && timeDifference < 86400){
      timePosted = "Posted: " + Math.floor(timeDifference / 3600) + " hours ago.";
    }
    else if (timeDifference <= 86400 && (timeDifference / 86400) < 7){
      timePosted = "Posted: " + Math.floor(timeDifference / 86400) + " days ago.";
    }
    else if ((timeDifference / 86400) >= 7 && (timeDifference / 86400) < 365){
      timePosted = "Posted: " + Math.floor((timeDifference / 86400) / 7) + " months ago.";
    }
    else{
      timePosted = "Posted: " + Math.floor((timeDifference / 86400) / 365) + " years ago.";
    }
    
    
    
    const newTweet = $('<article class="posted-tweet">').append(
        `<header class="posted-tweet-header">
          <img class="avatar" src="${escape(avatar)}">
          <h1 class="name">${escape(tweetName)}</h1>
          <p class="username">${escape(handle)}</p>
        </header>
        <p class="tweet-content">
          ${escape(tweetText)}
        </p>
        <footer class="tweet-footer">
          ${timePosted}
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
    
  const errorMsg = $('#tweet-error');

  // Changing the submit button to an Ajax call to submit the tweet to the server
  var $tweetForm = $('#tweet-form');
  $tweetForm.submit(function(event) {
    event.preventDefault();
    var $tweet = $($tweetForm.children("#compose-tweet-area")[0]).val();
    if ($tweet === null || $tweet === "" ){
      errorMsg.slideDown();
      errorMsg.css('#tweet-error');
      errorMsg.html('<i class="fas fa-exclamation"></i> Unable to post empty tweet');
    }
    else if ($tweet.length > 140){
      errorMsg.slideDown();
      errorMsg.css('#tweet-error');
      errorMsg.html('<i class="fas fa-exclamation"></i> Tweet cannot be longer than 140 characters');
    }
    else{
      errorMsg.slideUp("medium");
      $.post('/tweets', $tweetForm.serialize())
    .then(populateTweets);
    $('#compose-tweet-area').val("");
    let counter = $("#compose-tweet-area").siblings(".counter");
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

  $("#compose").click(function() {
    $("#compose-tweet").slideToggle( "slow", function() {
      $("#compose-tweet-area").focus(); 
    });
  });

  $("#compose-tweet-area").keypress(function (event){
    errorMsg.slideUp("medium");
  });

});