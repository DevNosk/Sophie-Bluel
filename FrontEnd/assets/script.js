const object_menu = document.getElementsByClassName('object-menu')[0];
let object_menu_items = document.getElementsByClassName('object');
let index_obj = 0;
call_api_categories();

async function call_api_categories() {
	const response = await fetch('http://localhost:5678/api/categories');
	const obj_data = await response.json();
	console.log(obj_data);

	// Sélectionner l'élément HTML avec l'id "portfolio"
	const portfolio = document.getElementById('portfolio');

	// Cette ligne crée un nouvel élément 'div' avec la classe 'object-menu' et sans contenu textuel
	const object_menu = createHTMLTag('div', 'object-menu', '');

	// Cette ligne ajoute l'élément 'object_menu' en tant qu'enfant de l'élément 'portfolio' existant dans le DOM
	portfolio.appendChild(object_menu);

	// Récupérer les éléments DOM à déplacer
	var objectMenu = document.querySelector('.object-menu');
	var gallery = document.querySelector('.gallery');

	// Insérer l'élément DOM objectMenu avant l'élément DOM gallery
	gallery.parentNode.insertBefore(objectMenu, gallery);

// Cette ligne crée un nouvel élément 'div' avec la classe 'object' et le texte 'Tous'
const object_menu_item = createHTMLTag('div', 'object', 'Tous');

// Cette ligne ajoute l'élément 'object_menu_item' en tant qu'enfant de l'élément 'object_menu' existant dans le DOM
object_menu.appendChild(object_menu_item);

// Cette boucle itère à travers un tableau 'obj_data' contenant des objets et crée un élément 'div' pour chaque objet
for (let i = 0; i < obj_data.length; i++) {

  // Cette ligne crée un nouvel élément 'div' avec la classe 'object' et le nom de l'objet actuel
  const object_menu_item = createHTMLTag('div', 'object', obj_data[i].name);

  // Cette ligne ajoute l'élément 'object_menu_item' en tant qu'enfant de l'élément 'object_menu' existant dans le DOM
  object_menu.appendChild(object_menu_item);
}

	//  Rapelle variable pour boucle
	object_menu_items = document.getElementsByClassName('object');

	// Boucle ajout event / parcours object menu
	for (let index = 0; index < object_menu_items.length; index++) {
		//Click event
		object_menu_items[index].addEventListener(
			'click',
			makeHighlightObjectFunction(object_menu_items, index),
		);
	}
}

function makeHighlightObjectFunction(object_menu_items, index) {
	return () => {
		//Supprimer a tous a chaque clique

		for (
			let object_index = 0;
			object_index < object_menu_items.length;
			object_index++
		) {
			object_menu_items[object_index].classList.remove('object-selected');
		}

		//Ajouter sur clique
		object_menu_items[index].classList.add('object-selected');
	};
}

function createHTMLTag(tag, classNames, innerText) {
	const element = document.createElement(tag);
	if (classNames) {
		element.classList.add(...classNames.split(' '));
	}
	if (innerText) {
		element.innerText = innerText;
	}
	return element;
}
