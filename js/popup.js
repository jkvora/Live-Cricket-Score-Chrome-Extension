var time_interval=60;
var timer;
var info;
var $links;
/*Updates ScoreCard by calling AJAX request*/
function UpdateScoreCards()
{
console.log("score Updated");
  $.ajax({
      url:"http://static.cricinfo.com/rss/livescores.xml",
      success:DisplayScoreCards,
      error:DisplayError
    })
}


/*Display Score ScoreCards*/
function DisplayScoreCards(data){
    info=data;
    var delay = setTimeout(GenerateCards, 1000);
}



/* Generate UI and append to ScoreCardsWrapper*/
function GenerateCards(){
  $("#loaderwrapper").addClass("hidden");
  $("#ScoreCardsWrapper").removeClass("hidden");
  $item = $(info).find("item");
  $description = $item.find("description").contents();
  $links = $item.find("link").contents();
  $("#ScoreCardsWrapper").empty();

  for(var matches=0;matches<$description.length;matches++)
  {
      console.log($description[matches]);
    	var $elm=`<div class="cards" id=${matches}>${$description[matches].textContent}
                    </div><br/>`;
      $("#ScoreCardsWrapper").append($elm);

      $("#"+matches).on("click",{id:matches},function(event){
            var iIndex=parseInt(event.currentTarget.getAttribute("id"));
            chrome.tabs.create({active: true, url: $links[iIndex].textContent});
      });

  }

}


/* Display Error*/
function DisplayError() {
  console.log("on error");
}


/*
On Document Ready UpdateScore
*/
$(document).ready(function() {
  UpdateScoreCards();
  timer=setInterval(UpdateScoreCards,time_interval*1000);
});


/**
 * Clear Interval on window unload
 */
$(window).unload(function() {
	clearInterval(timer);
});
