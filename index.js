let express = require('express');
const { Socket } = require('socket.io');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

app.get('/script.js',function(request, respons){
    respons.sendFile(__dirname + '/script.js');
});

app.get('/socket.io.js',function(req,respons){
    respons.sendFile(__dirname + '/socket.io/socket.io.js');
});

let sizeBox = 20;

let obstacles1 = [
      {x:2*sizeBox ,y:33*sizeBox ,xs:2 *sizeBox,ys:2*sizeBox  },
      {x:11*sizeBox ,y:31*sizeBox ,xs:1*sizeBox,ys:4 *sizeBox }, 
      {x:5 *sizeBox,y:30 *sizeBox,xs:2*sizeBox ,ys:1*sizeBox },
      {x:17*sizeBox ,y:30*sizeBox ,xs:3 *sizeBox,ys:2*sizeBox  } ,
      {x:21*sizeBox ,y:27*sizeBox ,xs:4*sizeBox ,ys:1 *sizeBox} ,
      {x:8 *sizeBox,y:25 *sizeBox,xs:1*sizeBox, ys:2*sizeBox  } ,
      {x:12*sizeBox ,y:23*sizeBox ,xs:1*sizeBox,ys:1*sizeBox } ,
      {x:2 *sizeBox,y:21 *sizeBox,xs:4*sizeBox ,ys:1*sizeBox } ,
      {x:17*sizeBox ,y:21*sizeBox ,xs:3 *sizeBox,ys:1 *sizeBox} ,
      {x:17*sizeBox ,y:20*sizeBox ,xs:1*sizeBox,ys:1*sizeBox } ,
      {x:19*sizeBox ,y:20*sizeBox ,xs:1*sizeBox,ys:1*sizeBox } ,
      {x:17*sizeBox ,y:19*sizeBox ,xs:3*sizeBox ,ys:1*sizeBox } ,
      {x:9*sizeBox ,y:17*sizeBox ,xs:4*sizeBox ,ys:2*sizeBox  } ,
      {x:24*sizeBox ,y:16*sizeBox ,xs:1*sizeBox,ys:2*sizeBox  } ,
      {x:0*sizeBox,y:14*sizeBox ,xs:1*sizeBox,ys:4*sizeBox  } ,
      {x:7 *sizeBox,y:13*sizeBox ,xs:1*sizeBox,ys:1*sizeBox } ,
      {x:14*sizeBox ,y:12*sizeBox ,xs:2*sizeBox ,ys:2 *sizeBox } ,
      {x:4*sizeBox ,y:9*sizeBox ,xs:1*sizeBox,ys:3*sizeBox  } ,
      {x:18*sizeBox ,y:11*sizeBox ,xs:4*sizeBox ,ys:1*sizeBox } ,
      {x:12*sizeBox ,y:7*sizeBox ,xs:7*sizeBox ,ys:2*sizeBox  } ,
      {x:6 *sizeBox,y:5*sizeBox ,xs:3*sizeBox ,ys:1*sizeBox } ,
      {x:18*sizeBox ,y:2*sizeBox ,xs:1*sizeBox,ys:3*sizeBox  } ,

      {x:2 *sizeBox,y:33*sizeBox ,xs:1,ys:2*sizeBox  } ,
      {x:4 *sizeBox-1,y:33 *sizeBox,xs:1,ys:2*sizeBox  } ,
      {x:2*sizeBox ,y:33*sizeBox ,xs:2*sizeBox ,ys:1 } ,
      {x:2 *sizeBox,y:35 *sizeBox-1,xs:2*sizeBox ,ys:1 } ,

      {x:5 *sizeBox,y:30 *sizeBox,xs:2 *sizeBox,ys:1 } ,//верхняя грань
      {x:5 *sizeBox,y:30 *sizeBox,xs:1,ys:1*sizeBox } ,//левая грань
      {x:5 *sizeBox,y:31 *sizeBox-1,xs:2 *sizeBox,ys:1 } ,//нижняя грань
      {x:7 *sizeBox-1,y:30 *sizeBox,xs:1,ys:1 *sizeBox} ,//правая грань

      {x:11 *sizeBox,y:31*sizeBox ,xs:1*sizeBox ,ys:1 } ,//верхняя грань
      {x:11 *sizeBox,y:31*sizeBox ,xs:1,ys:4 *sizeBox } ,//левая грань
      {x:11 *sizeBox,y:35  *sizeBox-1,xs:1*sizeBox ,ys:1} ,//нижняя грань
      {x:12  *sizeBox-1,y:31*sizeBox ,xs:1,ys:4 *sizeBox } ,//правая грань

      {x:17 *sizeBox,y:30*sizeBox ,xs:3*sizeBox, ys:1} ,//верхняя грань
      {x:17*sizeBox ,y:30*sizeBox ,xs:1,ys:2 *sizeBox } ,//левая грань
      {x:17*sizeBox ,y:32 *sizeBox-1,xs:3 *sizeBox,ys:1} ,//нижняя грань
      {x:20 *sizeBox-1,y:30 *sizeBox,xs:1,ys:2*sizeBox  } ,//правая грань

      {x:21 *sizeBox,y:27 *sizeBox,xs:4 *sizeBox,ys:1} ,//верхняя грань
      {x:21*sizeBox ,y:27*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:21 *sizeBox,y:28 *sizeBox-1,xs:4*sizeBox ,ys:1} ,//нижняя грань

      {x:8*sizeBox ,y:25*sizeBox ,xs:1*sizeBox ,ys:1 } ,//верхняя грань
      {x:8*sizeBox ,y:25*sizeBox ,xs:1,ys:2 *sizeBox } ,//левая грань
      {x:8 *sizeBox,y:27  *sizeBox-1,xs:1*sizeBox,ys:1} ,//нижняя грань
      {x:9  *sizeBox-1,y:25 *sizeBox,xs:1,ys:2*sizeBox  } ,//правая грань

      {x:12*sizeBox ,y:23*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:12*sizeBox ,y:23*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:12*sizeBox ,y:24 *sizeBox-1,xs:1*sizeBox,ys:1 } ,//нижняя грань
      {x:13 *sizeBox-1,y:23*sizeBox ,xs:1,ys:1 *sizeBox} ,//правая грань

      {x:2 *sizeBox,y:21 *sizeBox,xs:4 *sizeBox,ys:1 } ,//верхняя грань
      {x:2 *sizeBox,y:21 *sizeBox,xs:1,ys:1 *sizeBox} ,//левая грань
      {x:2 *sizeBox,y:22  *sizeBox-1,xs:4 *sizeBox,ys:1 } ,//нижняя грань
      {x:6  *sizeBox-1,y:21 *sizeBox,xs:1,ys:1*sizeBox } ,//правая грань

      {x:0*sizeBox,y:14*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:0*sizeBox,y:18  *sizeBox-1,xs:1*sizeBox,ys:1 } ,//нижняя грань
      {x:sizeBox-1,y:14*sizeBox ,xs:1,ys:4*sizeBox  } ,//правая грань

      {x:9 *sizeBox,y:17*sizeBox ,xs:4 *sizeBox,ys:1 } ,//верхняя грань
      {x:9 *sizeBox,y:17 *sizeBox,xs:1,ys:2*sizeBox  } ,//левая грань
      {x:9*sizeBox ,y:19 *sizeBox-1,xs:4 *sizeBox,ys:1 } ,//нижняя грань
      {x:13*sizeBox-1,y:17*sizeBox ,xs:1,ys:2*sizeBox  } ,//правая грань

      {x:24*sizeBox ,y:16*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:24 *sizeBox,y:16*sizeBox ,xs:1,ys:2 *sizeBox } ,//левая грань
      {x:24*sizeBox ,y:18 *sizeBox -1,xs:1*sizeBox,ys:1 } ,//нижняя грань

      {x:7 *sizeBox,y:13*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:7*sizeBox ,y:13*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:7*sizeBox ,y:14 *sizeBox-1,xs:1*sizeBox,ys:1 } ,//нижняя грань
      {x:8  *sizeBox-1,y:13*sizeBox ,xs:1,ys:1*sizeBox} ,//правая грань

      {x:14 *sizeBox,y:12 *sizeBox,xs:2 *sizeBox,ys:1 } ,//верхняя грань
      {x:14*sizeBox ,y:12*sizeBox ,xs:1,ys:2*sizeBox  } ,//левая грань
      {x:14*sizeBox ,y:14  *sizeBox-1,xs:2*sizeBox ,ys:1} ,//нижняя грань
      {x:16  *sizeBox-1,y:12 *sizeBox,xs:1,ys:2*sizeBox  } ,//правая грань

      {x:18*sizeBox ,y:11*sizeBox ,xs:4 *sizeBox,ys:1 } ,//верхняя грань
      {x:18 *sizeBox,y:11*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:18 *sizeBox,y:12 *sizeBox-1,xs:4*sizeBox ,ys:1} ,//нижняя грань
      {x:22*sizeBox-1,y:11*sizeBox ,xs:1,ys:1*sizeBox } ,//правая грань

      {x:4*sizeBox ,y:9*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:4 *sizeBox,y:9*sizeBox ,xs:1,ys:3 *sizeBox } ,//левая грань
      {x:4 *sizeBox,y:12  *sizeBox-1,xs:1*sizeBox,ys:1} ,//нижняя грань
      {x:5  *sizeBox-1,y:9*sizeBox ,xs:1,ys:3 *sizeBox } ,//правая грань

      {x:12*sizeBox ,y:7*sizeBox ,xs:7*sizeBox ,ys:1 } ,//верхняя грань
      {x:12*sizeBox ,y:7 *sizeBox,xs:1,ys:2*sizeBox  } ,//левая грань
      {x:12*sizeBox ,y:9 *sizeBox-1,xs:7 *sizeBox,ys:1} ,//нижняя грань
      {x:19  *sizeBox-1,y:7*sizeBox ,xs:1,ys:2*sizeBox  } ,//правая грань

      {x:6 *sizeBox,y:5*sizeBox ,xs:3*sizeBox ,ys:1 } ,//верхняя грань
      {x:6*sizeBox ,y:5*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:6*sizeBox ,y:6 *sizeBox-1,xs:3 *sizeBox,ys:1} ,//нижняя грань
      {x:9  *sizeBox-1,y:5*sizeBox ,xs:1,ys:1*sizeBox } ,//правая грань

      {x:18*sizeBox ,y:2*sizeBox ,xs:1*sizeBox,ys:1} ,//верхняя грань
      {x:18 *sizeBox,y:2 *sizeBox,xs:1,ys:3*sizeBox  } ,//левая грань
      {x:18*sizeBox ,y:5 *sizeBox-1,xs:1*sizeBox,ys:1 } ,//нижняя грань
      {x:19  *sizeBox-1,y:2*sizeBox ,xs:1,ys:3*sizeBox  } ,//правая грань

      {x:17*sizeBox ,y:19*sizeBox ,xs:3*sizeBox,ys:1 } ,//верхняя грань
      {x:17 *sizeBox,y:19*sizeBox ,xs:1,ys:3*sizeBox  } ,//левая грань
      {x:17*sizeBox ,y:22 *sizeBox-1,xs:3 *sizeBox,ys:1} ,//нижняя грань
      {x:20 *sizeBox-1,y:19*sizeBox ,xs:1,ys:3*sizeBox  } ,//правая грань

      {x:18*sizeBox ,y:20*sizeBox ,xs:1*sizeBox,ys:1 } ,//верхняя грань
      {x:18*sizeBox ,y:20*sizeBox ,xs:1,ys:1*sizeBox } ,//левая грань
      {x:18*sizeBox ,y:21  *sizeBox-1,xs:1*sizeBox,ys:1 } ,//нижняя грань
      {x:19 *sizeBox-1,y:20*sizeBox ,xs:1,ys:1*sizeBox}//правая грань
]


