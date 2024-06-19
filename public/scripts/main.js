// Assuming jQuery is used for AJAX
$(document).ready(function() {
    $('#submit-button').click(function(event) {
        event.preventDefault(); // Prevent default form submission
        
        $.ajax({
            url: '/submit-form', // Endpoint to handle form submission on the server
            type: 'POST', // HTTP method
            data: $('#myForm').serialize(), // Serialize form data
            success: function(response) {
                console.log('Form submitted successfully:', response);
                // Handle success response here (e.g., show success message)
            },
            error: function(error) {
                console.error('Form submission error:', error);
                // Handle error response here (e.g., show error message)
            }
        });
    });
});
