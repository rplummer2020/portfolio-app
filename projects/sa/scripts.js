function analyzeData(){
    

var a = document.getElementById("aval").value; //gets the element with id= "aval"
var b = document.getElementById("bval").value;
var c = document.getElementById("cval").value;
    
    
//radix of 10
var num1 = parseInt(a, 10);
var num2 = parseInt(b, 10);
var num3 = parseInt(c, 10);
    

//variables for the analysis, set equal to 0
var max = 0;
var min = 0;
var range = 0;
var median = 0;
var mean = 0;
    
    
    
//minimum
if (num1 < num2 && num1 < num3){
    min = num1;
}
else if(num2 < num1 && num2 < num3){
    min = num2;
}
else{
    min = num3;
}
    
    
    
//maximum
if (num1 > num2 && num1 > num3){
    max = num1;
}
else if(num2 > num1 && num2 > num3){
    max = num2;
}
else{
    max = num3;
}
    
    
    
//range
range = max - min;
    
    
//median (odd number of three will just be all numbers minus max and min)
median = (num1 + num2 + num3) - (max + min);
    
    
// mean (average)
mean = (num1 + num2 + num3) / 3;
    
    
// returns the element that has the ID attribute with specific value
    
document.getElementById("max").innerHTML =  max;
document.getElementById("min").innerHTML = min;
document.getElementById("mean").innerHTML = mean;
document.getElementById("median").innerHTML = median;
document.getElementById("range").innerHTML = range;
}
