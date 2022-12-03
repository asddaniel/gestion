
function iteratorObjectForm(data){
  let iteres = {};
  
  for(let i=0; i<data.elements.length; i++){
    if(data.elements[i].type!="submit"){

    
      iteres[data.elements[i].name]=data.elements[i].value;
      
    }
  }
  return iteres;
}

function message_succeed(message){
  let reussite =  new Promise(function(resolve, reject){
    Swal.fire(
        'Effectué',
        message,
        'success');
        setTimeout(function(){
            resolve();
        }, 2000)
        

      
      })
      reussite.then(function(e){
        window.location.reload()
      })
}
const clients = new Client();
clients.addview()
const commandes = new Commande();
commandes.addview()

const depenses = new Depense()
depenses.addview()

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
       message_succeed('Commande enregistré!');
       
        
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
    
    document.add_depense.addEventListener("submit", function(e){
      e.preventDefault();
      let data = iteratorObjectForm(this);
      data.created_at = Date.now();
    depenses.add(data);
    message_succeed('depense enregistré !')
      
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
    let all_client = clients.clients.clients;
    
    let commande_get = commandes.search(this.value);
    document.querySelector('.search-client').innerHTML = '';
    document.querySelector('.search-commande').innerHTML = '';
    for(let i=0; i<all_client.length; i++){
        console.log(client_get.includes(all_client[i]))
        if(client_get.includes(all_client[i])){
            console.log(client_get.includes(all_client[i]))
        
        let c_client = client_container.cloneNode(true);
        c_client.setAttribute('href', 'client.html?id='+i)
        c_client.getElementsByTagName('h3')[0].textContent = all_client[i].nom;
        
    document.querySelector('.search-client').appendChild(c_client)
        }
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
   // alert(window.location)
   let id = window.location.href.split('?')[1].split('=')[1];
   document.getElementById('client-name').textContent = clients.get(id).nom
   console.log(id)
}
