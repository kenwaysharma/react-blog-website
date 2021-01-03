import { get } from "js-cookie"

function hideORshow(e){
var i
const sidebar=document.getElementsByClassName('tenPer')
const main = sidebar[0].classList

var newW=document.getElementsByClassName("ninetyPer").innerHTML

var w = window.innerWidth;
var h = window.innerHeight;
 newW= "Width: " + w + "<br>Height: " + h;





console.log(w)



console.log('tenper:', sidebar[0].classList)
console.log('style',sidebar[0].classList)

for(i=0; i<main.length;i++){
console.log('Nmae', main[i])

if(main[i]=='hide'){
    main.remove('hide')
    main.add('show')

}else if(main[i]=='show'){

    main.remove('show')
    main.add('hide')

}

}































 }


 export default hideORshow