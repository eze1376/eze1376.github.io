$(document).ready(function () {
    $('#menchIcon').attr("src", "Images/Mench1.png");
    $('#menchIcon').attr("src", "Images/Mench0.png");


    $('#MineIcon').attr("src", "Images/Bomb2.png");
    $('#MineIcon').attr("src", "Images/Bomb1.png");

    $("#menchIcon").mouseover(function () {
        $('#menchIcon').attr("src", "Images/Mench1.png");
    });
    $("#menchIcon").mouseleave(function () {
        $('#menchIcon').attr("src", "Images/Mench0.png");
    });

    $("#MineIcon").mouseover(function () {
        $('#MineIcon').attr("src", "Images/Bomb2.png");
    });
    $("#MineIcon").mouseleave(function () {
        $('#MineIcon').attr("src", "Images/Bomb1.png");
    });
});