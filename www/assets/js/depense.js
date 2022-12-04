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
  
 
  
  const depenses = new Depense()
  depenses.addview(window.location.href.split("?")[1].split("=")[1])
  document.querySelector(".page-header-title").childNodes[1].textContent = "Tableau de Bord Depense "+mini_date(new Date(parseInt(window.location.href.split("?")[1].split("=")[1])))
  
document.querySelectorAll("[action-delete]").forEach((el)=>{
    let identifiant = el.getAttribute("action-delete");
    el.addEventListener("click", function(e){
        e.preventDefault();
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
                depenses.delete(identifiant);
              Swal.fire(
                'Supprimé!',
                'la dépénse a été supprimé.',
                'success'
              )
              setTimeout(function(){
                window.location.reload()
            }, 2000)
            }
            
          })
    })
})

document.modify_depense.addEventListener("submit", function(e){
    // alert("wee")
    e.preventDefault();
    let nom = this.nom.value;
    let motif = this.motif.value;
    let montant = this.montant.value;
    console.log(depenses.depenses)
    for(let i=0; i<depenses.depenses.depenses.length; i++){
        //console.log(depenses.depenses.depenses[i].created_at)
        if(depenses.depenses.depenses[i].created_at == this.created_at.value){
            depenses.update({nom:nom, motif:motif, montant:montant, created_at:depenses.depenses.depenses[i].created_at}, i);
            message_succeed('depense modifié!');
            break;
        }
    }
})