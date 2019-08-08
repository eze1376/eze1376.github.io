$(document).ready(function () {
    var img=new Image();
    img.src="Images/Soduku3.png";

    var img2 = new Image();
    img2.src = "Images/Bomb2.png";

    var img_profile = new Image();
    img_profile.src = "Images/profile.jpg";

    $("#SudokuIcon").mouseover(function () {
        $('#SudokuIcon').attr("src", img.src);
    });
    $("#SudokuIcon").mouseleave(function () {
        $('#SudokuIcon').attr("src", "Images/Soduku2.png");
    });

    $("#MineIcon").mouseover(function () {
        $('#MineIcon').attr("src", img2.src);
    });
    $("#MineIcon").mouseleave(function () {
        $('#MineIcon').attr("src", "Images/Bomb1.png");
    });

    $("#MineIcon").click(function(){
        $('#modalEnterText').modal('show');
    });

    $("#start_findTheMine").click(function(){
        var name = $("#welcomeModal").val();
        window.localStorage.setItem("Name", name);
        window.open("Htmls/FindTheMine.html", "_self");
    });
    $(".footerHTML").load("Htmls/footer.html");
    $("#myProfile").attr("src", img_profile.src);

});
