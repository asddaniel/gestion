'use strict';

const memory = window.localStorage;
let global_commande = []
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
    search(term){
        return this.clients.clients.filter(most_client=>most_client.nom.search(term)!=-1)
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
        let id = window.location.href.split('?')[1].split('=')[1];
        document.getElementById('client-tab').parentNode.innerHTML="";
          console.log(this.clients.clients.length)
        document.querySelector('.client-numero').textContent = this.get(id).telephone;
        document.querySelector('.client-sexe').textContent = this.get(id).genre
        
    }
    
}

class Commande{
    
    constructor(){
        this.vue_commande = document.getElementById('commande-tab').childNodes[1].cloneNode(true);
        const temp = JSON.parse(memory.getItem('commandes'));
        console.log(temp.commandes)
        temp.commandes.commandes = temp.commandes.map((e)=>{
            const d = e.client; 
            e.client = d;
            return e;
        })
        this.commandes =  temp
        console.log(this.commandes )
    }
    add(value){
        let old = this.commandes;
        old.commandes.push(value)
        memory.setItem('commandes', JSON.stringify(old));
        this.commandes = JSON.parse(memory.getItem('commandes'))
    }
    search(term){
        return this.commandes.commandes.filter(most_commande=>most_commande.modele.search(term)!=-1)
    }
    update(value, id){
        
        for(let i=0; i<this.commandes.commandes.length; i++){
            if(parseInt(id)==i){
                this.commandes.commandes[id]=value;
            }
        }
        let old = this.commandes;
        memory.setItem('commandes', JSON.stringify(old));
        

        
    }
    get(id){
        for(let i=0; i<this.commandes.commandes.length; i++){
            if(parseInt(id)==i){
                return this.commandes.commandes[id];
            }
        }
        return false;
    }
    remove(id){
        let all = []
        
            //  console.log(this.clients.clients)
        for(let i=0; i<this.commandes.commandes.length; i++){
            console.log(parseInt(id)!=i)
            if(parseInt(id)!=i){
               
                all.push(this.commandes.commandes[i]);
            }
        }
        console.log(all)
        memory.setItem('commandes', JSON.stringify({'commandes': all}));
        this.commandes = JSON.parse(memory.getItem('commandes'))


    }
    addview(){
        document.getElementById('commande-tab').innerHTML="";
        
        let all_commandes = [... this.commandes.commandes.filter(com=>com.client ==window.location.href.split('?')[1].split('=')[1])];
        
        for(let i=all_commandes.length-1; i>=0; i--){
         
            let news = this.vue_commande.cloneNode(true);
           
           news.childNodes[1].childNodes[0].childNodes[0].src = 'img/'+all_commandes[i].categorie+'.jpg';
            news.childNodes[5].textContent = ''+all_commandes[i].modele;
            news.childNodes[7].textContent = ''+all_commandes[i].piece;
             
            news.childNodes[9].childNodes[0].textContent = ''+all_commandes[i].status;
            news.childNodes[11].childNodes[0].textContent = ''+all_commandes[i].created_at;
            news.childNodes[13].childNodes[0].textContent = ''+all_commandes[i].livraison.split('-').reverse().join('-');
            news.childNodes[15].childNodes[0].textContent = ''+all_commandes[i].prix+' FC';
            news.childNodes[17].childNodes[0].setAttribute('data-id-commande', i);
            news.childNodes[19].childNodes[0].setAttribute('data-id-delete', i);
            news.childNodes[21].childNodes[0].setAttribute('data-id-update-commande', i);
            //console.log(news.childNodes[7].innerHTML)
            document.getElementById('commande-tab').appendChild(news)
           
        }
        
    }
    
}

function parse_commande(id){
   let  commande = commandes.get(id)
    let form_commande = document.modify_commande;
    form_commande.modele.value = commande.modele;
    form_commande.piece.value = commande.piece;
    form_commande.categorie.value = commande.categorie
    form_commande.prix.value = commande.prix;
    form_commande.livraison.value = commande.livraison
    form_commande.id_commande.value = id;
    form_commande.id_commande.setAttribute('created_at', commande.created_at);
}
function parse_client(){
    let container_client = document.add_commande.client.childNodes[1].cloneNode(true);
    document.add_commande.client.innerHTML = "";
    
    for(let i=0; i<clients.clients.clients.length; i++){
        container_client = container_client.cloneNode(true);
        container_client.value = i;
        container_client.textContent = clients.clients.clients[i].nom;
        document.add_commande.client.appendChild(container_client)

    }
    console.log(container_client)
    
}

