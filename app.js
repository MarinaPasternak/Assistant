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
 

class Model
{
    constructor(label,img,liters) {
        this.label = label;
        this.pictAdress = 'img/'+img;
        this.liters=liters
        this.id='model'+(Models.length+1);
  }

}

class Car
{
    constructor(patrol,userId,modelId) {
        this.id='car'+(Cars.length+1);
        this.patrols=patrol;
        this.userId=userId;
        this.modelId=modelId;
    }
}

class dataForChart 
{
    constructor(spendliter,userId,modelId) {
        this.id='data'+(Data.length+1);
        this.spendliter=spendliter;
        this.userId=userId;
        this.modelId=modelId;
      }
}

class Event
{
    constructor(notes,time,date,userId) {
        this.id='event'+(Evants.length+1);
        this.date=date;
        this.time=time;
        this.userId=userId;
        this.notes=notes;
      }
}

class Comment
{
    constructor(notes,userId) {
        this.id='coment'+(Comments.length+1);
        this.notes=notes;
        this.userId=userId;
      }
}
//some global
(function (){
let listGlobalArray={'user':Users=[],
                    'model':Models=[],
                    'car':Cars=[],
                    'data':Data=[],
                    'event':Evants=[],
                'coment':Comments=[]}
                  
let currUser;
let addForAdmin=document.querySelectorAll('.for-admin');
//check that input date is correct

document.getElementById('AddNewModel').onsubmit=function()
   {
       let img = document.getElementById('img').value;
       let label =document.getElementById('label').value;
       let liters=document.getElementById('liters').value;
       let newNodel= new Model(label,img,liters);
       localStorage.setItem(newNodel.id,JSON.stringify(newNodel));
       Models.push(newNodel);
       FillArrays('model',Models);
       addSelect();
       return false;
   }

  document.getElementById('AddNewCar').onsubmit=function()
  {
      let label = document.getElementById('modeltype').value;
      let petrol=document.getElementById('petrol').value;
      let userId=currUser.id;
      let modelId;
      for(itr in Models)
      {
        if(label==Models[itr].label)
        {
            modelId=Models[itr].id;
        }
      }
      let car = new Car(petrol,userId,modelId);
       localStorage.setItem(car.id,JSON.stringify(car));
       Cars.push(car); 
       makeCarList();
       return false; 
  }

  document.getElementById('AddComent').onsubmit=function()
  {
    let massage =document.getElementById('massage').value;
    let post = new Comment(massage,currUser.id);
    localStorage.setItem(post.id,JSON.stringify(post));
    Comments.push(post); 
    FillArrays('coment',Comments);
    makeChat()
    return false;

  }

  document.getElementById('addDateTime').onsubmit=function()
  {
        let date=document.getElementById('date').value;
        let time=document.getElementById('time').value;
        let notes=document.getElementById('event').value;
        let userId=currUser.id;
        let evet=new Event(notes,time,date,userId);
        localStorage.setItem(evet.id,JSON.stringify(evet));
        Evants.push(evet); 
        FillArrays('event',Evants);
        return false;

  }


function makeCarList()
{
    let div =document.getElementById('cars');
    div.innerHTML='';
    for(i=0;i<Cars.length;i++)
    {
        if(Cars[i].userId==currUser.id)
        {
            for(let j=0;j<Models.length;j++)
            {
                if(Models[j].id==Cars[i].modelId)
                {
                    let img =document.createElement('img');
                    img.src='img/load.png';
                    img.className='rot';
                    img.style.width='100px';
                    img.style.height='100px';
                    setTimeout(function(){
                        img.className='';
                        img.style.width='';
                        img.style.height='';
                        img.src=Models[j].pictAdress;
                        img.onerror = function() {
                            img.src="img/unload.jpg";
                        };
                    }, 6000);
                    let figure=document.createElement('figure');
                    let caption=document.createElement('figcaption');
                    let p1=document.createElement('p');
                    let p2=document.createElement('p');
                    let btn1=document.createElement('button');
                    let btn2=document.createElement('button');
                    let divBtn=document.createElement('div');
                    let a1=document.createElement('a');
                    let a2=document.createElement('a');
                    a1.href='#ChangInfo';
                    a1.innerHTML='Change';
                    btn1.appendChild(a1);
                    a2.href='#Charts';
                    a2.innerHTML='Charts';
                    btn2.appendChild(a2);
                    divBtn.appendChild(btn1);
                    divBtn.appendChild(btn2);
                    divBtn.className='buttons';
                    figure.appendChild(img);
                    p1.innerHTML=Models[j].label
                    p2.innerHTML=Models[j].liters+' l'
                    caption.appendChild(p1)
                    caption.appendChild(p2)
                    caption.appendChild(divBtn);
                    figure.appendChild(caption);
                    div.appendChild(figure);
                    
                }
            }
        }
        
    }
    

}

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
            if(youCanRegistr==true)
        {
            let userCreated = new User(nick,email,password1);
            alert('Registration was success');
            localStorage.setItem(userCreated.id,JSON.stringify(userCreated));
            Users.push(userCreated);  
        }
        else
        {
            document.getElementById('Regetr').style.display='';
            document.getElementById('LogIn').style.display='none';
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
                currUser=Users[itr];
                console.log(currUser);
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
    lgin.onsubmit=function(){
        let logpass=document.getElementById('logPass').value;
        let lognick=document.getElementById('logName').value;
        LogIn(lognick,logpass);
        showForAdmin();
        makeCarList();
        makeChat();
        getEvents();
        return false;
    }
    
}


function changeForm()
{
    
    let formRegestr=document.querySelectorAll(".forms form");
    let btnChange=document.querySelectorAll(".forms a");
    btnChange[0].onclick=function()
    {
        formRegestr[1].style.display='';
        formRegestr[0].style.display='none';
    }
    btnChange[1].onclick=function()
    {
        formRegestr[0].style.display='';
        formRegestr[1].style.display='none';
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

function showForAdmin()
{
    if(currUser.role=='Admin')
    for(let i=0;i<addForAdmin.length;i++)
    {
        addForAdmin[i].style.display='';
    }
} 

function menu()
{
    document.getElementsByClassName('arrow-scroll')[0].style.display=''
    document.getElementById('menu').style.display='none'
    document.getElementById('btnMenu').addEventListener('click',function(){
        let showHide=document.getElementById('menu').style.display
        if(showHide=='none')
        {
            document.getElementById('menu').style.display=''
            document.getElementsByClassName('arrow-scroll')[0].style.display='none'
        }
        else
        {
            document.getElementById('menu').style.display='none'
            document.getElementsByClassName('arrow-scroll')[0].style.display=''
        }

    })
}


function addSelect()
{
    
    let sectionLabel=document.getElementById('modeltype');
    sectionLabel.innerHTML='';
    for(let i=0;i<Models.length;i++)
        {
            let option=document.createElement('option');
            option.innerHTML=Models[i].label;
            console.log(Models[i].label);
            sectionLabel.appendChild(option);
        }
    
}

function makeChat()
{
    let div = document.getElementById('customChat');
    div.innerHTML='';
    for(let i=0;i<Comments.length;i++)
    {
        let divMassage=document.createElement('div');
        let massage=document.createElement('p');
        let nick=document.createElement('span');
        for(let j=0;j<Users.length;j++)
        {
            if(Users[j].id==Comments[i].userId)
            {
                 nick.innerHTML=Users[j].nick;
            }
            
            
        }
        massage.innerHTML=Comments[i].notes;
        if(currUser.id==Comments[i].userId)
        {
            divMassage.className='massage darker';
            nick.className='name-right';
            divMassage.appendChild(nick);
            divMassage.appendChild(massage); 
        }
        else
        {
            divMassage.className='massage';
            nick.className='name-left';
            divMassage.appendChild(nick);
            divMassage.appendChild(massage);
        }
        div.appendChild(divMassage)
    }
   
}

function getEvents()
{
    let year=document.getElementById('year').getAttribute("yearId");
    let mounth=document.getElementById('mounth').getAttribute("miunthId");
    let dateInarray;
    let li=document.querySelectorAll('.days li');
    for(let i=0;i<Evants.length;i++)
    {
        if(Evants[i].userId=currUser.id)
        {
            dateInarray=(Evants[i].date).split('-');
            if(dateInarray[0]==year && dateInarray[1]-1==mounth)
            {
                for(let j=0;j<li.length;j++)
                {
                    
                    if(li[j].getAttribute("day")==+dateInarray[2])
                        {
                            li[j].setAttribute('class','active');
                        }   
                }
            }
        }
    }

}

function getWeekDay(date) {
    let days = ['Mo','Tu','We','Th','Fr','Sa','Su'];
    return days[date.getDay()];
}

function numDays(currentYear,currMounth,ulDays)
{
    let days = ['Mo','Tu','We','Th','Fr','Sa','Su'];
    let dayOfFirst = new Date(currentYear, currMounth, 1);
    let startWeekDay=getWeekDay(dayOfFirst);
    let month={
        'January':30,
        'February':28,
        'March':31,
        'April':30,
        'May':31,
        'June':30, 
        'July': 31, 
        'August': 31, 
        'September': 30, 
        'October': 31, 
        'November': 30, 
        'December': 31
    }
    let mon=Object.keys(month);
    for(let i=0;i<days.length;i++)
    {
        let li=document.createElement('li')
        li.innerHTML=days[i];
        li.setAttribute('day',0)
        ulDays.appendChild(li)
    }
    for(let i=1;i<days.indexOf(startWeekDay);i++)
    {
        let li=document.createElement('li')
        li.innerHTML=''
        li.setAttribute('day',0)
        ulDays.appendChild(li)
    }
    for(let i=1;i<month[mon[currMounth]]+1;i++)
    {
        let li=document.createElement('li')
        li.innerHTML=i;
        li.setAttribute('day',i)
        ulDays.appendChild(li)
    }
    return ulDays
}

class calendar extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        let mon=['January','February','March','April','May',
        'June','July','August','September','October','November','December'];
        let currantData=new Date();
        let currentYear=currantData.getFullYear();
        let currMounth=currantData.getMonth();
        const currMonconst=currantData.getMonth();
        const currYearconst=currantData.getFullYear();
        let back = document.createElement('span');
        let backArrow=document.createElement('button');
        let forwardArrow=document.createElement('button');
        let divBack=document.createElement('div');
        let mounth=document.createElement('p');
        let year=document.createElement('p');
        let divCalendar=document.createElement('div');
        let ulDays=document.createElement('ul');
       

        divCalendar.setAttribute('class','date');
        year.setAttribute('id','year');
        year.setAttribute('yearid',currentYear);
        mounth.setAttribute('miunthId',currMounth);
        mounth.setAttribute('id','mounth');
        ulDays.setAttribute('class','days');
        back.setAttribute('class','back');
        backArrow.innerHTML='&lt;';
        backArrow.style.visibility = "hidden";
        forwardArrow.innerHTML='&gt;'
        mounth.innerHTML=mon[currMounth];
        year.innerHTML=currentYear;
        ulDays=numDays(currentYear,currMounth,ulDays);

        forwardArrow.onclick=function(){
            currMounth=currMounth+1
            backArrow.style.visibility='visible';
            if(currMounth==12)
            {
                currMounth=0;
                currentYear=currentYear+1
            }
            ulDays.innerHTML = "";
            ulDays=numDays(currentYear,currMounth,ulDays);
            mounth.innerHTML=mon[currMounth];
            mounth.setAttribute('miunthId',currMounth);
            year.setAttribute('yearid',currentYear);
            getEvents();
            year.innerHTML=currentYear;
        }

        backArrow.onclick=function(){
            currMounth=currMounth-1
            if(currMounth==0)
            {
                monthToMove=11;
                currentYear=currentYear-1
            }
            if(currMonconst==currMounth &&currYearconst==currentYear)
            {
                backArrow.style.visibility = "hidden";
            }
            ulDays.innerHTML = "";
            ulDays=numDays(currentYear,currMounth,ulDays);
            mounth.innerHTML=mon[currMounth];
            mounth.setAttribute('miunthId',currMounth);
            year.setAttribute('yearid',currentYear);
            getEvents();
            year.innerHTML=currentYear;
        }

        divCalendar.appendChild(ulDays);
        back.appendChild(backArrow)
        back.appendChild(mounth)
        back.appendChild(year)
        back.appendChild(forwardArrow)
        divBack.append(back)
        this.append(divBack);
        this.append(divCalendar);
        
        
    }
 }

 
 customElements.define('new-calendar', calendar);
//functions which should be call after the body is loaded
function WorkOnLoad()
{
    
    ForSubmit();
    LogInSubmit();
    hideDOM();
    menu();
    changeForm();
    for(expr in listGlobalArray)
    {
        FillArrays(listGlobalArray[expr],expr)
    }
    addSelect();
    
}

    document.addEventListener("DOMContentLoaded",WorkOnLoad);
})();




