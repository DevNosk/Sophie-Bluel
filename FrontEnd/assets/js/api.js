async function call_api_categories() {
	try {
		const response = await fetch('http://localhost:5678/api/categories');
		const obj_data = await response.json();
		console.log(obj_data);
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
		console.log(obj_data);
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
