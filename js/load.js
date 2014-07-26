function LoadExternalContent(getElement) {
  this.heading = getElement;
  this.targetDiv = "";
}

LoadExternalContent.prototype.insertDiv = function() {
  var _this = this;
  this.heading
    .each(function() {
      _this.targetDiv = $("<div></div>").insertAfter($(this));
      $(this).data("targetDiv", _this.targetDiv);
    });
};

LoadExternalContent.prototype.getContent = function(currentHeading,event) {
  var anchor = currentHeading.find("a"),
      targetDiv = currentHeading.data("targetDiv"),
      href = anchor.attr("href"),
      url = href.split("#")[0],
      id = href.split("#")[1];
  event.preventDefault();
  targetDiv.load(url + " #" +id);
};

LoadExternalContent.prototype.bindEvents = function() {
  var _this = this;
  this.insertDiv();
  this.heading.on("click", function(event) {
    _this.getContent($(this),event);
  });
};

$(document).ready(function() {
  var heading = $("#blog").find("h3");
  var loadContentObj = new LoadExternalContent(heading);
  loadContentObj.bindEvents(); 
});