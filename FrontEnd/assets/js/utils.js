function createHTMLTag(tag, classNames, innerText) {
	const element = document.createElement(tag);
	if (classNames) {
		element.classList.add(classNames.split(' '));
	}
	if (innerText) {
		element.innerText = innerText;
	}
	return element;
}

function createHTMLTagWithAttributes(tag, attributes , classNames, innerText) {
	const element = document.createElement(tag);
  if(attributes.length>0){
    for(let i=0; i<attributes.length; i++){
      element.setAttribute(attributes[i][0],attributes[i][1])
    }
  }
	if (classNames) {
		element.classList.add(classNames.split(' '));
	}
	if (innerText) {
		element.innerText = innerText;
	}
	return element;
}

