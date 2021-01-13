//csrfToken
function getToken(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getToken('csrftoken')

//setup page
rerloadTasksContainer();




var current_date="all";

getTasks("None");

//get_tasks
function getTasks(list_id){
    
   
    fetch("/get_tasks/",{
        method:"post",
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "date":current_date  ,
            "list":list_id
        })
       }) 
    .then(response=>{
        return response.json();
    })
    .then(data=>{
       var notasks_div=document.getElementById("notasks");
        if(data==""){
            notasks_div.style.display="block"
        }
        else{
            notasks_div.style.display="none"
            
        }
        loadTasks(data);
        rerloadTasksContainer();
    })
    

}

//reload html
function loadTasks(data){
    tasks=data;
    var task_container=document.getElementById('tasks-container');
    task_container.innerHTML=''

    
    for (var i in tasks){
        var html=`
        
        <li class="task" data-task_id=${tasks[i].id} id="task${tasks[i].id}">   
        <div class="task_info" id="task_info${tasks[i].id}">
            <input data-task_id=${tasks[i].id} type="checkbox">
            ${tasks[i].content}
        </div>
        
        <div class="task_edit"  id="task_edit${tasks[i].id}">
            <input type="text" value= "${tasks[i].content}" id="edit_input${tasks[i].id}"  >
            <input type="button" value="Save" class="save_btn" data-task_id=${tasks[i].id}>
            <input type="button" value="Cancel" class="cancel_btn" data-task_id=${tasks[i].id}>
        </div>
      
        
        <div  class="edit_btn hoverable"  data-task_id=${tasks[i].id} id="edit${tasks[i].id}"><i class="fas fa-pen-square"></i>
          <span class="tooltip">Edit</span>
        </div>
      </li>
        
        `
        
        task_container.innerHTML+=html;
    }
    
    
}


//side_navigation
var side_bar_menu = document.getElementById("side_navigation");
side_bar_menu.addEventListener("click",function(e){
    
   
    
    if (e.target && e.target.matches("li") && !e.target.classList.contains("list")  ) {
        var side_bar=document.getElementById("side-bar");
        var main_container=document.getElementById("edit-area");
        var width=document.body.offsetWidth;
        
        
        var item=e.target;
        current_date=e.target.dataset.date;
        add_task_list.style.display="none";
        
        var delete_btn=document.getElementById("delete_btn");
        delete_btn.style.display="none";
        
        var header=document.getElementById("header_text");
        var header_date=document.getElementById("header_date");
        var overlay_div=document.getElementById("overlay_div")
        
        var active_item=document.getElementsByClassName("side_bar_active")[0];
        active_item.classList.remove("side_bar_active");
        item.classList.add("side_bar_active");
        
        
        if(current_date=="all"){
            header.innerHTML="All Tasks";
            header_date.style.display="none";
        }
        
        if(current_date=="today"){
            header.innerHTML="Today";
            header_date.innerHTML=today;
            header_date.style.display="block";
        }
        
        if(current_date=="week"){
            header.innerHTML="Upcoming Week";
            header_date.innerHTML=week_start+" to "+week_end;
            header_date.style.display="block";
        }
        
        
        
        getTasks("None")
        
        if(width<=600){
           side_bar.classList.add("fadeout");
           main_container.classList.add("edit_fade");
           overlay_div.style.display="none";
        }
    }
    
    else if(e.target.id != "lists_toggle" && e.target.classList.contains("list")){
        add_task_list.style.display="block";
    }
    

})


//sidebar_fadeout
var menu_icon=document.getElementById("menu_icon");
menu_icon.addEventListener("click",function(){
    
    var width=document.body.offsetWidth;
    
    var side_bar=document.getElementById("side-bar");
    var main_container=document.getElementById("edit-area");
    var overlay_div=document.getElementById("overlay_div")
    
    if(!side_bar.classList.contains("fadeout")){
        overlay_div.style.display="none";
        side_bar.classList.add("fadeout");
        main_container.classList.add("edit_fade");
        
    }
    else{
        if(width<600){
            overlay_div.style.display="block";
        }
        
        side_bar.classList.remove("fadeout");
        main_container.classList.remove("edit_fade");
    }
   
    
})



