$(document).ready(function () {
    var img=new Image();
    img.src="Images/Mench1.png";

    var img2 = new Image();
    img2.src = "Images/Bomb2.png";

    $("#menchIcon").mouseover(function () {
        $('#menchIcon').attr("src", img.src);
    });
    $("#menchIcon").mouseleave(function () {
        $('#menchIcon').attr("src", "Images/Mench0.png");
    });

    $("#MineIcon").mouseover(function () {
        $('#MineIcon').attr("src", img2.src);
    });
    $("#MineIcon").mouseleave(function () {
        $('#MineIcon').attr("src", "Images/Bomb1.png");
    });
});