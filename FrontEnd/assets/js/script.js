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
object_menu_item_all.click()


call_api_categories().then(returnCategories => {
	if (returnCategories) {
		console.log(returnCategories.length);
		for (let i = 0; i < returnCategories.length; i++) {
			console.log(returnCategories[i]);
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
	} else {
		console.log('rien');
	}
});

function makeFilterFunction(object_menu_item, index) {
	return () => {
		gallery.innerHTML=''
		for (let i = 0; i < object_menu_items.length; i++) {
			object_menu_items[i].classList.remove('object-selected');
		}
		object_menu_item.classList.add('object-selected');
		call_api_works().then(returnImage => {
			console.log(index);
			for (let i = 0; i < returnImage.length; i++) {
				returnImage[i].category.id;
				console.log(returnImage[i].category.id);
				if (!index||index == returnImage[i].category.id) {
					const figure = createHTMLTag('figure', '', '');
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