// list_click
var lists=document.getElementsByClassName("list");
for (i=1;i<lists.length;i++){
    lists[i].addEventListener("click",function(){
        var delete_btn=document.getElementById("delete_btn");
        delete_btn.style.display="block";
        
        current_date="all";
        var header=document.getElementById("header_text");
        var header_date=document.getElementById("header_date");
        header.innerHTML=this.dataset.name;
        header_date.style.display="none";
        
        var active_item=document.getElementsByClassName("side_bar_active")[0];
        active_item.classList.remove("side_bar_active");
        this.classList.add("side_bar_active");
        
        getTasks(this.dataset.list_id);
    })
}

//delete_task
function delete_btns(){
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (i=1;i<checkboxes.length;i++){
    checkboxes[i].addEventListener("click",function(){
        
        var active_item=document.getElementsByClassName("side_bar_active")[0];
        
        
       fetch("/delete/",{
        method:"post",
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "task_id":this.dataset.task_id  ,
        })
       }) 
       .then((response)=>{
        
         return response.json()
         
        })
        .then((data)=>{
            var task_div=document.getElementById("task"+this.dataset.task_id);
            task_div.style.textDecoration="line-through";
            window.setTimeout(function(){
                if(active_item.classList.contains("list")){
                    getTasks(active_item.dataset.list_id);
                    
               }
               else 
               getTasks("None");
            
            },200);
        })
    
        
    })
    
    
}
}



//toggle edit div
function edit_btns(){
    
    var edit_btns=document.getElementsByClassName("edit_btn");
    for(var j=0;j<edit_btns.length;j++){
        edit_btns[j].addEventListener("click",function(){
         
            task_id=this.dataset.task_id;
            var info_div=document.getElementById("task_info"+task_id)
            info_div.style.display="none";
            var edit_div=document.getElementById("task_edit"+task_id)
            edit_div.style.display="block";
            this.style.display="none";
            
        }) 
    }
}


//save_edit
function save_edit(){
    var save_btns=document.getElementsByClassName("save_btn")
    for(i=1;i<save_btns.length-1;i++){
        save_btns[i].addEventListener("click",function(){
            var active_item=document.getElementsByClassName("side_bar_active")[0];
            task_id=this.dataset.task_id; 
            edit_input=document.getElementById("edit_input"+task_id);
            new_value=edit_input.value;
            
            var url="/edit/"
            fetch(url,{
                method:"post",
                
                headers:{
                    'Content-Type':'application/json',
                    'X-CSRFToken':csrftoken,
                },
                body:JSON.stringify({
                    "task_id":this.dataset.task_id,
                    "new_value":new_value
                })
                
            }).then((response)=>{
        
                return response.json()
            })
            .then((data)=>{
            
           
            if(active_item.classList.contains("list")){
                 getTasks(active_item.dataset.list_id);
                 
            }
            else 
            getTasks("None");
            
                
            var info_div=document.getElementById("task_info"+task_id)
            info_div.style.display="block";
            var edit_div=document.getElementById("task_edit"+task_id)
            edit_div.style.display="none";
            
            
            })
            
        })
    }
}


//cancel_edit
function cancel_edit(){
    var cancel_btns=document.getElementsByClassName("cancel_btn");
    for(var j=1;j<cancel_btns.length-1;j++){
        cancel_btns[j].addEventListener("click",function(){
            task_id=this.dataset.task_id;
            var info_div=document.getElementById("task_info"+task_id);
            info_div.style.display="block";
            var edit_div=document.getElementById("task_edit"+task_id);
            edit_div.style.display="none";
            var edit_btn=document.getElementById("edit"+task_id);
            edit_btn.style.display="block";
            
            
        }) 
    }
}




function reloadPage(){
    location.reload(); 
}
    
//add
var add_icon=document.getElementById("add_icon");
add_icon.addEventListener("click",function(){
    document.getElementById("add_div").style.display="block";
})

var cancel_new_btn =document.getElementById("cancel_new_btn");
cancel_new_btn.addEventListener("click",function(){
    
    document.getElementById("add_div").style.display="none";
    
    
    
})





