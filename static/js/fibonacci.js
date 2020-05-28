$(document).ready(function(e){
    console.log("fib.js loaded");
    let sequence = {};
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const textArea = document.getElementById('numDisplay');


    setTimeout(function(){
        if(!$.trim($('#numDisplay').val())) {
            console.log("empty");
        // textarea is empty or contains only white-space
        }else{
            console.log("scrolling");
            textArea.scrollIntoView();
        }
        }, 100

    );





    $('#btnCanva').click(function(){
        $.ajax({
            url: "/fibonacci_calc?n=" + $('#nCan').val(),
            success: function(data){
                console.log(data);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                sequence = data;
                prep_draw(Object.values(data), 0, 0);
            }
        });
    });

    function prep_draw(n, offset, i){
        console.log(n, offset);
        draw_sequence(n[0], offset, i);
        let newOff = offset + n[0] * 4;

        n.shift();
        if (n.length != 0 && i <= 13){
            setTimeout(function(){
                prep_draw(n, newOff, i + 1);
            }, 500);
        }else{
            draw_line();
        }
    }


    function draw_sequence(val, offset, i){
        console.log("drawing");
        let size = val  * 4;

        ctx.beginPath();
        ctx.rect(0 + offset, 1000 - size, size, size);
        ctx.lineWidth = "6";
        ctx.strokeStyle = getRandomColor();
        ctx.stroke();
        ctx.font="16px Georgia";
        if(size > 53){
            ctx.fillText("F"+ i + " = " + sequence[i], offset + 7, 990);
        }

    }

    function draw_line(){
        ctx.beginPath();
        ctx.moveTo(0, 1000);
        ctx.lineTo(1609, 0);
        ctx.lineWidth = "2";
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
});