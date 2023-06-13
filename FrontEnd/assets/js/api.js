async function call_api_categories() {
	try {
		const response = await fetch('http://localhost:5678/api/categories');
		const obj_data = await response.json();
		return obj_data;
	} catch (error) {
		console.error("Erreur lors de l'appel API:", error);
	}
	return false;
}

async function call_api_works() {
	try {
		const response = await fetch('http://localhost:5678/api/works');
		const obj_data = await response.json();
		return obj_data;
	} catch (error) {
		console.error("Erreur lors de l'appel API:", error);
	}
	return false;
}

async function call_api_log(inputEmail, inputPassword) {
	const BodyJson = JSON.stringify({
		email: inputEmail,
		password: inputPassword,
	});
	console.log(BodyJson);
	const response = await fetch('http://localhost:5678/api/users/login', {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: BodyJson,
	});

	const responseJson = await response.json();
	if (responseJson.token === undefined) {
		errorMessage.textContent = 'E-mail ou Mot de passe incorrect';
	} else {
		localStorage.setItem('token', responseJson.token);
		window.location.href = 'index.html';
	}
}

async function getCategoriesforLabel() {
	try {
		const response = await fetch('http://localhost:5678/api/categories');
		const categoriesForLabel = await response.json();
		// Réinitialiser le contenu du select
		selectCategories.innerHTML = '';
		// Ajouter un champ vide
		const champVide = document.createElement('option');
		champVide.value = '';
		champVide.text = '';
		selectCategories.appendChild(champVide);
		// Parcourir les catégories et les ajouter au select
		categoriesForLabel.forEach(category => {
			if (category !== 'tous') {
				const optionnalCategories = document.createElement('option');
				optionnalCategories.value = category.id;
				optionnalCategories.text = category.name;
				selectCategories.appendChild(optionnalCategories);
			}
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des catégories :', error);
	}
}


async function deleteWork(workId) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}
		const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			console.log('Suppression réussie');
		} else {
			console.log("Une erreur s'est produite lors de la suppression");
		}
	} catch (error) {
		console.log("Une erreur s'est produite lors de la suppression", error);
	}
}