function filter(e){

    var i;

const card = document.getElementsByClassName('card')
console.log('u r typing:',e.target.value)
const searchWhat=e.target.value.toUpperCase();

for(i=0; i<card.length;i++){
    const title=card[i].firstChild.innerText.toUpperCase()
    console.log('inedx:', title.indexOf(searchWhat))
    
    
    if(title.indexOf(searchWhat)>-1){
        card[i].classList.add("dont");
        card[i].classList.remove("showYes");
    }else{
        card[i].classList.add('showYes')
        card[i].classList.remove("dont");
    }
}


 }


 export default filter