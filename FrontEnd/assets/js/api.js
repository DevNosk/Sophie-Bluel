async function call_api_categories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const obj_data = await response.json();
    console.log(obj_data);
    return obj_data
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error);
  }
  return false
}


async function call_api_works() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const obj_data = await response.json();
    console.log(obj_data);
    return obj_data
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error);
  }
 return false
}

