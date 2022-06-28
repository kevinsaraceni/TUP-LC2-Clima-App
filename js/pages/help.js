emailjs.init('d7tThim7PTOcV8lFr');
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    this.contact_number.value = Math.random() * 100000 | 0;
    emailjs.sendForm('contact_service', 'contact_form', this)
        .then(function() {
            alert('El mensaje ha sido enviado. ¡Gracias!');
        }, function(error) {
            console.log('Ha habido un error.', error);
        });
});