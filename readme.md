# Mailgun Email Sender
This is very simple code that illustrates how to use Mailgun and the Mailgun API to send newsletters. Here's what it does:

 - Fetches a remote HTML Email Template
 - Checks if the template already exists
 - Either deletes and uploads or just uploads the latest version
 - Sends the html file to an email address

## Installation

    git clone https://github.com/creativiii/mailgun-email-sender.git
    cd mailgun-email-sender
    npm i
## How to use
Open `index.js` and fill out these details with your Mailgun information:

    let DOMAIN = ''; // mg.example.com
    let mailgun = require('mailgun-js')({
	    apiKey: "",  // your Mailgun API key
	    domain: DOMAIN,
	    host: 'api.eu.mailgun.net' // api.mailgun.net or api.eu.mailgun.net if you're using the eu servers
    });
    let CURRENT_TEMPLATE = "regular-newsletter" // Name of the template once uploaded to Mailgun
As well as:

    var data = {
	    from: '', // My company <email@mg.example.com>
	    to: '', // An email adress or a mailing list hosted on Mailgun
	    subject: '', // What you want your email to be titled
	    template: CURRENT_TEMPLATE
    };

Then run:

    node index.js
## Use cases
I'm currently using this script to send Newsletters. To do so I have uploaded my mailing list to Mailgun, then I just set the `to` address in the script to the email alias created by Mailgun.