let Players = [{
               id: '1',
               cvet: '#000080',
               live: 3,
               isp: 0,
               coorX: 2,
               coorY: 38,
               move: 'N'},
               {
               id: '1',
               cvet: '#FFD700',
               live: 3,
               isp: 0,
               coorX: 7,
               coorY: 38,
               move: 'N'},
               {
               id: '1',
               cvet: '#FF00FF',
               live: 3,
               isp: 0,
               coorX: 12,
               coorY: 38,
               move: 'N'},
               {
               id: '1',
               cvet: '#00FF00',
               live: 3,
               isp: 0,
               coorX: 17,
               coorY: 38,
               move: 'N'},
               {
               id: '1',
               cvet: '#DC143C',
               live: 3,
               isp: 0,
               coorX: 22,
               coorY: 38,
               move: 'N'}]
               
let Player = Object();

let connections = [];

let Timer = 0;

let pos11 = 0;
let col11 = 0;
let fin11 = 0;
let game = 0;
let cc;

io.sockets.on('connection', function(socket){

    console.log("УСПЕШНОЕ ПОДСОЕДИНЕНИЕ");


    socket.on('start',function() {

        let prov = 0;

        console.log(game);

        if(game === 0)
        {

        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].isp === 0)
            {
                Player[socket.id] = {id: socket.id, vibil:0, colorObect: Players[i].cvet, live:Players[i].live, position:0, move: Players[i].move, coorX:Players[i].coorX,  coorY:Players[i].coorY, isp:Players[i].isp};
                Players[i].isp = 1;
                Players[i].id = socket.id;
                prov = 1;
                break;
            }
        }

        

        //отправляем сообщение об ожидании
        let col = 0;

        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].isp === 1)
            {
                col++;
            }
        }

        if(col === 1)
        {
            //ждём как минимум одного игрока
            stopTimer();
            startdraw()
            io.sockets.emit("soob",'Ждём ещё игрока(ов)');
        }

        if(col > 1)
        {
            //ждём как минимум одного игрока
            //io.sockets.emit("soob",'Через минуту начнём');
            stopTimer();
            startTimer();
        }

        }

        if(prov === 0)
        {
            //отправляем что мест нет//
            socket.emit("otc",'.');
        }

    });

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log("ОТКЛЮЧЕНИЕ");
        //очитска игроков
        delete Player[socket.id];
        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].id === socket.id)
            {
                Players[i].isp = 0;
                break;
            }
        }

        let col = 0;

        if (game === 0)
        {

        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].isp === 1)
            {
                col++;
            }
        }

        }
        else
        {
            fin11++;
        }

        if(col === 1)
        {
            //ждём как минимум одного игрока
            stopTimer();
            io.sockets.emit("soob",'Ждём ещё игрока(ов)');

        }


        if(col > 1)
        {
            //запускаем таймер
            //io.sockets.emit("soob",'Через минуту начнём');
            stopTimer();
            startTimer();
        }

        let col2 = 0;

        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].isp === 1)
            {
                col2++;
            }
        }

        if (col2 === 0)
        {
            stopgame();
            stopdraw();
        }
    })

    socket.on('keyDown', function(data){
        Player[socket.id].move = data;
    });

});

    function startTimer()
    {
        let t = 5;
        Timer = setInterval(function(){
            if (t > 3)
            {
                io.sockets.emit("soob",String(t) + " секунд до старта");
            }
            else if (t === 2)
            {
                io.sockets.emit("soob","На старт!");
            }
            else if (t === 1)
            {
                io.sockets.emit("soob","Внимание!");
            }
            else if (t === 0)
            {
                io.sockets.emit("soob","Марш");
                //запуск игры

                stopTimer();
                startgame();
            }
            t = t - 1;
        }, 1000);
    }

    function stopTimer()
    {
        if (Timer)
        {
            clearInterval(Timer);
        }
    }

    function startgame()
    {
        
        game = 1;

        io.sockets.emit('startgame',JSON.stringify(obstacles1)); 

        let col = 0;

        for (let i = 0; i < Players.length; i++)
        {
            if (Players[i].isp === 1)
            {
                col++;
            }
        }

        col11 = col;

        for(let snake in Player) 
        {
            let currentSnake = Player[snake];
            currentSnake.move ='U';
        }
    }

    function stopgame()
    {
        Players = [{
            id: '1',
            cvet: '#000080',
            live: 3,
            isp: 0,
            coorX: 2,
            coorY: 38,
            move: 'N'},
            {
            id: '1',
            cvet: '#FFD700',
            live: 3,
            isp: 0,
            coorX: 7,
            coorY: 38,
            move: 'N'},
            {
            id: '1',
            cvet: '#FF00FF',
            live: 3,
            isp: 0,
            coorX: 12,
            coorY: 38,
            move: 'N'},
            {
            id: '1',
            cvet: '#00FF00',
            live: 3,
            isp: 0,
            coorX: 17,
            coorY: 38,
            move: 'N'},
            {
            id: '1',
            cvet: '#DC143C',
            live: 3,
            isp: 0,
            coorX: 22,
            coorY: 38,
            move: 'N'}]

            Timer = 0;

            pos11 = 0;
            col11 = 0;
            fin11 = 0;
            game = 0;

            console.log('game после заверш программы');
            console.log(game);

        io.sockets.emit('stopgame',JSON.stringify(Player)); 
    }

    function step() 
    {

        for(let snake in Player) 
        {

        let currentSnake = Player[snake];

        let _dd = 0;

        

        for(let ss in obstacles1) 
        {

            let currasd = obstacles1[ss];
            if (_dd < 23)
            {
                for (let i = 0; i < currasd.xs/sizeBox; i++)
                {
                    for (let i1 = 0; i1 < currasd.ys/sizeBox; i1++)
                    {
                        if ((currentSnake.coorX*sizeBox === currasd.x+i*sizeBox)&&(currentSnake.coorY*sizeBox === currasd.y+i1*sizeBox))
                        {
                            currentSnake.live--;

                            if (currentSnake.live > 0)
                            {
                            for (let i = 0; i < Players.length; i++)
                            {
                                if (Players[i].id === currentSnake.id)
                                {
                                    currentSnake.coorX= Players[i].coorX;
                                    currentSnake.coorY= Players[i].coorY;
                                    break;
                                }
                            }
                            }
                            else
                            {
                                //игрок выбыл
                                fin11++;
                                currentSnake.vibil = 1;

                                for (let i = 0; i < Players.length; i++)
                                {
                                    if (Players[i].id === currentSnake.id)
                                    {
                                        currentSnake.move= 'G';
                                        currentSnake.coorX= Players[i].coorX;
                                        currentSnake.coorY= Players[i].coorY;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } 
                _dd++;
            }
        }

    
        if(currentSnake.vibil === 0)
        {
        if (currentSnake.move == 'R') {
            if(currentSnake.coorX < 24)
            {
                currentSnake.coorX++;
            }
        }
        if (currentSnake.move == 'L') {
            if(currentSnake.coorX > 0)
            {
                currentSnake.coorX--;
            }
        }
        if (currentSnake.move == 'U') {
            if(currentSnake.coorY > 0)
            {
                currentSnake.coorY--;
            }
            else
            {
                for (let i = 0; i < Players.length; i++)
                {
                    if (Players[i].id === currentSnake.id)
                    {
                        if (currentSnake.position === 0) 
                        {
                        pos11++;
                        fin11++;
                        currentSnake.position = pos11;
                        break;
                        }
                    }
                }

                if(fin11 === col11)
                {
                    stopgame();
                    stopdraw();
                    break;
                }
            }
        }
        if (currentSnake.move == 'D') {
            if(currentSnake.coorY < 37)
            {
                currentSnake.coorY++;
            }
        }
        if (currentSnake.move == 'G') {
            currentSnake.coorY = currentSnake.coorY;
            currentSnake.coorX = currentSnake.coorX;
        }
        }
    }
        io.sockets.emit('snakes',JSON.stringify(Player)); 
       
    }

    function startdraw()
    {
        cc = setInterval(step,200);
    }

    function stopdraw()
    {
        clearInterval(cc);
    }
