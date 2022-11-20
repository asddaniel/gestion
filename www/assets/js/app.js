const memory = window.localStorage;
class Client{
    constructor(){
        this.vue_client = document.getElementById('client-tab').childNodes[1].cloneNode(true);
        this.clients =  memory.getItem('clients')!=null ? JSON.parse(memory.getItem('clients')): JSON.parse(init_memory('clients', JSON.stringify({'clients':[]})));
    }
    add(value){
        let old = this.clients;
        old.clients.push(value)
        memory.setItem('clients', JSON.stringify(old));
        this.clients = JSON.parse(memory.getItem('clients'))
    }
    update(value, id){
        
        for(let i=0; i<this.clients.clients.length; i++){
            if(parseInt(id)==i){
                this.clients.clients[id]=value;
            }
        }
        let old = this.clients;
        memory.setItem('clients', JSON.stringify(old));
        

        
    }
    get(id){
        for(let i=0; i<this.clients.clients.length; i++){
            if(parseInt(id)==i){
                return this.clients.clients[id];
            }
        }
        return false;
    }
    remove(id){
        let all = []
        
            //  console.log(this.clients.clients)
        for(let i=0; i<this.clients.clients.length; i++){
            console.log(parseInt(id)!=i)
            if(parseInt(id)!=i){
               
                all.push(this.clients.clients[i]);
            }
        }
        console.log(all)
        memory.setItem('clients', JSON.stringify({'clients': all}));
        this.clients = JSON.parse(memory.getItem('clients'))


    }
    addview(){
        // let element = document.getElementById('client-tab').childNodes[1].cloneNode(true)
        document.getElementById('client-tab').innerHTML="";
          console.log(this.clients.clients.length)
        for(let i=this.clients.clients.length-1; i>=0; i--){
            console.log(this.clients.clients[i])
            let news = this.vue_client.cloneNode(true);
            news.childNodes[1].textContent = (i+1)+'. '+this.clients.clients[i].nom;
            news.childNodes[3].textContent = ''+this.clients.clients[i].genre;
            news.childNodes[5].textContent = ''+this.clients.clients[i].telephone;
            console.log(news.childNodes[9].childNodes)
            news.childNodes[9].childNodes[0].setAttribute('data-id', i);
            news.childNodes[11].childNodes[0].setAttribute('data-id-update', i);
            //console.log(news.childNodes[7].innerHTML)
            document.getElementById('client-tab').appendChild(news)
        }
        
    }
    
}
function init_memory(key, value){
memory.setItem(key, value)
return memory.getItem(key);
}
function add_propery(objet){
    
}

const clients = new Client();
clients.addview()

//alert(JSON.parse(clients))


if(document.add_client){
    document.add_client.addEventListener('submit', function(e){
        e.preventDefault();
        console.log(this.elements)
        let client={};
        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].type!='submit'){
                let named = this.elements[i].name
                console.log(this.elements[named])
               client[this.elements[i].name]=this.elements[named].value;
            }
            
        }
        clients.add(client)
       let reussite =  new Promise(function(resolve, reject){
        Swal.fire(
            'Effectué',
            'Client enregistré!',
            'success');
            setTimeout(function(){
                resolve();
            }, 2000)
            

          
          })
          reussite.then(function(e){
            window.location.reload()
          })
       
        
    })
// update 

document.modify_client.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(this.elements)
    let client={};
    for(let i=0; i<this.elements.length; i++){
        if(this.elements[i].type!='submit' && this.elements[i].name!='id'){
            let named = this.elements[i].name
            console.log(this.elements[named])
           client[this.elements[i].name]=this.elements[named].value;
        }
        
    }
    clients.update(client, this.id.value)
   let reussite =  new Promise(function(resolve, reject){
    Swal.fire(
        'Effectué',
        'Client enregistré!',
        'success');
        setTimeout(function(){
            resolve();
        }, 2000)
        

      
      })
      reussite.then(function(e){
        window.location.reload()
      })
   
    
})





    let action_delete = document.querySelectorAll('.action-delete');
    for(let i=0; i<action_delete.length; i++){
        action_delete[i].addEventListener('click', function(e){
            e.preventDefault();
            let identifiant  = this.getAttribute('data-id')
            Swal.fire({
                title: 'Etes-vous sur?',
                text: "Cet action est irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'annuler',
                confirmButtonText: 'oui, supprimer!'
              }).then((result) => {
                if (result.isConfirmed) {
                    clients.remove(identifiant);
                  Swal.fire(
                    'Supprimé!',
                    'le Client a été supprimé.',
                    'success'
                  )
                  setTimeout(function(){
                    window.location.reload()
                }, 2000)
                }
                
              })
            //alert(this.getAttribute('data-id'))
        })
    }
}