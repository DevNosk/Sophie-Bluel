const portfolio = document.getElementById('portfolio');
const object_menu = createHTMLTag('div', 'object-menu', '');
portfolio.appendChild(object_menu);

const objectMenu = document.querySelector('.object-menu');
const gallery = document.querySelector('.gallery');
gallery.parentNode.insertBefore(objectMenu, gallery);

const object_menu_items = [];

const object_menu_item_all = createHTMLTag('div', 'object', 'Tous');
object_menu.appendChild(object_menu_item_all);
object_menu_items.push(object_menu_item_all);
object_menu_item_all.addEventListener(
	'click',
	makeFilterFunction(object_menu_item_all),
);
object_menu_item_all.click();

call_api_categories().then(returnCategories => {
	if (returnCategories) {
		for (let i = 0; i < returnCategories.length; i++) {
			const object_menu_item = createHTMLTag(
				'div',
				'object',
				returnCategories[i].name,
			);
			object_menu.appendChild(object_menu_item);
			object_menu_items.push(object_menu_item);
			object_menu_item.addEventListener(
				'click',
				makeFilterFunction(object_menu_item, returnCategories[i].id),
			);
		}
	}
});

function makeFilterFunction(object_menu_item, index) {
	return () => {
		gallery.innerHTML = '';
		for (let i = 0; i < object_menu_items.length; i++) {
			object_menu_items[i].classList.remove('object-selected');
		}
		object_menu_item.classList.add('object-selected');
		call_api_works().then(returnImage => {
			for (let i = 0; i < returnImage.length; i++) {
				returnImage[i].category.id;
				if (!index || index == returnImage[i].category.id) {
					// const figure = createHTMLTag('figure', '', '');
					const figure = createHTMLTagWithAttributes('figure',[
						['data-id', returnImage[i].id]
					])
					
					const image = createHTMLTagWithAttributes('img', [
						['src', returnImage[i].imageUrl],
						['alt', ''],
					]);

					const figcaption = createHTMLTag(
						'figcaption',
						'',
						returnImage[i].title,
					);

					figure.appendChild(image);
					figure.appendChild(figcaption);

					gallery.appendChild(figure);
				}
			}
		});
	};
}

//-- Gestion de la connexion
window.addEventListener('DOMContentLoaded', function () {
	const loginLink = document.getElementById('login');
	const logoutLink = document.getElementById('logout');

	if (localStorage.getItem('token')) {
		loginLink.style.display = 'none';
		logoutLink.style.display = 'inline-block';
		logoutLink.addEventListener('click', function () {
			localStorage.removeItem('token');
		});

		//-- Afficher les boutons "btn-modifier"
		const btnModifier = document.querySelector('.btn-modifier');
		btnModifier.style.display = 'inline-block';

		//-- Afficher la div "container-edit"
		const containerEdit = document.querySelector('.container-edit');
		containerEdit.style.display = 'flex';
	}
});

const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modalContainer');

//----MODAL----//

//-- Afficher La Modal
const modalTrigger = document.getElementById('modal-trigger');
modalTrigger.addEventListener('click', function () {
	modal.style.display = 'block';
});

//-- Fermer la Modal
const exitModal = document.querySelectorAll('.btn-exit');
exitModal.forEach(exitButton =>
	exitButton.addEventListener('click', function () {
		modalAdd.style.display = 'none';
		modalGalery.style.display = 'flex';
		modal.style.display = 'none';
	}),
);
window.addEventListener('click', function (event) {
	if (event.target === modalContainer) {
		modalGalery.style.display = 'flex';
		modalAdd.style.display = 'none';
		modal.style.display = 'none';
	}
});

//-- Passage sur la modal "ModalAdd"
const addPicture = document.querySelector('.btn-addWork');
addPicture.addEventListener('click', function () {
	modalGalery.style.display = 'none';
	modalAdd.style.display = 'block';
});

//-- Retour sur la modal "ModalGalery"
const returnModal = document.querySelector('.btn-back');
returnModal.addEventListener('click', function () {
	modalAdd.style.display = 'none';
	modalGalery.style.display = 'flex';
});

//----MODALGALERY----//
//-- Affichage des éléments works dans la Modal "ModalGalery"

function displayWorks(obj_data) {
	obj_data.forEach(returnImage => {
		addFigureToGaleryContainer(returnImage);
	});
}


