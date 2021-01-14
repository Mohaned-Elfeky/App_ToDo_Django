var login_btn=document.getElementById("login_btn");
var signup_btn=document.getElementById("signup_btn");

var login_div=document.getElementById("login");
var signup_div=document.getElementById("signup")

login_btn.addEventListener("click",function(){
    login_div.style.display="block";
    signup_div.style.display="none";
    
    login_btn.classList.add("active");
    signup_btn.classList.remove("active");
})


signup_btn.addEventListener("click",function(){
    login_div.style.display="none";
    signup_div.style.display="block";
    
    login_btn.classList.remove("active");
    signup_btn.classList.add("active");
})