function collapseClick(x) {
  var collapseDivID = $(x).attr("href")
      collapseDivStatus = $(collapseDivID).attr("class")

  if (collapseDivStatus=="collapse"){
    document.getElementById($(x).attr("id")).className = "btn btn-light btn-sm"
  } else {
    document.getElementById($(x).attr("id")).className = "btn btn-outline-light btn-sm"
  }

}
