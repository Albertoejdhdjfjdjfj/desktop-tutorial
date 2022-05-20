fetch('list.json')  
.then(  
  function(response) {  
    response.json().then(function(faker) {    
        filltable(faker);
    });  
  }  
);

function filltable(data){
 body=document.querySelector('body');
 table=document.body.querySelector('.onetable');
 table1=document.body.querySelector('.twotable');
     create_head(table,data);
     create_body(table,data);
     Delete(table,data);
     Edit(table,data);
     buildform(data);
     buildformbutton(data,table);
     managers=getManagersData(data);
     createTableManager(managers,table1);
     TableManager(managers,table1,data)
}

function create_head(table,data){
     let tr = document.createElement('tr');
      for (let key in data[1]) {
         let th = document.createElement('th');
         th.innerHTML = key;
         tr.append(th);
     }
     table.append(tr);
 }

 function create_body(table,data){
    data.forEach(element=>{
         tr=document.createElement('tr');

         td=document.createElement('td');
         td.append(element.Id);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.productName);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.quantity);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.price);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.producer);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.cайт);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.кассир);
         tr.appendChild(td);
         table.appendChild(tr);

         td=document.createElement('td');
         td.append(element.менеджер);
         tr.appendChild(td);
         table.appendChild(tr);
         
         td=document.createElement('div');
         tr.className='div_for_button';
         button1=document.createElement('button')/*.classList.add('buttondelete')*/;
         button1.classList.add('buttondelete');
         button1.innerHTML='Delete';
         button2=document.createElement('button');
         button2.classList.add('buttonedit');
         button2.innerHTML='Edit';
         td.append(button1)
         tr.appendChild(td);
         td.append(button2)
         tr.appendChild(td);
 });
}

function Delete(table,data){
 table.addEventListener("click",(e)=>{
     if(e.target.className!='buttondelete') return ;
     tr=(e.target.parentElement).parentElement;
     data.splice(tr.rowIndex-1,1)
     tr.remove();
     console.log(data);
    })
    console.log(data);
}

function buildform(data){
    form=document.querySelector('form');
    for(key in data[1]){
     input=document.createElement('input');
     input.setAttribute("value","  ");
     input.classList=key;
     legend=document.createElement('label');
     legend.innerHTML=key;
     form.appendChild(legend)
     form.appendChild(input)
     
    }
}

function buildformbutton(data,table){
    form=document.querySelector('form');
    button=document.querySelector('.buttoncreate');
    button.innerHTML='Create';
    button.addEventListener("click",()=>{
        tr=document.createElement('tr');
        elementdata= {
            "Id": document.querySelector('.Id').value,
            "productName": document.querySelector('.productName').value,
            "quantity": document.querySelector('.quantity').value,
            "price": document.querySelector('.price').value,
            "producer": document.querySelector('.producer').value,
            "cайт": document.querySelector('.cайт').value,
            "кассир": document.querySelector('.кассир').value,
            "менеджер": document.querySelector('.менеджер').value
        };

        inputall=document.querySelectorAll('input');
        inputall.innerHTML=  ' ';

      document.querySelectorAll('input').forEach(element =>{
            td=document.createElement('td');
            td.append(element.value);
            tr.appendChild(td);
        })
        data.push(elementdata)
        table=document.body.querySelector('table');
        table.appendChild(tr);
        td=document.createElement('div');
        tr.className='div_for_button'
         button1=document.createElement('button')/*.classList.add('buttondelete')*/;
         button1.classList.add('buttondelete');
         button1.innerHTML='Delete';
         button2=document.createElement('button');
         button2.classList.add('buttonedit');
         button2.innerHTML='Edit';
         td.append(button1)
         tr.appendChild(td);
         td.append(button2)
         tr.appendChild(td);
         console.log(data);
        })
    body=document.querySelector('body');
    body.appendChild(button);
    
}

function Edit(table,data){
    table.addEventListener("click",(e)=>{
        if(e.target.className!='buttonedit') return ;
        tr=(e.target.parentElement).parentElement;
        td=e.target.parentElement;
        tr.contentEditable = "true";
        lasttd=tr.lastChild;
        lasttd.contentEditable = "false"
        button=lasttd.lastChild;
        button.remove();
        button=document.createElement('button');
        button.innerHTML='Save';
        button.className='savebutton';
        td.appendChild(button);
    })

    table.addEventListener("click",(element)=>{
        if(element.target.className!='savebutton') return ;
        tr=(element.target.parentElement).parentElement;
        td=element.target.parentElement;
        tr.contentEditable = "false";
        button=lasttd.lastChild;
        button.remove();
        button=document.createElement('button');
        button.innerHTML='Edit';
        button.className='buttonedit';
        td.appendChild(button);
        elementdata= {
            "Id": tr.childNodes[0].innerHTML,
            "productName": tr.childNodes[1].innerHTML,
            "quantity": tr.childNodes[2].innerHTML,
            "price": tr.childNodes[3].innerHTML,
            "producer": tr.childNodes[4].innerHTML,
            "cайт": tr.childNodes[5].innerHTML,
            "кассир": tr.childNodes[6].innerHTML,
            "менеджер": tr.childNodes[7].innerHTML
        };
        data[tr.rowIndex-1]=elementdata;
        console.log(data);
    })

}

function getManagersData(data) {
    let managers = [];
    data.map(object => {
        let currentManager = object["менеджер"];
        let price = +object["price"];
        let quantity = +object["quantity"];
        let flag = false;
    managers.map((obj, index) => {
            if (obj["менеджер"] == currentManager) {
                obj["price"] += price;
                obj["quantity"] += quantity;
                flag = true;
            }
        });

        if (!flag) {
            let obj = {
                "менеджер": currentManager,
                "price": price,
                "quantity": quantity
            }
            managers.push(obj);
        }
    })

    return managers;
}

function createTableManager(managers,table){
    create_head(table,managers);
    managers.forEach(element=>{
        tr=document.createElement('tr');
        td.className='elment_to_second_table';

        td=document.createElement('td');
        td.className='elment_to_second_table';
        td.append(element.менеджер);
        tr.appendChild(td);
        table.appendChild(tr);

        td=document.createElement('td');
        td.className='elment_to_second_table';
        td.append(element.price);
        tr.appendChild(td);
        table.appendChild(tr);

        td=document.createElement('td');
        td.className='elment_to_second_table';
        td.append(element.quantity);
        tr.appendChild(td);
        table.appendChild(tr);
    });
}

function TableManager(managers,table,data){
    addEventListener("click",()=>{
        table.innerHTML='';
        managers=getManagersData(data);
        createTableManager(managers,table);
     })
}





 




