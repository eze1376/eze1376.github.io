var mineNum = 10;
var rowNum = 9;
var colNum = 9;
var T = 300;
var time = T;
var Map;
var Mark;
var game_runing = true;
var img;
var clock;
var bombsoundcount = 0;
var bombExplosion;
var currentLevel = 1;
var currentTheme = 2;
var RestartEnable = true;


var all_images = new Array();

all_images[0] = new Image();
all_images[0].src = "../Images/MineGame/flagB.png";

all_images[1] = new Image();
all_images[1].src = "../Images/MineGame/Qmark.png";


function CreateMap() {
    Map = new Array(rowNum);
    for (var i = 0; i < rowNum; i++) {
        Map[i] = new Array(colNum);
    }
     Mark = new Array(rowNum);
    for (var i = 0; i < rowNum; i++) {
        Mark[i] = new Array(colNum);
    }
}

function SetArray() {
    // Set All The ARRAY 0
    for (var i = 0; i < rowNum; i++) {
        for (var j = 0; j < colNum; j++) {
            Map[i][j] = 0;
            Mark[i][j] = 0;
        }
    }

    // Set All The Mines
    var i = 0, x, y;
    while (i < mineNum) {
        y =Math.floor(  Math.random() * rowNum);
        x = Math.floor(Math.random() * colNum);
        if (Map[y][x] != -1) {
            Map[y][x] = -1;
            i++;
        }
    }

    // Set Number Of The Neighbor Mines

    for (var i = 0; i < rowNum; i++) {
        for (var j = 0; j < colNum; j++) {
            if (Map[i][j] == 0) {
                for (var k = i - 1; k <= i + 1; k++) {
                    for (var m = j - 1; m <= j + 1; m++) {
                        if (k >= 0 && k < rowNum && m >= 0 && m < colNum) {
                            if (Map[k][m] == -1) {
                                Map[i][j]++;
                            }
                        }
                    }
                }
            }
        }
    }

    for (var i = 0; i < rowNum; i++) {
        for (var j = 0; j < colNum; j++) {
            //document.getElementById("MainTable").rows[i].cells[j].innerText = Map[i][j];
        }
    }
}

function CheckWin() {
    var freeCount = 0;
    var flagTrue = true;
    var flagCount = 0;
    var x, y;
    for (var i = 0; i < rowNum; i++){
		for (var j = 0; j < colNum; j++){
			if (Map[i][j] != 100){
				freeCount++;
			}
			if (Mark[i][j] == 1) {
			    flagCount++;
			}
			if (Map[i][j] == -1 && flagTrue) {
			    if (Mark[i][j] != 1) {
			        flagTrue = false;
			        x = i;
			        y = j;
			    }
			}
        }
    }

    if ((freeCount == mineNum) || (flagTrue && flagCount == mineNum)) {
        game_runing = false;
        Congratulation();
    }
    else
        return false;
}

function Surf(A, r, c) {
    Mark[r][c] = 0;
    if (A[r][c] == 0){
        A[r][c] = 100;
        //document.getElementById("MainTable").rows[r].cells[c].classList.remove("btn-light");
		document.getElementById("MainTable").rows[r].cells[c].classList.add("backgroundButton");
		document.getElementById("MainTable").rows[r].cells[c].classList.remove("p-0");
		document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", "");

		for (var i = r - 1; i <= r + 1; i++){
			for (var j = c - 1; j <= c + 1; j++){
				if (i != -1 && j != -1 && i < rowNum && j < colNum && !(i==r && j==c)){
					Surf(A, i, j);
				}
			}
		}
	}
	else if(A[r][c]!=100){
        //show the number
        // document.getElementById("MainTable").rows[r].cells[c].innerText = A[r][c];
	    // document.getElementById("MainTable").rows[r].cells[c].setAttribute("style", "padding : 2px 15px;");        
        // document.getElementById("MainTable").rows[r].cells[c].classList.remove("btn-dark");
	    //document.getElementById("MainTable").rows[r].cells[c].innerText = Map[r][c];
	    //document.getElementById("MainTable").rows[r].cells[c].classList.remove("btn-light");
	    document.getElementById("MainTable").rows[r].cells[c].classList.add("number");
	    document.getElementById("MainTable").rows[r].cells[c].classList.add("p-0");
        document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", "../../Images/MineGame/Numbers/" + Map[r][c] + ".png");


		A[r][c] = 100;
	}
}

