var start=document.getElementById("canId1");
var ctx=start.getContext("2d");
ctx.fillStyle="lightgray";
ctx.fillText("Upload your image here by pushing button 'Upload Image'",10,40);

var output=new SimpleImage(150,200);
var yourImage=null;

function imgOpen() {
	var imgFile=document.getElementById("finput");
    yourImage=new SimpleImage(imgFile);    
    var drowCanvas=document.getElementById("canId1");    
    yourImage.drawTo(drowCanvas);
}

function clearCanvas1(){
	var dd1=document.getElementById("canId1");
    var ctx0=dd1.getContext("2d");
	ctx0.clearRect(0,0,dd1.width,dd1.height);
}

function clearCanvas(){
	var dd1=document.getElementById("canId1");
    var ctx0=dd1.getContext("2d");
	ctx0.clearRect(0,0,dd1.width,dd1.height);
	output.drawTo(dd1);
	ctx.fillStyle="#F3f3f3";
	ctx.fillRect(0,0,output.getWidth(),output.getHeight());
    ctx.fillStyle="lightgray";
	ctx.fillText("Upload another image here",10,40);
	yourImage=null;
	document.getElementById("finput").value=null;
}

function doAlert(){
	alert("Image has not loaded! First, upload your Image");
	return;
}

function resetImg(){		
	if(yourImage==null || !yourImage.complete()){
		doAlert();
	}
	else {
	    clearCanvas1();
        yourImage.drawTo(start);
    }
}

function makeGrayScale(){
	if(yourImage!=null){
        var image = new SimpleImage(yourImage);
        for(var pixel of image.values()){
        	var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        	pixel.setRed(avg);
        	pixel.setGreen(avg);
        	pixel.setBlue(avg);
        }
        var imgcanvas=document.getElementById("canId1");
        image.drawTo(imgcanvas);
	}
    else{
        doAlert();
    }
}

function makeRed(){
	if(yourImage!=null){
        var image = new SimpleImage(yourImage);
        for(var pixel of image.values()){        	
        	var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        	if (avg<128){
        		pixel.setRed(2*avg);
        		pixel.setGreen(0);
        		pixel.setBlue(0);
        	}
        	else {
        		pixel.setRed(255);
        		pixel.setGreen(2*avg-255);
        		pixel.setBlue(2*avg-255);
        	}
        }
        var imgcanvas=document.getElementById("canId1");
        image.drawTo(imgcanvas);
	}
    else{
        doAlert();
    }
}

function doWindows(){
	if(yourImage!=null){
		var image = new SimpleImage(yourImage);
		var getW=image.getWidth();
		var getH=image.getHeight();
		var bder=getW/20;
        for(var pixel of image.values()){
        	var x=pixel.getX();
        	var y=pixel.getY();        	
        	if(((x<bder || x>(getW-bder)) || (y<bder || y>(getH-bder))) || (x>=(getW/2-bder/2) && x<=(getW/2+bder/2)) || (y>=(getH/2-bder/2) && y<=(getH/2+bder/2))){
        		pixel.setRed(255);
        		pixel.setGreen(255);
        		pixel.setBlue(255);
        	}        	        	
        }
        var imgcanvas=document.getElementById("canId1");
        image.drawTo(imgcanvas);
	}
	else{
        doAlert();
    }
}

function doRainbow(){
	if(yourImage!=null){
		var image = new SimpleImage(yourImage);
		var getH=image.getHeight();
		var n=7;
		for(var pixel of image.values()){
			var y=pixel.getY();
			avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
			if(y<getH/n){
				if(avg<128){
					pixel.setRed(2*avg);
					pixel.setGreen(0);
					pixel.setBlue(0);
				}
				else{
					pixel.setRed(255);
					pixel.setGreen(2*avg-255);
					pixel.setBlue(2*avg-255);					
				}
			}
			else if(y>getH/n && y<2*getH/n){
				if(avg<128){
					pixel.setRed(2*avg);
					pixel.setGreen(0.8*avg);
					pixel.setBlue(0);
				}
				else{
					pixel.setRed(255);
					pixel.setGreen(1.2*avg-51);
					pixel.setBlue(2*avg-255);					
				}
			}
			else if(y>2*getH/n && y<3*getH/n){
				if(avg<128){
					pixel.setRed(2*avg);
					pixel.setGreen(2*avg);
					pixel.setBlue(0);
				}
				else{
					pixel.setRed(255);
					pixel.setGreen(255);
					pixel.setBlue(2*avg-255);					
				}
			}
			else if(y>3*getH/n && y<4*getH/n){
				if(avg<128){
					pixel.setRed(0);
					pixel.setGreen(2*avg);
					pixel.setBlue(0);
				}
				else{
					pixel.setRed(2*avg-255);
					pixel.setGreen(255);
					pixel.setBlue(2*avg-255);					
				}
			}
			else if(y>4*getH/n && y<5*getH/n){
				if(avg<128){
					pixel.setRed(0);
					pixel.setGreen(0);
					pixel.setBlue(2*avg);
				}
				else{
					pixel.setRed(2*avg-255);
					pixel.setGreen(2*avg-255);
					pixel.setBlue(255);
				}
			}
			else if(y>5*getH/n && y<6*getH/n){
				if(avg<128){
					pixel.setRed(0.8*avg);
					pixel.setGreen(0);
					pixel.setBlue(2*avg);
				}
				else{
					pixel.setRed(1.2*avg-51);
					pixel.setGreen(2*avg-255);
					pixel.setBlue(255);
				}
			}
			else if(y>6*getH/n){
				if(avg<128){
					pixel.setRed(1.6*avg);
					pixel.setGreen(0);
					pixel.setBlue(1.6*avg);
				}
				else{
					pixel.setRed(0.4*avg+153);
					pixel.setGreen(2*avg-255);
					pixel.setBlue(0.4*avg+153);
				}
			}
		}
		var imgcanvas=document.getElementById("canId1");
        image.drawTo(imgcanvas);
	}
	else{
        doAlert();
    }
}

/* here blur algorithm*/
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function doBlur(){
	if(yourImage!=null){
		var image = new SimpleImage(yourImage.getWidth(), yourImage.getHeight());
		for (var pixel of yourImage.values()) {
            var x = pixel.getX();
            var y = pixel.getY();
            if (Math.random() > 0.5) {
            	var other = getPixelNearby(yourImage, x, y, 10);
            	image.setPixel(x, y, other);            	
            }
            else {
            	image.setPixel(x, y, pixel);
            }
        }
        var imgcanvas=document.getElementById("canId1");
        image.drawTo(imgcanvas);
	}
	else{
        doAlert();
    }
}