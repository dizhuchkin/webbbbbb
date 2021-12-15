let canvas = document.getElementById("canvas");
let posi = document.getElementById("posi");
let ctx = canvas.getContext("2d");
let ctx2 = posi.getContext("2d");
let sizeBox = 20;
let snakes = Object();
let socket = io();

//размеры поля с игроками
canvas.width = 25*sizeBox; 
canvas.height = 40*sizeBox;

//размер поля рейтинга
posi.width = 13*sizeBox;
posi.height = 35*sizeBox;

socket.emit('start', 1);

let otc = 1;
let otc2 = 0;
let cvetpol;
let soob;
let obs;

//места для игроков закончились
socket.on('otc',function(msg) 
{
    otc = 1;
    otc2 = 1;
    document.getElementById('posi').style.display = 'none';
    document.getElementById('asdasd').style.display = 'none';
    document.getElementById('netmest').style.display = 'block';
    document.getElementById('itogtable').style.display = 'none';

    let t = 11;
        Timer = setInterval(function(){
            t = t - 1;

            if (t === 0)
            {
                window.close();
            }
            else
            {
                let elem111 = document.getElementById('corzifqq');
 
                if (elem111)
                {
                    let child = document.getElementById('corzifqq');
                    document.querySelector('.ddd').removeChild(child);
                }

                let corzif= document.createElement('div');
                corzif.classList.add('corzif');
                corzif.id = 'corzifqq';


                corzif.innerHTML = `Выход через ${t} секунд.`

                document.querySelector('.ddd').appendChild(corzif);
            }
        },1000);
    //вы можете быть зрителем
});

//Рисуем>----------------------------------------------------------------------------------------------------
function draw_start_end()
{
    for (let i = 0; i <= 25; i++)
    {
        if (i % 2 === 0)
        {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(i*sizeBox,0,sizeBox,sizeBox);
        }
        else
        {
            ctx.fillStyle = "#000000";
            ctx.fillRect(i*sizeBox,0,sizeBox,sizeBox);
        }
    }
        
        ctx.fillStyle="#A0522D";
        ctx.fillRect(0 ,37*sizeBox,25*sizeBox,3*sizeBox);

    for (let i = 0; i <= 25; i++)
    {
        if (i % 2 === 0)
        {
            ctx.fillStyle = "#000000";
            ctx.fillRect(i*sizeBox,1*sizeBox,sizeBox,sizeBox);
        }
        else
        {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(i*sizeBox,1*sizeBox,sizeBox,sizeBox);
        }
    }

}

function draw_posi()
{
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0,0,posi.width,posi.height);

    let x = 2;
    let y = 1;

    for(let snake in snakes) 
    {
        let currenSnake = snakes[snake];
            ctx2.fillStyle = currenSnake.colorObect;
            ctx2.fillRect(x*sizeBox-20,  y*sizeBox-5, sizeBox,sizeBox);
            let xl = x + 3;
            let yl = y;
            let serd = snakes[snake].live;
            while(serd > 0)
            {
                let img6 = new Image();
                img6.src = 'https://sun9-11.userapi.com/impg/GBZ5Hcr8-yBRBiiMAoNp0S94kEsq-ath8sIgeA/jg9_dRdYhDI.jpg?size=2555x2275&quality=95&sign=961cad096e19d7399e0ecb6c99dbd043&type=album';
                ctx2.drawImage(img6,xl*sizeBox-20,  yl*sizeBox-5, sizeBox,sizeBox);
                xl = xl + 2;
                serd--;
            }
            
            if (currenSnake.position != 0)
            {
                //xl =  xl + 1;
                ctx2.font = "20px Georgia";
                ctx2.fillStyle = 'black';
                //console.log(String(currenSnake.position));
                ctx2.fillText(String(currenSnake.position),  xl*sizeBox-20, yl*sizeBox+10);
            }
            if (currenSnake.vibil !=0)
            {
                //xl =  xl + 1;
                ctx2.font = "20px Georgia";
                ctx2.fillStyle = 'black';
                //console.log(String(currenSnake.position));
                ctx2.fillText("В" , xl*sizeBox-20, yl*sizeBox+10);
            }
            
            y=y+2;
    }

    ctx2.fillStyle = "#281cfa";
    for (let i = 0; i<posi.width; i++)
    {
        ctx2.fillRect(i,11*sizeBox-5,sizeBox,sizeBox);
    }
    let img = new Image();
    img.src = 'https://sun9-82.userapi.com/impg/Y54vhU2UO5nzWR4V27SASMMzbwlsTzAwFk6kTA/05DWbG4O06s.jpg?size=128x128&quality=95&sign=a7d2ed8755c86d8c009c0db283fe03f8&type=album';
    ctx2.drawImage(img,x*sizeBox-20,13*sizeBox-5,sizeBox+30,sizeBox+30);
    ctx2.font="20px Georgia";
    ctx2.fillText("Вперёд",  (x+3)*sizeBox-20, 13*sizeBox+25);
    let img1 = new Image();
    img1.src = 'https://sun9-30.userapi.com/impg/8aXlxCYVELnWprYCod8vxKP8hj6flHDrgL0bEA/W9D6Z8VMWgQ.jpg?size=128x128&quality=95&sign=03c3402258047d5c1c7e44e6833503d4&type=album';
    ctx2.drawImage(img1,x*sizeBox-20,16*sizeBox-5,sizeBox+30,sizeBox+30);
    ctx2.fillText("Налево",  (x+3)*sizeBox-20, 16*sizeBox+25);
    let img2 = new Image();
    img2.src = 'https://sun9-33.userapi.com/impg/X8n-UcclLtsbQO5_Xob3n9s6PEBe-98Y3zWiKw/sU4BgIK9z-U.jpg?size=128x128&quality=95&sign=0dd5c94e69f9dc8f413b9be42416d81d&type=album';
    ctx2.drawImage(img2,x*sizeBox-20,19*sizeBox-5,sizeBox+30,sizeBox+30);
    ctx2.fillText("Направо",  (x+3)*sizeBox-20, 19*sizeBox+25);
    let img3 = new Image();
    img3.src = 'https://sun9-47.userapi.com/impg/XQL4MRhmTrLO1uWOL79sZU3GHRPXJU8Y1pbMug/pp8dp6peOxo.jpg?size=128x128&quality=95&sign=d089532afcd673797b7236de7becaa3f&type=album';
    ctx2.drawImage(img3,x*sizeBox-20,22*sizeBox-5,sizeBox+30,sizeBox+30);
    ctx2.fillText("Стоп",  (x+3)*sizeBox-20, 22*sizeBox+25);
    let img4 = new Image();
    img4.src = 'https://sun9-12.userapi.com/impg/Z4A1MqP0r3GjRkeiGAbygQ5SWDzwlJ5Pqn4CaA/fVOGSendOU4.jpg?size=128x128&quality=95&sign=4f2d2342d5dcf2a8c792d17a12c6f0c6&type=album';
    ctx2.drawImage(img4,x*sizeBox-20,25*sizeBox-5,sizeBox+30,sizeBox+30);
    ctx2.fillText("Выход",  (x+3)*sizeBox-20, 25*sizeBox+25);
    ctx2.fillStyle = cvetpol;

    ctx2.fillRect(x*sizeBox-15,28*sizeBox-5,sizeBox+15,sizeBox+15);
    ctx2.fillStyle = "#281cfa";
    ctx2.fillText("Это вы!",  (x+3)*sizeBox-20, 28*sizeBox+17);


    ctx2.fillStyle = "#281cfa";
    for (let i = 0; i<posi.width; i++)
    {
        ctx2.fillRect(i,30*sizeBox-5,sizeBox,sizeBox);
    }

    if (soob)
    {
    ctx2.fillStyle = "#281cfa";
    ctx2.fillText(soob,  x*sizeBox-20, 33*sizeBox-5);
    }
}