function GameOver() {
    time = 0;
    for (var i = 0; i < rowNum; i++){
		for (var j = 0; j < colNum; j++){
		    if (Map[i][j] == -1) {
		        document.getElementById("MainTable").rows[i].cells[j].classList.add("p-0");
		        document.getElementById("MainTable").rows[i].cells[j].classList.add("explosion");
		        if (Mark[i][j] == 0) {
		            document.getElementById("MainTable").rows[i].cells[j].childNodes[0].setAttribute("src", "../../Images/MineGame/freeBomb.png");
		        }
		        else if (Mark[i][j] == 1) {
		            document.getElementById("MainTable").rows[i].cells[j].childNodes[0].setAttribute("src", "../../Images/MineGame/flagG.png");
		        }
		    }
		    else {
		        if (Mark[i][j] == 1) {
		            document.getElementById("MainTable").rows[i].cells[j].childNodes[0].setAttribute("src", "../../Images/MineGame/flagR.png");
		        }
		    }
        }
    }
}

function IdentifyTheButton(r, c, event) {
    if (time == T) {
        clock = setInterval(timer, 1000);
        time--;
    }
    if (event.button == 0 && game_runing) {
        Mark[r][c] = 0;
        if (Map[r][c] == 0) {
            //go ahead
            Surf(Map, r, c);
        }
        else if (Map[r][c] == -1) {
            // Mine Explosion

            RestartEnable = false;
            document.getElementById("G_O").play();
            GameOver();
            RestartEnable = true;
            game_runing = false;
        }
        else if (Map[r][c] != 100) {
            // Show The Number Of Mines Around
            //document.getElementById("MainTable").rows[r].cells[c].classList.remove("btn-light");
            document.getElementById("MainTable").rows[r].cells[c].classList.add("number");
            document.getElementById("MainTable").rows[r].cells[c].classList.add("p-0");
            document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", "../../Images/MineGame/Numbers/" + Map[r][c] + ".png");
            Map[r][c] = 100;
        }

    }
    else if (event.button == 2 && game_runing && Map[r][c]!=100) {
        if (Mark[r][c] == 0) {
            // remove class of start of button  
            document.getElementById("MainTable").rows[r].cells[c].classList.add("p-0");
            document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", all_images[0].src);
            Mark[r][c] = 1;
        }
        else if (Mark[r][c] == 1) {
            // remove class of start of button  
            document.getElementById("MainTable").rows[r].cells[c].classList.add("p-0");
            document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", all_images[1].src);
            Mark[r][c] = 2;
        }
        else if (Mark[r][c] == 2) {
            // remove class of start of button  
            document.getElementById("MainTable").rows[r].cells[c].classList.remove("p-0");
            document.getElementById("MainTable").rows[r].cells[c].childNodes[0].setAttribute("src", "");
            Mark[r][c] = 0;
        }
    }
    CheckWin();
    ShowNumberOfRest();
}

function ShowNumberOfRest() {
    var count = 0;
    for (var i = 0; i < rowNum; i++) {
        for (var j = 0 ; j < colNum; j++) {
            if (Mark[i][j] == 1)
                count++;
        }
    }
    document.getElementById("NumberOfRest").innerHTML = mineNum - count;
}

function CreateTable() {
    var row;
    var table = $("#MainTable").get(0);
    
    for (var i = 0; i < rowNum; i++) {
        row = table.insertRow(i);
        for (var j = 0; j < colNum; j++) {
            var col = row.insertCell(j);
            col.classList.add("btn");
            if (currentTheme == 1) {
                col.classList.add("btn-light");
            }
            else if (currentTheme == 2) {
                col.classList.add("btn-dark");
            }
            else if (currentTheme == 3) {
                col.classList.add("btn-primary");
            }
            col.setAttribute("style", "margin: 2px;");
            var funcName = "IdentifyTheButton(" + i + "," + j + ", event)";
            col.setAttribute("onMouseDown", funcName);
            img = document.createElement("img");
            img.classList.add("float-left");
            img.classList.add("rounded");
            img.classList.add("imageOnBoard");
            col.appendChild(img);
            col.addEventListener('contextmenu', function (e) {
                (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
            });
        }

    }
    //var button = $("<button></button>").text("zz");
    //var button = document.createElement("button");
    //button.classList.add("btn");
    //button.classList.add("btn-light");

    //$("#MainTable td").appendChild(button);
    
    CreateMap();
    SetArray();
    ShowNumberOfRest();
    document.getElementById("Timer").innerHTML = n(parseInt(time / 60)) + " : " + n(time % 60);

}

function Restart() {
    if (RestartEnable) {
        $("#MainTable").css("display", "none");
        SetArray();
        game_runing = true;
        time = T;
        bombsoundcount = 0;
        for (var i = 0; i < rowNum; i++) {
            for (var j = 0; j < colNum; j++) {
                document.getElementById("MainTable").rows[i].cells[j].className = ' ';
                document.getElementById("MainTable").rows[i].cells[j].classList.add("btn");
                if (currentTheme == 1) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-light");
                }
                else if (currentTheme == 2) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-dark");
                }
                else if (currentTheme == 3) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-primary");
                }
                document.getElementById("MainTable").rows[i].cells[j].childNodes[0].setAttribute("src", "");

            }
        }
        clearInterval(clock);
        ShowNumberOfRest();
        document.getElementById("Timer").innerHTML = n(parseInt(time / 60)) + " : " + n(time % 60);
        $("#MainTable").fadeIn(1000);
    }
}

