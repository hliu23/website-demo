function setPercentColor(percent) {
  percent = 100 - percent
  document.getElementById("img-colored").style["clip-path"] = `polygon(0 ${percent}%, 100% ${percent}%, 100% 100%, 0% 100%)`
}

setPercentColor(30)