function checkEvent(getElement) {
  this.blog = getElement;
  this.heading = this.blog.find("h3");
  this.targetDiv = "";
}

checkEvent.prototype.insertDiv = function() {
  var _this = this;
  this.heading
    .each(function() {
      _this.targetDiv = $("<div></div>").insertAfter($(this));
      $(this).data("targetDiv", _this.targetDiv);
    });
};

checkEvent.prototype.loadContent = function(currentHeading,event) {
  var anchor = currentHeading.find("a"),
      targetDiv = currentHeading.data("targetDiv"),
      href = anchor.attr("href"),
      url = href.split("#")[0],
      id = href.split("#")[1];
  event.preventDefault();
  targetDiv.load(url + " #" +id);
};

checkEvent.prototype.bindEvents = function() {
  var _this = this;
  this.insertDiv();
  this.heading.on("click", function(event) {
    _this.loadContent($(this),event);
  });
};

$(document).ready(function() {
  var blog = $("#blog");
  var checkEventObj = new checkEvent(blog);
  checkEventObj.bindEvents(); 
});