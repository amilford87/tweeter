//Counting the length of the value inside the text area

$(document).ready(function() {
    $("textarea").on('input', function(){
        let inputNum = this.value.length;
        let counter = $(this).siblings(".counter");
        counter[0].innerText = 140 - inputNum;
        if (counter[0].innerText < 0){
            $(counter).addClass("negative");
        } else {
            $(counter).removeClass("negative");
        }
    });
});
