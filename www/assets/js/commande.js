
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
function get_id(){
    return window.location.href.split('?')[1].split('=')[1];
}

let news = document.getElementById('commande-tab').childNodes[1].cloneNode(true).cloneNode(true);
const cmd = new Commande();
const clients = new Client();
let current_commande = cmd.get(get_id());
            //  console.log(news.childNodes[19].childNodes[0].childNodes[1])
             console.log(current_commande)
            // news.childNodes[19].childNodes[0].childNodes[1].href = "commande.html?id="+i;
           news.childNodes[1].childNodes[0].childNodes[0].src = 'img/'+current_commande.categorie+'.jpg';
            news.childNodes[5].textContent = ''+current_commande.modele;
            news.childNodes[7].textContent = ''+current_commande.piece;
            
            news.childNodes[9].childNodes[0].textContent = ''+current_commande.status;
            news.childNodes[11].childNodes[0].textContent = ''+current_commande.created_at;
            news.childNodes[13].childNodes[0].textContent = ''+current_commande.livraison.split('-').reverse().join('-');
            news.childNodes[15].childNodes[0].textContent = ''+current_commande.prix+' FC';
            news.childNodes[17].childNodes[0].textContent = ''+clients.get(current_commande.client).nom
            news.childNodes[19].childNodes[0].setAttribute('data-id-commande', get_id());
            news.childNodes[21].childNodes[0].setAttribute('data-id-delete', get_id());
            news.childNodes[23].childNodes[0].setAttribute('data-id-update-commande', get_id());
            document.getElementById('commande-tab').innerHTML = ""
            document.getElementById('commande-tab').appendChild(news)



// update 


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
    