function addFigureToGaleryContainer(returnImage) {
	let galeryContainer = document.querySelector('.galeryContainer');
	if (!galeryContainer) {
		galeryContainer = document.createElement('div');
		galeryContainer.classList.add('galeryContainer');
		document.body.appendChild(galeryContainer);
	}
	const figure = document.createElement('figure');
	const img = document.createElement('img');

	img.src = returnImage.imageUrl;
	img.alt = returnImage.title;

	figure.appendChild(img);

	const iconsContainer = document.createElement('div');
	iconsContainer.classList.add('icons-container');

	const resizeIcon = document.createElement('i');
	resizeIcon.classList.add(
		'fa-solid',
		'fa-arrows-up-down-left-right',
		'resize-ico',
	);
	iconsContainer.appendChild(resizeIcon);

	const deleteIcon = document.createElement('i');
	deleteIcon.classList.add('fa-solid', 'fa-trash-can');
	iconsContainer.appendChild(deleteIcon);

	figure.appendChild(iconsContainer);

	const editLink = document.createElement('a');
	editLink.textContent = 'Éditer';
	figure.appendChild(editLink);

	// Gestionnaire d'événement pour la suppression d'un élément
	deleteIcon.addEventListener('click', async () => {
		await deleteWork(returnImage.id);
		const data_id = document.querySelector('[data-id="' + returnImage.id + '"]');
		if(data_id){
			data_id.remove();
		}
		figure.remove();
	});
	galeryContainer.appendChild(figure);
}
document.addEventListener('DOMContentLoaded', async () => {
	const obj_data = await call_api_works();
	if (obj_data) {
		displayWorks(obj_data);
	}
});

//----MODALADD----//

//-- Gestion de l'image Upload ModalAdd
const changeFiles = document.getElementById('returnPreview');
const addImgElements = document.querySelectorAll(
	'.addImg i, .addImg label, .addImg input, .addImg p',
);
let image = document.getElementById('imagePreview');

let previewPicture = function (e) {
	const [picture] = e.files;
	if (picture) {
		//-- Affichage du preview
		image.src = URL.createObjectURL(picture);
		changeFiles.style.display = 'flex';
		//-- Cache les elements de la div
		addImgElements.forEach(element => {
			element.style.display = 'none';
		});
	}
};

//-- Bouton bonus pour retirer le preview et pouvoir changer d'image upload
let deletePreviewPicture = function () {
	image.src = '';
	changeFiles.style.display = 'none';
	addImgElements.forEach(element => {
		element.style.display = 'inline-block';
	});
	const inputUploadImg = document.getElementById('uploadImg');
	inputUploadImg.value = '';
};

changeFiles.addEventListener('click', deletePreviewPicture);

//-- Gestion du label des catégories dans ModalAdd
const selectCategories = document.getElementById('categorie');

getCategoriesforLabel();

const formUploadWorks = document.getElementById('sendImg');
const submitBtnWorks = document.getElementById('btnSubmit');

formUploadWorks.addEventListener('submit', submitWork);

function submitWork(e) {
	e.preventDefault();
	var token = localStorage.getItem('token');
	if (!token) {
		return;
	}

	var title = document.getElementById('titre').value;
	var category = document.getElementById('categorie').value;
	var image = document.getElementById('uploadImg').files[0];

	if (!title || !category || !image) {
		return;
	}

	var formData = new FormData();
	formData.append('title', title);
	formData.append('category', category);
	formData.append('image', image);

	fetch('http://localhost:5678/api/works', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
		},
		body: formData,
	})
		.then(async work => {
			console.log('Image envoyée avec succès !');
			addFigureToGaleryContainer(await work.json());
			call_api_categories(0);
			modalAdd.style.display = 'none';
			modalGalery.style.display = 'flex';
			modal.style.display = 'none';
			document.getElementById('titre').value = '';
			document.getElementById('categorie').value = '';
			image = document.getElementById('uploadImg').innerHTML = '';
			deletePreviewPicture();
			const reloadPage = document.querySelector('.object-selected')
			reloadPage.click()
		})
		.catch(error => {
			console.log("Erreur lors de l'envoi de l'image :", error);
		});
}

function checkSubmitButton() {
	const errorMsgModal = document.querySelector('.errorModal');
	var title = document.getElementById('titre').value;
	var category = document.getElementById('categorie').value;
	var image = document.getElementById('uploadImg').files[0];

	if (title && category && image) {
		submitBtnWorks.removeAttribute('disabled');
		submitBtnWorks.classList.add('active');
		errorMsgModal.textContent = '';
	} else {
		submitBtnWorks.setAttribute('disabled', 'disabled');
		submitBtnWorks.classList.remove('active');
		errorMsgModal.textContent = 'Tous les champs doivent être remplis !';
	}
}

// Ajouter les événements de vérification au changement de chaque champ
document.getElementById('titre').addEventListener('input', checkSubmitButton);
document
	.getElementById('categorie')
	.addEventListener('change', checkSubmitButton);
document
	.getElementById('uploadImg')
	.addEventListener('change', checkSubmitButton);
	
