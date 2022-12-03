const memory = window.localStorage;

function mini_date(date){
    // console.log(date)
    let jour = date.getDate();
    let mois = date.getMonth()+1
    let annee = date.getFullYear()
    return jour+'/'+mois+'/'+annee
}

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
        document.getElementById('client-tab').innerHTML="";
         
        for(let i=this.clients.clients.length-1; i>=0; i--){
            
            let news = this.vue_client.cloneNode(true);
            news.childNodes[1].textContent = (i+1)+'. '+this.clients.clients[i].nom;
            news.childNodes[3].textContent = ''+this.clients.clients[i].genre;
            news.childNodes[5].textContent = ''+this.clients.clients[i].telephone;
            
            news.childNodes[7].childNodes[0].childNodes[0].href = 'client.html?id='+i;
            news.childNodes[9].childNodes[0].setAttribute('data-id', i);
            news.childNodes[11].childNodes[0].setAttribute('data-id-update', i);
            //console.log(news.childNodes[7].innerHTML)
            document.getElementById('client-tab').appendChild(news)
        }
        
    }
    
}

class Commande{
    constructor(){
        this.vue_commande = document.getElementById('commande-tab').childNodes[1].cloneNode(true);
        this.commandes =  memory.getItem('commandes')!=null ? JSON.parse(memory.getItem('commandes')): JSON.parse(init_memory('commandes', JSON.stringify({'commandes':[]})));
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
        
        memory.setItem('commandes', JSON.stringify({'commandes': all}));
        this.clients = JSON.parse(memory.getItem('commandes'))


    }
    addview(){
        // let element = document.getElementById('client-tab').childNodes[1].cloneNode(true)
        document.getElementById('commande-tab').innerHTML="";
          //console.log(this.clients.clients.length)
        for(let i=this.commandes.commandes.length-1; i>=0; i--){
            //console.log(this.clients.clients[i])
            let news = this.vue_commande.cloneNode(true);
           
           news.childNodes[1].childNodes[0].childNodes[0].src = 'img/'+this.commandes.commandes[i].categorie+'.jpg';
            news.childNodes[5].textContent = ''+this.commandes.commandes[i].modele;
            news.childNodes[7].textContent = ''+this.commandes.commandes[i].piece;
             
            news.childNodes[9].childNodes[0].textContent = ''+this.commandes.commandes[i].status;
            news.childNodes[11].childNodes[0].textContent = ''+this.commandes.commandes[i].created_at;
            news.childNodes[13].childNodes[0].textContent = ''+this.commandes.commandes[i].livraison.split('-').reverse().join('-');
            news.childNodes[15].childNodes[0].textContent = ''+this.commandes.commandes[i].prix+' FC';
            news.childNodes[17].childNodes[0].textContent = ''+clients.get(this.commandes.commandes[i].client).nom
            news.childNodes[19].childNodes[0].setAttribute('data-id-commande', i);
            news.childNodes[21].childNodes[0].setAttribute('data-id-delete', i);
            news.childNodes[23].childNodes[0].setAttribute('data-id-update-commande', i);
            //console.log(news.childNodes[7].innerHTML)
            document.getElementById('commande-tab').appendChild(news)
            
        }
        
    }
    
}


class Depense{
    constructor(){
        this.vue_depense = document.getElementById('depense-tab').childNodes[1].cloneNode(true);
        this.depenses =  memory.getItem('depenses')!=null ? JSON.parse(memory.getItem('depenses')): JSON.parse(init_memory('depenses', JSON.stringify({'depenses':[]})));
    }
    add(value){
        let old = this.depenses;
        
        old.depenses.push(value)
        memory.setItem('depenses', JSON.stringify(old));
        this.depenses = JSON.parse(memory.getItem('depenses'))
    }
    search(term, contrainte){
        if(contrainte == "beneficiaire"){
        return this.depenses.depenses.filter(most_depense=>most_depense.beneficiaire.search(term)!=-1)
        
    }else{
        return this.depenses.depenses.filter(most_depense=>most_depense.motif.search(term)!=-1)
    }
    }
    update(value, id){
        
        for(let i=0; i<this.depenses.depenses.length; i++){
            if(parseInt(id)==i){
                this.depenses.depenses[id]=value;
            }
        }
        let old = this.depenses;
        memory.setItem('depenses', JSON.stringify(old));
        

        
    }
    get(id){
        for(let i=0; i<this.depenses.depenses.length; i++){
            if(parseInt(id)==i){
                return this.depenses.depenses[id];
            }
        }
        return false;
    }
    remove(id){
        let all = []
        
            //  console.log(this.clients.clients)
        for(let i=0; i<this.depenses.depenses.length; i++){
            console.log(parseInt(id)!=i)
            if(parseInt(id)!=i){
               
                all.push(this.depenses.depenses[i]);
            }
        }
        
        memory.setItem('depenses', JSON.stringify({'depenses': all}));
        this.clients = JSON.parse(memory.getItem('depenses'))


    }
    addview(){
        let element = document.getElementById('depense-tab').childNodes[1].cloneNode(true)
        document.getElementById('depense-tab').innerHTML="";
        let doc = document.getElementById('depense-tab')
        console.log(this.depenses.depenses)
        let order_day = {date:[], data:[]}
        this.depenses.depenses.forEach((data)=>{
            // console.log(mini_date(new Date(data.created_at)))
            if(!order_day.date.some(element =>mini_date(new Date(element))==mini_date(new Date(data.created_at)))){
                order_day.date.push(data.created_at)
            }
            try {
                order_day.data[order_day.date.findIndex(element=>mini_date(new Date(element==data.created_at)))].push(data)
            } catch (error) {
                order_day.data[order_day.date.findIndex(element=>mini_date(new Date(element))==mini_date(new Date(data.created_at)))] = [data];  
            }   
           
        })
        console.log(order_day)
        for(let i=0; i<order_day.date.length; i++){
            let el = element.cloneNode(true);
            // console.log(order_day.data)
            el.childNodes[5].textContent = order_day.data[i].reduce((e1, e2)=>e1+parseInt(e2.montant.replace(",", "").replace(".", ""))/100, 0) +" FC"
            el.childNodes[3].textContent = order_day.data[i].length
            console.log(order_day.date)
            el.childNodes[1].textContent = mini_date(new Date(order_day.date[i]))

            doc.appendChild(el)
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
 function parse_client(form, target){
    const container_client_const = document.add_commande.client.childNodes[1].cloneNode(true);
     let container_client = container_client_const.cloneNode(true);
     if(form=='add'){
         document.add_commande.client.innerHTML = "";
         
     }else{
         document.modify_commande.client.innerHTML = "";
        
     }
 
     
     for(let i=clients.clients.clients.length-1; i>=0; i--){
         console.log(clients.clients.clients[i])
         container_client = container_client.cloneNode(true);
         container_client.value = i;
         container_client.textContent = clients.clients.clients[i].nom;
         if(target!=null){
             if(target==i){
                 console.log(target)
                 container_client.setAttribute('selected', 'selected')
             }
         }
         if(form=='add'){
             
             document.add_commande.client.appendChild(container_client)   
         }else{
             
             document.modify_commande.client.appendChild(container_client)
         }
         
 
     }
     console.log(container_client)
     
 }
 
 function init_memory(key, value){
 memory.setItem(key, value)
 return memory.getItem(key);
 }

function parse_depense(categorie){

}