function draw() 
{
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    draw_start_end();
    let _dd = 1;
    for(let ss in obs) {
        let currenSnake = obs[ss];
        if (_dd < 23)
        {
            ctx.fillStyle = "#00cc00";//зеленый цвет
        }
        else
        {
            ctx.fillStyle = "#565656";
        }
        _dd++;
        ctx.fillRect(currenSnake.x,  currenSnake.y, currenSnake.xs,currenSnake.ys);
    }

    for(snake in snakes) {
        let currenSnake = snakes[snake];
            ctx.fillStyle = currenSnake.colorObect;
            ctx.fillRect(currenSnake.coorX*sizeBox,  currenSnake.coorY*sizeBox, sizeBox,sizeBox);
    }

    draw_posi();
}

setInterval(draw,25);
//>----------------------------------------------------------------------------------------------------------------------------

socket.on('snakes',function(msg) 
{
snakes = JSON.parse(msg);
for(let snake in snakes) {
    let currenSnake = snakes[snake];

    if (currenSnake.id === socket.id)
    {
        console.log(currenSnake.position);
        if (currenSnake.position != 0)
        {
            otc = 1;
        }
        cvetpol = currenSnake.colorObect;
    }
}
});

socket.on('soob',function(msg) 
{
    soob = msg;
});

socket.on('startgame',function(msg) 
{
    
    obs = JSON.parse(msg);
    otc = 0;
});



socket.on('stopgame',function(msg) 
{
    otc = 1;

    if (otc2 === 0)
    {
    document.getElementById('posi').style.display = 'block';
    document.getElementById('asdasd').style.display = 'none';
    document.getElementById('netmest').style.display = 'none';
    document.getElementById('itogtable').style.display = 'block';
    }

    //сортировать по местам

    //snakes.sort(byField('position'));

    let t = 11;
    Timer = setInterval(function(){
        t = t - 1;

        if (t === 0)
        {
            window.close();
        }
        else
        {
            let elem111 = document.getElementById('corzifqq');

            if (elem111)
            {
                let child = document.getElementById('corzifqq');
                document.querySelector('.ddd1').removeChild(child);
            }

            let corzif= document.createElement('div');
            corzif.classList.add('corzif');
            corzif.id = 'corzifqq';


            corzif.innerHTML = `Выход через ${t} секунд.`

            document.querySelector('.ddd1').appendChild(corzif);
        }
    },1000);
});


//управление кнопками
document.addEventListener('keydown', function(event) {
    if (otc === 0)
    {
        //Управление игроком
        if (event.code == 'KeyW') {
            socket.emit('keyDown', 'U');
        }
        if (event.code == 'KeyA') {
            socket.emit('keyDown', 'L');
        }
        if (event.code == 'KeyD') {
            socket.emit('keyDown', 'R');
        }
        if (event.code == 'KeyS') {
            socket.emit('keyDown', 'D');
        }

        /*if (event.code == 'KeyG') {
            socket.emit('keyDown', 'G');
        }*/
    }
    //Выход
    if  (event.code == 'KeyT') {
        window.close();
    }
}); 

