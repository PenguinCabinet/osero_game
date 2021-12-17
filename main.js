const osero_size=800;
const one_osero_size=osero_size/8;
const info_size=200;

var config = {
    type: Phaser.AUTO,
    width: osero_size+info_size,
    height: osero_size,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

function preload(){
    this.load.image('background', 'images/background.png');
    this.load.image('black', 'images/black.png');
    this.load.image('white', 'images/white.png');
}

function Get_oseroX_to_X(x){
    return one_osero_size*x+info_size;
}

function Get_oseroY_to_Y(y){
    return one_osero_size*y;
}

var Print_Board_data=null;

var Board_data=null;
var player_Board_data=null;
var Player_Board_data_x=0;
var Player_Board_data_y=0;

function Print_Board(b,b2,my_this){
    for(let x=0;x<b.length;x++){
        for(let y=0;y<b[x].length;y++){
            switch(b[x][y]){
                case 1:
                    Print_Board_data[x][y].push(my_this.add.image(
                        Get_oseroX_to_X(x)+one_osero_size/2,
                        Get_oseroY_to_Y(y)+one_osero_size/2,
                        'black'));
                    break;
                case 2:
                    Print_Board_data[x][y].push(my_this.add.image(
                        Get_oseroX_to_X(x)+one_osero_size/2
                        ,Get_oseroY_to_Y(y)+one_osero_size/2
                        ,'white'));
                    break;   
            }
            switch(b2[x][y]){
                
                case 3:
                    Print_Board_data[x][y].push(my_this.add.image(
                        Get_oseroX_to_X(x)+one_osero_size/2
                        ,Get_oseroY_to_Y(y)+one_osero_size/2
                    ,'white'));
                    break;     
            }
        }
    }
}


function clear_Print_Board(b,my_this){
    for(let x=0;x<Print_Board_data.length;x++){
        for(let y=0;y<Print_Board_data[x].length;y++){
            if(Print_Board_data[x][y]===undefined){
            }
        if(Print_Board_data[x][y]!==null&&Print_Board_data[x][y]!==undefined){
                //console.log(Print_Board_data[x][y]);
                Print_Board_data[x][y].forEach(e => {
                    e.destroy();                    
                });
                Print_Board_data[x][y]=[];
            }
        }
    }
}

function create(){

    this.add.rectangle((osero_size+info_size)/2,osero_size/2,osero_size+info_size,osero_size,0xfffffff);
    this.add.image(osero_size/2+info_size,osero_size/2,'background');
    //this.add.line(0,400,00,0,00,800,0xfffff); 
    for(let x=0;x<8;x++){
        let x1=Get_oseroX_to_X(x);
        this.add.line(0,osero_size/2,x1,0,x1,osero_size,0); 
    }
    for(let y=0;y<8;y++){
        let y1=Get_oseroY_to_Y(y);
        this.add.line(osero_size/2+1.5*info_size,0,0,y1,osero_size+info_size,y1,0); 
    }
    
    Print_Board_data=[]
    for(let x=0;x<8;x++){
        Print_Board_data.push([])
        for(let y=0;y<8;y++){
            Print_Board_data[x].push([])
        }
    }
    
    this.life_text_UI = this.add.text(5, 5, "LIFE:5", {fontSize: 30,fontFamily: "serif"});
    this.life_text_UI.setTint(0);
    this.life_text_UI.setText("LIFE:5");
    
    this.score_text_UI = this.add.text(5, 100, "SCORE:0", {fontSize: 30});
    this.score_text_UI.setTint(0);

    this.info_how_to_start_text_UI = this.add.text(5, 500, "LIFE:5", {fontSize: 25});
    this.info_how_to_start_text_UI.setTint(0);
    
    Game_over(this);

    this.UpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.DownKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.RightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.LeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

}


let player_move_flags=[false,false,false,false];
function player_move(my_this){
    let bp_x=Player_Board_data_x;
    let bp_y=Player_Board_data_y;

    //console.log(player_move_flags[0]);
    if (my_this.UpKey.isDown) {
        if(!player_move_flags[0]){
            Player_Board_data_y--;
            player_move_flags[0]=true;
        }
    }else{
        player_move_flags[0]=false;
    }

    if (my_this.DownKey.isDown){
        if(!player_move_flags[1]){
            Player_Board_data_y++;
            player_move_flags[1]=true;
        }
    }else{
        player_move_flags[1]=false;
    }

    if (my_this.RightKey.isDown){
        if(!player_move_flags[2]){
            Player_Board_data_x++;
            player_move_flags[2]=true;
        }
    }else{
        player_move_flags[2]=false;
    }

    if (my_this.LeftKey.isDown){
        if(!player_move_flags[3]){
            Player_Board_data_x--;
            player_move_flags[3]=true;
        }
    }else{
        player_move_flags[3]=false;
    }

    if(Player_Board_data_x<0){
        Player_Board_data_x=0;
    }
    if(Player_Board_data_x>=8){
        Player_Board_data_x=7;
    }
    if(Player_Board_data_y<0){
        Player_Board_data_y=0;
    }
    if(Player_Board_data_y>=8){
        Player_Board_data_y=7;
    }

    player_Board_data[bp_x][bp_y]=0;
    player_Board_data[Player_Board_data_x][Player_Board_data_y]=3;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function generate_stone(){
    let temp=getRandomInt(256)&getRandomInt(256)&getRandomInt(256);
    //console.log(temp.toString(2));
    for(let i=0;i<8;i++){
        if((temp&(1<<i))!=0){
            Board_data[i][0]=1;
        }else{
            Board_data[i][0]=0;
        }
    }
}

function down_stone(){
    for(let x=0;x<8;x++){
        //console.log(Board_data[x]);
        Board_data[x]=Board_data[x].filter((e,i)=>i!==7);
        Board_data[x].splice(0,0,0);
    }
}

player_life=5;
function player_check_life(my_this){
    if(Board_data[Player_Board_data_x][Player_Board_data_y]!=0){
        player_life--;
    }

    my_this.life_text_UI.setText(`LIFE:${player_life}`)
    if(player_life<=0){
        Game_over(my_this);
        is_title=true;
    }
}


function Set_score_UI(my_this,x){
    my_this.score_text_UI.setText(`SCORE:${Math.floor(Math.pow(x,1.2))}`)
}

player_score=0;
function player_score_add(my_this){
    player_score++;

    Set_score_UI(my_this,player_score);
}


function Game_init(my_this){
    
    Board_data=[]
    for(let x=0;x<8;x++){
        Board_data.push([])
        for(let y=0;y<8;y++){
            Board_data[x].push(0)
        }
    }
    generate_stone();

    player_Board_data=[]
    for(let x=0;x<8;x++){
        player_Board_data.push([])
        for(let y=0;y<8;y++){
            player_Board_data[x].push(0)
        }
    }
    player_Board_data[3][4]=3;
    Player_Board_data_x=3;
    Player_Board_data_y=4;

    my_this.life_text_UI.setTint(0);
    my_this.life_text_UI.setText("LIFE:5");
    player_life=5;

    player_score=0;
    Set_score_UI(my_this,player_score);

    my_this.info_how_to_start_text_UI.setText("");
}

function Game_over(my_this){
    clear_Print_Board();
    Board_data=[]
    for(let x=0;x<8;x++){
        Board_data.push([])
        for(let y=0;y<8;y++){
            Board_data[x].push(0)
        }
    }
    player_Board_data=[]
    for(let x=0;x<8;x++){
        player_Board_data.push([])
        for(let y=0;y<8;y++){
            player_Board_data[x].push(0)
        }
    }
    Board_data[4][3]=1;
    Board_data[3][4]=1;
    Board_data[3][3]=2;
    Board_data[4][4]=2;

    my_this.info_how_to_start_text_UI.setText("Sキーでスタート");

    Print_Board(Board_data,player_Board_data,my_this);
}

update_time=0;
update_wait_time=100;
is_title=true;
function update(){
    if(!is_title){

        player_move(this);
        if(update_time>=update_wait_time){
            update_wait_time=Math.max((200-(player_score*0.2)), 100);
            down_stone();
            generate_stone();

            clear_Print_Board(Board_data,this)
            Print_Board(Board_data,player_Board_data,this)
            player_score_add(this);
            player_check_life(this);
            update_time=0;
        }
    }else{
        if(this.SKey.isDown){
            is_title=false;
            Game_init(this);
            clear_Print_Board();
        }
    }
    update_time+=game.loop.delta;
}