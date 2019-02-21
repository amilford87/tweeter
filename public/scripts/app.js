$(document).ready(function() {
  
  //to make sure users cannot tweet scripts that will run
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //organizing our tweets
  function createTweetElement(object){
    //Calculating the time difference for the footer  
    const timeDifference = (Date.now() - object.created_at) / 1000;
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
    
    //how the tweet is presented
    const newTweet = $('<article class="posted-tweet">').append(
        `<header class="posted-tweet-header">
          <img class="avatar" src="${escape(object.user.avatars.regular)}">
          <h1 class="name">${escape(object.user.name)}</h1>
          <p class="username">${escape(object.user.handle)}</p>
        </header>
        <p class="tweet-content">
          ${escape(object.content.text)}
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
    
  //When an error occurs while attempting to submit
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
  
  //When user begins typing again the error goes away
  $("#compose-tweet-area").keypress(function (event){
    errorMsg.slideUp("medium");
  });
  
  //Populate the Tweet Feed with posts
  function populateTweets(){
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetFeed) {
        renderTweets(tweetFeed);
      });
  }

  populateTweets();

  //Toggling the Compose Tweet Area via the Compose Button
  $("#compose").click(function() {
    $("#compose-tweet").slideToggle( "slow", function() {
      $("#compose-tweet-area").focus(); 
    });
  });
});