var add_new_btn=document.getElementById("add_new_btn");
add_new_btn.addEventListener("click",function(){
    var date_input=document.getElementById("date_input");
    date=date_input.value;
    
    if(date){
        add_task(date);
        document.getElementById("add_div").style.display="none";
    }
    else{
        var date_error=document.getElementById("date_error");
        date_error.style.display="block";
    }
    
    

    
    
})




function add_task(date){
    new_value=document.getElementById("add_input").value;
    
    var url="/add/"
    fetch(url,{
        method:"post",
        headers:{
        'Content-Type':'application/json',
        'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "content":new_value, 
            "date":date
        })
        
    }).then((response)=>{
     
        return response.json()
    })
    .then((data)=>{
       getTasks("None");
       document.getElementById("add_div").style.display="none";
    })

}



//reload tasks container
function rerloadTasksContainer(){
edit_btns();
delete_btns();
save_edit();
cancel_edit();
}




//lists_toggle
var list_toggle=document.getElementById("lists_toggle");
list_toggle.addEventListener("click",function(){
    var lists_container=document.getElementById("lists_container");
    lists_container.classList.toggle("lists_container_invisible");
})

// delete_list
var delete_btn=document.getElementById("delete_btn");
    delete_btn.addEventListener("click",function(){
        var active_list=document.getElementsByClassName("side_bar_active")[0];
        fetch("/delete_list/",{
            method:"post",
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({
                "list_id": active_list.dataset.list_id ,
            })
           }) 
           .then((response)=>{
            
             return response.json()
             
            })
            .then((data)=>{
               reloadPage();
            })
    })

//list_add_toggle
var add_list_icon=document.getElementById("add_icon_div");
add_list_icon.addEventListener("click",function(){
    
    var add_list_div=document.getElementById("add_list_div");
    add_list_div.style.display="block";
})

//list_add
var cancel_list=document.getElementById("cancel_list");
cancel_list.addEventListener("click",function(){
    var add_list_div=document.getElementById("add_list_div");
    add_list_div.style.display="none";
})

//save_list
var save_list=document.getElementById("save_list");
save_list.addEventListener("click",function(){
    
    // var add_list_div=document.getElementById("add_list_div");
    // add_list_div.style.display="none";
    
    var list_name_input=document.getElementById("list_name_input");
    list_name=list_name_input.value;
    
    if(list_name==""){
        list_name_input.style.border="1px red solid";
    }
    else{
    
    var url="/add_list/"
    fetch(url,{
        method:"post",
        headers:{
        'Content-Type':'application/json',
        'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "list_name":list_name
        })
        
    }).then((response)=>{
     
        return response.json()
    })
    .then((data)=>{
       window.reloadPage();
   
       
    })
    
}
})


//toggle_task_to_list
var add_task_list=document.getElementById("task_to_list");
var add_task_list_input=document.getElementById("task_to_list_input");
add_task_list.addEventListener("click",function(){
    add_task_list_input.style.display="block";
})

var cancel_task_list=document.getElementById("cancel_task_list");
cancel_task_list.addEventListener("click",function(){
    add_task_list_input.style.display="none";
})

// add task to list
var save_task_list=document.getElementById("save_task_list");
save_task_list.addEventListener("click",function(){
  
     var task_list_content=document.getElementById("task_to_list_content").value;
     var list_id=document.getElementsByClassName("side_bar_active")[0].dataset.list_id;
     
     var url="/task_to_list/"
    fetch(url,{
        method:"post",
        headers:{
        'Content-Type':'application/json',
        'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({
            "list_id":list_id,
            "task_content":task_list_content
        })
        
    }).then((response)=>{
     
        return response.json()
    })
    .then((data)=>{
        getTasks(list_id);
        add_task_list_input.style.display="none";
       
    })
})

var profile_btn=document.getElementById("profile_icon");
profile_btn.addEventListener("click",function(){
    var profile_info_div=document.getElementById("profile_info");
    
    if( profile_info_div.style.display=="block") {
        profile_info_div.style.display="none";
    }
        
    else 
        profile_info_div.style.display="block";
})