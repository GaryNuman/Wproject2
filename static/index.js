    // Listen for DOM content to be loaded
    document.addEventListener('DOMContentLoaded', () => {

    //connect to thewebsocket
    var socket = io.connect(location.protocol + "//" + document.domain + ":" + location.port);

     //FIRST TIME VISIT
    // ask for display name (showing the form part of the html)
    if (!localStorage.getItem("name")||localStorage.getItem("name")===undefined){
        document.getElementById("new-name").style.display = "block";
        document.getElementById("disname").style.display = "none";
        document.getElementById("channels").style.display = "none";
        document.getElementById("change_name").style.display = "none";

        // By default, submit button is disabled
        document.querySelector('#submit').disabled = true;
        // Enable button only if there is text in the input field
        document.querySelector('#name').onkeyup = () => {
            if (document.querySelector('#name').value.length > 0)
                document.querySelector('#submit').disabled = false;
            else
                document.querySelector('#submit').disabled = true;
        };
        // Listen for submission of the #new-name form
        document.querySelector('#new-name').onsubmit = () =>{
            name = document.querySelector("#name").value;
            localStorage.setItem("name", name);
            // Greet the user
            disname.innerHTML = document.querySelector("#name").value;
        
        // Clear input field,hide form and disable button again
        document.querySelector('#name').value = '';
        document.querySelector('#submit').disabled = true;
        document.getElementById("disname").style.display = "inline-block";
        document.getElementById("new-name").style.display = "none";
        document.getElementById("channels").style.display = "block";
        // Stop form from submitting
        return false;
        }
    }

    //ALREADY HAS A DISPLAY NAME, Greet the user
        name = localStorage.getItem("name", name);
        disname.innerHTML = name

//TODO: logout
/*    // Listen for change_name 
        document.getElementById("change_name").addEventListener("click", function(){
        document.getElementById("new-name").style.display = "block";
        document.getElementById("disname").style.display = "none";
        document.getElementById("channels").style.display = "none";
        });*/

    //channel creation
        //by default disable the create button
        document.querySelector("#create").disabled = true;
        //enable create button if a channel is made
        document.querySelector('#channel').onkeyup = () => {
            if (document.querySelector('#channel').value.length > 0)
                document.querySelector('#create').disabled = false;
            else
                document.querySelector('#create').disabled = true;
        };

// TODO: only submit when channel does not exist yet

    // When connected get user input into the socket when clicked
    socket.on('connect', () => {
        //When "create" is clicked make a new button
        document.querySelector('#create').onclick = () => {
                const channelname = document.querySelector("#channel").value;
                socket.emit('create channel', {'channel': channelname});
            };
    });

    // When a new vote is announced, add to the unordered list
    socket.on('channel created', data => {
        const li = document.createElement('li');
        li.innerHTML = `${data.channel}`;
        document.querySelector('#channels-list').append(li);
                    
        // Clear input field and disable button again
        document.querySelector('#channel').value = '';
        document.querySelector('#create').disabled = true;
    });
});






