document.getElementById('create-issue-btn').addEventListener('click', function () {
    const subject = document.getElementById('subject').value;
    console.log(subject);

    if (!subject) {
        alert('Please enter a subject!');
        return;
    }

    const issueData = {
        issue: {
            subject: subject,
        }
    };

    console.log('Issue data:', issueData);

    fetch('http://localhost:3002/api/create-issue', { // Proxy server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.issue) {
                alert(`Issue created successfully! Issue ID: ${data.issue.id}`);
            } else {
                alert('Error creating issue.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}`);
        });
});