function init_memory(key, value){
memory.setItem(key, value)
return memory.getItem(key);
}
function add_propery(objet){
    
}

const clients = new Client();
clients.addview()
const commandes = new Commande();
commandes.addview()

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
        'Client modifié!',
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
            if(this.hasAttribute('data-id-delete')){

                let identifiant  = this.getAttribute('data-id-delete')
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
                        commandes.remove(identifiant);
                      Swal.fire(
                        'Supprimé!',
                        'la commande a été supprimé.',
                        'success'
                      )
                      setTimeout(function(){
                        window.location.reload()
                    }, 2000)
                    }
                    
                  })

            }else{            
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
            }
            //alert(this.getAttribute('data-id'))
        })
    }

    //ajout des commandes 

    document.add_commande.addEventListener('submit', function(e){
        e.preventDefault();
        console.log(this.elements)
        let commande={};
        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].type!='submit'){
                let named = this.elements[i].name
                console.log(this.elements[named])
               commande[this.elements[i].name]=this.elements[i].value;
            }
            
        }
        let dat = new Date()
        commande['created_at'] = dat.getDate()+'/'+dat.getMonth()+'/'+dat.getFullYear()
        commandes.add(commande)
       let reussite =  new Promise(function(resolve, reject){
        Swal.fire(
            'Effectué',
            'Commande enregistré!',
            'success');
            setTimeout(function(){
                resolve();
            }, 2000)
            

          
          })
          reussite.then(function(e){
            window.location.reload()
          })
       
        
    })

     //modification des commandes 

     document.modify_commande.addEventListener('submit', function(e){
        e.preventDefault();
        console.log(this.elements)
        let commande={};
        for(let i=0; i<this.elements.length; i++){
            if(this.elements[i].type!='submit' && this.elements[i].name!="id_commande"){
                let named = this.elements[i].name
                console.log(this.elements[named])
               commande[this.elements[i].name]=this.elements[i].value;
            }
            
        }
        let dat = new Date()
        commande['created_at'] = this.id_commande.getAttribute('created_at');
        commandes.update(commande, this.id_commande.value)
       let reussite =  new Promise(function(resolve, reject){
        Swal.fire(
            'Effectué',
            'Commande modifié!',
            'success');
            setTimeout(function(){
                resolve();
            }, 2000)
            

          
          })
          reussite.then(function(e){
            window.location.reload()
          })
       
        
    })
}
let client_container = null;
let commande_container = null;
document.querySelector('#research').addEventListener('input', function(e){
    e.preventDefault();
    if(client_container==null){
         client_container = document.querySelector('.search-client').childNodes[1].cloneNode(true)
         commande_container = document.querySelector('.search-commande').childNodes[1].cloneNode(true)
    }
    
   
    
    let client_get = clients.search(this.value);
    let commande_get = commandes.search(this.value);
    document.querySelector('.search-client').innerHTML = '';
    document.querySelector('.search-commande').innerHTML = '';
    for(let i=0; i<client_get.length; i++){
        let c_client = client_container.cloneNode(true);
        c_client.setAttribute('href', 'client.html?id='+i)
        c_client.getElementsByTagName('h3')[0].textContent = client_get[i].nom;
        
    document.querySelector('.search-client').appendChild(c_client)
    }
    for(let i=0; i<commande_get.length; i++){
        let c_commande = commande_container.cloneNode(true);
        c_commande.setAttribute('href', 'commande.html?id='+i)
        console.log(commande_get)
        c_commande.getElementsByTagName('h3')[0].textContent = commande_get[i].modele;
        
    document.querySelector('.search-commande').appendChild(c_commande)
    }
    
    

})
if(document.getElementById('client-name')){
   
   let id = window.location.href.split('?')[1].split('=')[1];
   document.getElementById('client-name').textContent = clients.get(id).nom
   console.log(id)
}