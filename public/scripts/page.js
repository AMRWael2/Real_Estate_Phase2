function bufferToBase64(buffer) {
    return buffer.toString('base64');
}
const allobjects=[
    {id:"1",bed:"3",toilets:"2",living:"1",garden:1,swim:0,location:"https://www.google.com/maps/place/Emaar+Mivida+Compound/@30.0102788,31.5353318,17z/data=!3m1!4b1!4m6!3m5!1s0x1458222742926025:0x8f18a8273e8f9068!8m2!3d30.0102788!4d31.5379067!16s%2Fg%2F11bzq369s9?entry=ttu",pricet:"3,500,255EGP",price:3500255,makan:"Attameya Heights",details:"Book your free invitation now to the most important and largest real estate exhibition in the Middle East, The Address Property Show, in its second session, in the presence of more than 25 real estate developers with exclusive offers and annual discounts of up to 50% for 4 days, starting from Wednesday 8/5 to Saturday"},
    {id:"2",bed:"5",toilets:"3",living:"2",garden:1,swim:1,location:"https://www.google.com/maps/search/Hyde+park+appartments/@30.0484216,31.4635438,12.55z?entry=ttu",pricet:"5,690,000EGP",price:5690000,makan:"Sheikh Zayed",details:"Sheikh Zayed Apartments typically refer to residential complexes or buildings named after Sheikh Zayed bin Sultan Al Nahyan, the founding father of the United Arab Emirates. These apartments are commonly found in the UAE, particularly in cities like Abu Dhabi and Dubai, where his legacy is highly revered."},
    {id:"3",bed:"10",toilets:"6",living:"4",garden:3,swim:3,location:"https://www.google.com/maps/place/Aldau+Heights+%2F+Strand/@27.1955667,33.8343567,17z/data=!4m10!3m9!1s0x14528721111ea329:0xe3234530dec96e60!5m3!1s2024-05-18!4m1!1i2!8m2!3d27.1955667!4d33.8369316!16s%2Fg%2F11g6wz3rv4?entry=ttu",pricet:"8,050,340EGP",price:8050340,makan:"Fifth Settlement",details:"Fifth Settlement typically refers to a district or area in Cairo, Egypt, known for its modern urban development, upscale residential complexes, and commercial centers. The Fifth Settlement area is one of the newer and more affluent parts of Cairo, characterized by its wide boulevards, landscaped green spaces, and contemporary architecture"}
];
var i=1;
var i2=1;
const n=3;
const n2=allobjects.length;
let b;
window.onload = function() {
const params = new URLSearchParams(document.location.search);
b=params.get("btn");
if(b==null)
    b=1;
getbutton();
setInterval(incimage,6000);
setInterval(incimage2,6000);
}
function incimage(){
    i++;
    if(i>n)
       i=1;
    checkimg();
}
function decimage(){
    i--;
    if(i<1)
       i=n;
    checkimg();
}
function getbutton(){
    u='/images/images'+b+'/image1.jpg';
    document.getElementById("start").style.backgroundImage=`url(${u})`;
    i2=parseInt(b)+1;
    if(i2>n)
    {
        i2=1;
    }
    let mainim='/images/mainimages/image'+i2+'.jpg';
    document.getElementById("contentdiv2").style.backgroundImage=`url(${mainim})`;
    for(let y in arr)
    {
        document.getElementById("makan2").innerHTML=allobjects[y].name;
        document.getElementById("price2").innerHTML=allobjects[y].price;
    }
    document.getElementById("anchortag").href="/page.ejs?btn="+i2;
    if(allobjects[x].garden =='0')
        document.getElementById("garden").innerHTML="None";
    if(allobjects[x].swim =='0')
        document.getElementById("Swim").innerHTML="None";
    
}
function checkimg(){
    let u='/images/images'+b;
    if(i==1)
    {
        u+='/image1.jpg';
        document.getElementById("start").style.backgroundImage=`url(${u})`;
    }
    if(i==2)
    {
        u+='/image2.jpg';
        document.getElementById("start").style.backgroundImage=`url(${u})`;
    }
    if(i==3)
    {
        u+='/image3.jpg';
        document.getElementById("start").style.backgroundImage=`url(${u})`;
    }
}







function incimage2(){
    i2++;
    if(i2>n2)
       i2=1;
    if(i2==b)
    {
        i2++;
    }
    checkimg2();
}
function decimage2(){
    i2--;
    if(i2==b)
    {
        i2--;
    }
    if(i2<1)
       i2=n2;
    checkimg2();
}
function checkimg2(){
    document.getElementById("makan2")=arr[i2].name;
    document.getElementById("price2").innerHTML=arr[i2].price;
    document.getElementById("anchortag").href="/page.ejs?btn="+i2;
    const base64Image = bufferToBase64(arr[i].image.data);
    document.getElementById("contentdiv2").style.backgroundImage="data:<%= arr[i].image.contentType %>;base64,<%= base64Image %>";
}