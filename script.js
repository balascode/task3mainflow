"use strict";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(data.phone)) {
            alert('Please enter a valid 10-digit phone number without any special characters or spaces.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        fetch('https://script.google.com/macros/s/AKfycbytLs9kIrs1Y34qDylOZYM1qwxx_5bGNkyJKzsDPwpaUx3qyo32CqQZi2NMrCKyLjg9/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            if (responseData.result === 'success') {
                alert('Form submitted successfully!');
                document.getElementById('contactForm').reset();
            } else {
                alert('Form submission failed: ' + responseData.message);
            }
        })
        .catch(error => {
            alert('Unable to fetch details. Error: ' + error.message);
        });
    });
});
