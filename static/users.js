
var d=new Date();
var cookie_exp_date=d.getFullYear()+2;

  
 function setTheme(){
    
    if(getToken("theme")==null){
        document.cookie=`theme=light; expires=Thu, 30 Dec ${cookie_exp_date} 12:00:00 UTC`;
    }
    
    var dark_switch=document.getElementById("myonoffswitch");
    
    var theme=getToken("theme");
    
    if(theme=="light"){
        document.documentElement.style.setProperty('--primary-color', '#2fa1e2');
        document.documentElement.style.setProperty('--sidebar-color', '#FAFAFA');
        document.documentElement.style.setProperty('--container-color', '#ffffff');
        document.documentElement.style.setProperty('--secondary-color', ' #ffffff');
        document.documentElement.style.setProperty('--navtext-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000');
        document.documentElement.style.setProperty('--iconhover-color', 'rgb(255, 254, 254,0.2)');
        dark_switch.checked=false;
    }
    else{
        document.documentElement.style.setProperty('--primary-color', '#1b1b2f');
        document.documentElement.style.setProperty('--sidebar-color', '#162447');
        document.documentElement.style.setProperty('--container-color', '#1f4068');
        document.documentElement.style.setProperty('--secondary-color', '#e43f5a');
        document.documentElement.style.setProperty('--navtext-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--iconhover-color', 'rgb(255, 254, 254,0.2)')
        dark_switch.checked=true;
    }
 } 
  
 setTheme();
 
 
//dark_mode_toggle
var dark_switch=document.getElementById("myonoffswitch");

dark_switch.addEventListener("click",function(){
    var theme=getToken("theme");
    console.log(theme);
    if(theme=="light"){
        
        document.documentElement.style.setProperty('--primary-color', '#1b1b2f');
        document.documentElement.style.setProperty('--sidebar-color', '#162447');
        document.documentElement.style.setProperty('--container-color', '#1f4068');
        document.documentElement.style.setProperty('--secondary-color', '#e43f5a');
        document.documentElement.style.setProperty('--navtext-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--iconhover-color', 'rgb(255, 254, 254,0.2)');
        document.cookie=`theme=dark; expires=Thu, 30 Dec ${cookie_exp_date} 12:00:00 UTC`;
    }
    else{
        document.documentElement.style.setProperty('--primary-color', '#2fa1e2');
        document.documentElement.style.setProperty('--sidebar-color', '#FAFAFA');
        document.documentElement.style.setProperty('--container-color', '#ffffff');
        document.documentElement.style.setProperty('--secondary-color', ' #ffffff');
        document.documentElement.style.setProperty('--navtext-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000');
        document.documentElement.style.setProperty('--iconhover-color', 'rgb(255, 254, 254,0.2)');
        document.cookie=`theme=light; expires=Thu, 30 Dec ${cookie_exp_date} 12:00:00 UTC`;
    }
})
