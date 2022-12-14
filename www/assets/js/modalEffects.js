/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );
				let fermer = modal.querySelector('.md-fermer')

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md-show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md-setperspective' ) ); 
			}

			el.addEventListener( 'click', function( ev ) {
				
				classie.add( modal, 'md-show' );
				document.querySelector('.pcoded-main-container').classList.toggle('blur')
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );
				console.log(this.getAttribute("action"))
				if(this.hasAttribute('data-id-update')){
					data_client = clients.get(this.getAttribute('data-id-update'))
					
					document.modify_client.nom.value = data_client.nom;
					document.modify_client.telephone.value = data_client.telephone;
					document.modify_client.id.value = this.getAttribute('data-id-update');
					
				}
				if(this.hasAttribute('data-id-update-commande')){
					parse_commande(this.getAttribute('data-id-update-commande'));
					
					parse_client('update', this.getAttribute('data-id-update-commande'));
				}
				if(this.getAttribute('action')=="add-commande"){
					
					parse_client('add', null);
				}
				if(this.getAttribute("action")=="add-depense"){
					parse_depense("add");
				}
				if(this.getAttribute("action")=="modify-depense-1"){
					
					parse_depense("modify", this.getAttribute("identifiant"));
				}
				

				if( classie.has( el, 'md-setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				document.querySelector('.pcoded-main-container').classList.remove('blur')
				ev.stopPropagation();
				removeModalHandler();
			});
			fermer.addEventListener( 'click', function( ev ) {
				document.querySelector('.pcoded-main-container').classList.remove('blur')
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}

	init();

})();