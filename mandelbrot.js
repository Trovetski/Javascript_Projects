//code for genrating and exploring
//the mandelbrot set

//var to store center
var cx = 300;
var cy = 300;

var p1x = 0;
var p1y = 0;

var p2x = 0;
var p2y = 0;

var ratio = 0.005;

function setup(){
    cnv = createCanvas(600, 600);
    cnv.mouseWheel(zoom);
    pixelDensity(1);
    loadPixels();
}

function draw(){

    frameRate(24);
    if(mouseIsPressed==true){
        cx = p2x - (p1x-mouseX);
        cy = p2y - (p1y-mouseY);
    }else{
        p1x = mouseX;
        p1y = mouseY;

        p2x = cx;
        p2y = cy;
    }

    let x,y;

    for(x=0;x<width;x++){
        let ca = (x-cx)*ratio;
        for(y=0;y<height;y++){

            
            let cb = (y-cy)*ratio;

            let a = 0;
            let b = 0;

            let n = 0;

            while(n<128){

                let aa = a;
                a = (a+b)*(a-b) + ca;
                b = 2*aa*b + cb;

                if(abs(a+b)>2){break;}

                n++;
            }

            let rd, gr, bl;
            switch(true){
                case n<21:
                    rd = 255;
                    gr = n*12;
                    bl = 12;
                    break;
                case n<42:
                    rd = 500-n*12;
                    gr = 255;
                    bl = 12;
                    break;
                case n<63:
                    rd = 12;
                    gr = 255;
                    bl = (n-42)*12;
                    break;
                case n<84:
                    rd = 12;
                    gr = 1000-n*12;
                    bl = 255;
                    break;
                case n<105:
                    rd = (n-84)*12;
                    gr = 12;
                    bl = 255;
                    break;
                case n<126:
                    rd = 255;
                    gr = n*12;
                    bl = 1500-n*12;
                    break;
                default:
                    rd = 0;
                    gr = 0;
                    bl = 0;
                    break;
            }

            let pix = (x+y*width)*4;
            pixels[pix+0] = rd;
            pixels[pix+1] = gr;
            pixels[pix+2] = bl;
            pixels[pix+3] = 255;
        }
    }
    updatePixels();
}

function zoom(event){
    if(event.deltaY>0){
        ratio /= 1.0466;
        cx -= (300-cx)*0.0466;
        cy -= (300-cy)*0.0466;
    }else{
        ratio *= 1.0466;
        cx += (300-cx)*0.0466;
        cy += (300-cy)*0.0466;
    }
}