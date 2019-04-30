const $form = document.querySelector("form");
const $search = document.querySelector("input");
const $display = document.querySelector("#display");
const $error = document.querySelector("#error");

$form.addEventListener("submit",(e) =>{
    e.preventDefault();
    const location = $search.value;
    $search.value="";
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data)=>{
        if(data.error) $error.textContent = data.error;
        else{
            $display.textContent = `${data.placename} ,The temperature is ${data.temperature} Degrees and the chances of rain is ${data.rain}%`;
        }
    })
});

});


