

const object_menu = document.getElementsByClassName("object-menu")[0];
let object_menu_items = document.getElementsByClassName("object")
let index_obj = 0
call_api_categories()







async function call_api_categories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const obj_data = await response.json();
  console.log(obj_data);

  const object_menu_item = document.createElement("div")
    object_menu_item.className = "object"
    let object_add = object_menu.appendChild(object_menu_item)
    object_add.innerHTML = "Tous"

  for (let i = 0; i < obj_data.length ; i++){
    const object_menu_item = document.createElement("div")
    object_menu_item.className = "object"
    let object_add = object_menu.appendChild(object_menu_item)
    object_add.innerHTML = obj_data[i].name
  }  
//  Rapelle variable pour boucle
  object_menu_items = document.getElementsByClassName("object")
  
  // Boucle ajout event / parcours object menu
  for(let index = 0; index < object_menu_items.length; index++) {
    //Click event
    object_menu_items[index].addEventListener("click",(element)=>{
      //Supprimer a tous a chaque clique
      
      for (let object_index = 0; object_index < object_menu_items.length; object_index++) {
        object_menu_items[object_index].classList.remove("object-selected")
      }

      //Ajouter sur clique
      object_menu_items[index].classList.add("object-selected")
    })
    }
  }



