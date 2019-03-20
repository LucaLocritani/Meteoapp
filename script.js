
function openNav() {
  document.getElementById("mySidenav").style.width = "45%";
  document.getElementById("main").style.marginLeft = "-45%";
  document.getElementById("main").style.filter = "blur(5px)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.getElementById("main").style.filter = "blur(0)";
}