function timer() {
    document.getElementById("Timer").innerHTML = n(parseInt( time/60)) + " : "+ n(time%60);
    if (time != 0) {
        time--;
    }
    else {
        clearInterval(clock);
        bombExplosion();
    }
}

function SetLevel(n) {
    if (n != currentLevel) {
        Restart();
        if (n == 1) {
            mineNum = 10;
            rowNum = 9;
            colNum = 9;
            currentLevel = 1;
            document.getElementById("easy").style.color = "green";
            document.getElementById("medium").style.color = "";
            document.getElementById("hard").style.color = "";
        }
        else if (n == 2) {
            mineNum = 40;
            rowNum = 16;
            colNum = 16;
            currentLevel = 2;
            document.getElementById("medium").style.color = "orange";
            document.getElementById("easy").style.color = "";
            document.getElementById("hard").style.color = "";

        }
        else if (n == 3) {
            mineNum = 99;
            rowNum = 30;
            colNum = 16;
            currentLevel = 3;
            document.getElementById("hard").style.color = "red";
            document.getElementById("easy").style.color = "";
            document.getElementById("medium").style.color = "";

        }
        document.getElementById("MainTable").innerHTML = "";
        CreateTable();
        if (currentLevel != 3) {
            $("#MainTable").css("margin-top", ($(window).height() - $("#MainTable").height()) / 2 + "px");
            $("#MainTable").css("margin-bottom", ($(window).height() - $("#MainTable").height()) / 2 + "px");
        }
        else {
            $("#MainTable").css("margin-top", "10px");
            $("#MainTable").css("margin-bottom", "10px");
        }
    }
}

function ChangeTheme(n) {
    if (n != currentTheme) {
        if (n == 1) {
            currentTheme = 1;
            document.getElementById("lightTheme").style.color = "white";
            document.getElementById("darkTheme").style.color = "";
            document.getElementById("BlueTheme").style.color = "";
            for (var i = 0; i < rowNum; i++) {
                for (var j = 0 ; j < colNum; j++) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-light");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-dark");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-primary");
                }
            }
        }
        else if (n == 2) {
            currentTheme = 2;
            document.getElementById("lightTheme").style.color = "";
            document.getElementById("darkTheme").style.color = "black";
            document.getElementById("BlueTheme").style.color = "";
            for (var i = 0; i < rowNum; i++) {
                for (var j = 0 ; j < colNum; j++) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-dark");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-light");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-primary");
                }
            }
        }
        else if (n == 3) {
            currentTheme = 3;
            document.getElementById("lightTheme").style.color = "";
            document.getElementById("darkTheme").style.color = "";
            document.getElementById("BlueTheme").style.color = "royalblue";
            for (var i = 0; i < rowNum; i++) {
                for (var j = 0 ; j < colNum; j++) {
                    document.getElementById("MainTable").rows[i].cells[j].classList.add("btn-primary");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-light");
                    document.getElementById("MainTable").rows[i].cells[j].classList.remove("btn-dark");
                }
            }
        }
    }
}

function n(n) {
    return n > 9 ? "" + n : "0" + n;
}


function Congratulation() {
    clearInterval(clock);
    document.getElementById("win").play();
    $('#myModal').modal('show');
    $("#modalText").text("You Win In "+(parseInt((T-time)/60))+"m "+((T-time)%60)+"s" );
}

$(document).ready(function () {
    $("#MainTable").ready(function () {
        document.getElementById("easy").style.color = "green";
        document.getElementById("darkTheme").style.color = "black";
        $("#MainTable").css("display", "none");
        CreateTable();
        $("#MainTable").fadeIn(1000);
        $("#MainTable").css("margin-top", ($(window).height() - $("#MainTable").height()) / 2 + "px");
        $("#MainTable").css("margin-bottom", ($(window).height() - $("#MainTable").height()) / 2 + "px");
    });


});

$(window).resize(function () {
    if (currentLevel !== 3) {
        $("#MainTable").css("margin-top", ($(window).height() - $("#MainTable").height()) / 2 + "px");
        $("#MainTable").css("margin-bottom", ($(window).height() - $("#MainTable").height()) / 2 + "px");
    }
});







