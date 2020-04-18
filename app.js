


(function (){
    
    class User//all information about users 
    {
    
        constructor(nickname, email,password) {
            this.nick = nickname;
            this.email = email;
            this.password=password;
            this.id='user'+(Users.length+1);
            let role = this.MakeRole(nickname);
            this.role = role;
        
      }
    MakeRole(nickname){
        let role='';
        if(nickname==='Admin')
        {
            role +="Admin";
        }
        else
        {
            role+="User";
        }
        return role;
    }

}
 


class Admin extends User
{
    
    AddModel()
    {
       
    }

}


class Models
{

}

class Cars extends Models
{
    constructor() {
        
      }
}
//some global
let listGlobalArray={'user':Users=[],
                    'model':Models=[],
                    'car':Cars=[]}

let addForAdmin=document.querySelectorAll('.for-admin');
let hashName = window.location.hash.toString();
//check that input date is correct
function validateFormRegestration(nick,email,pass,passAgain)
{
    let testPass=true;
    for(let name in Users)
    {
        if(nick== Users[name].nick)
        {
            testPass=false;
            alert('This nickname exist');
            return testPass;
            
            
        }
    }
    for(let em in Users)
    {
        if(email==Users[em].email)
        {
            testPass=false;
            alert('This email has alrady used');
            return testPass;
            
           
        }
    }
    if(pass!==passAgain)
    {
        testPass=false;
        alert('Passwords don`t match');
        return testPass;
    }

    return testPass;

}

//regestration new user
function ForSubmit()
{
    let buttonRegestr = document.getElementById('Regestr');
    let youCanRegistr;
        buttonRegestr.onsubmit=function (){
            let nick=document.getElementById('nick').value;
            let email=document.getElementById('email').value;
            let password1=document.getElementById('pass').value;
            let password2=document.getElementById('passAgain').value; 
            youCanRegistr = validateFormRegestration(nick,email,password1,password2);
            if(youCanRegistr)
        {
            let userCreated = new User(nick,email,password1);
            alert('Registration was success');
            localStorage.setItem(userCreated.id,JSON.stringify(userCreated));
            Users.push(userCreated);  
            return false;
        }
    }
    
}
//fill arraies of data from local storge
function FillArrays(arrayToAdd,expr)
{
   
    let regUser = new RegExp(expr);
    console.log(regUser);
	for(let index in localStorage)
	{
		if (!localStorage.hasOwnProperty(index) || !index.match(regUser)) {
			continue; 
		  }
		  
          arrayToAdd.push(JSON.parse(localStorage.getItem(index)));
          
    }
    console.log(arrayToAdd);
}
//log in user
function LogIn(lognick,logpass)
{
    
    let exist=0;
    let logInDiv=document.getElementById('sectionRegestr');
    for(let itr in Users)
    {
        if(lognick==Users[itr].nick)
        {
            exist++;
            if(logpass==Users[itr].password)
            {
                
                logInUser = Users[itr];
                alert('Have a nice day');
                logInDiv.style.display='none';
                document.getElementById('mainBlock').style.display='';
                document.getElementById('userName').innerHTML=Users[itr].nick;
                break;

            }
            else
            {
                alert('Wrong password');
                
            }

        }
    }
    if(!exist)
    {
        alert('This user doesn`t exist');
       
    }


}

function LogInSubmit()
{
    let lgin = document.getElementById('LogIn');
    console.log('success');
    lgin.onsubmit=function(){
        let logpass=document.getElementById('logPass').value;
        let lognick=document.getElementById('logName').value;
        LogIn(lognick,logpass);
        return false;
    }
    
}

function changeForm()
{
    
    let formR=document.getElementById('Regestr');
    let formL=document.getElementById("LogIn");
    formL.style.display='none';
    formR.style.display='none';
    if(hashName =='#Regestr')
    {
         formR.style.display='';
         formL.style.display='none';
    }
    else
    {
        formL.style.display='';
        formR.style.display='none';
    }

}

function hideDOM()
{
    document.getElementById('Regestr').style.display='none';
    document.getElementById('mainBlock').style.display='none';
    for(let i=0;i<addForAdmin.length;i++)
    {
        addForAdmin[i].style.display='none'
    }
    
} 


//functions which should be call after the body is loaded
function WorkOnLoad()
{
    
    ForSubmit();
    LogInSubmit();
    hideDOM();
    for(expr in listGlobalArray)
    {
        FillArrays(listGlobalArray[expr],expr)
    }
    document.getElementById(hashName.slice(1)).style.display=''
    
}
//functions which should be call after the hash is chaged
function WorkOnHashChange()
{
    changeForm();
    
}

  //localStorage.clear();
    document.addEventListener("DOMContentLoaded",WorkOnLoad);
    window.onhashchange = WorkOnHashChange;
})();