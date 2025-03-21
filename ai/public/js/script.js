
window.onload = function (){
	var prompt = document.getElementById("prompt");

	prompt.addEventListener("click", function() {
		fetch('http://localhost:3000/', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message: userMessage })
		  })
		  .then(response => response.json())
		  .then(data => {
			// Mostrar la respuesta del chatbot en la página
			document.getElementById('chatResponse').innerText = 'Chatbot dice: ' + data.reply;
		  })
		  .catch(error => {
			console.error('Error al comunicar con el servidor:', error);
		  });
	});
}
