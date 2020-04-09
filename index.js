let DOMAIN = ''; // mg.example.com
let mailgun = require('mailgun-js')({
  apiKey: "",  // your Mailgun API key
  domain: DOMAIN,
  host: 'api.eu.mailgun.net' // api.mailgun.net or api.eu.mailgun.net if you're using the eu servers
});
let CURRENT_TEMPLATE = "regular-newsletter"

let fetch = require('isomorphic-unfetch')

fetch(``) // remotely hosted html file of your newsletter or email
  .then(res => res.text())
  .then(data => {
    mailgun.get(`/${DOMAIN}/templates/${CURRENT_TEMPLATE}`, function (error, body) {
      if( !error ){
        console.log("template exists, deleting")
        mailgun.delete(`/${DOMAIN}/templates/${CURRENT_TEMPLATE}`, function (error, body) {
          if( !error ) {
            console.log("template deleted, updating")
            sendTemplate( data )
          }
        });
      } else {
        console.log("template doesn't exist, sending")
        sendTemplate( data )
      }
    });
  })

function sendTemplate( data ) {
  mailgun.post(`/${DOMAIN}/templates`, {
    "name" : CURRENT_TEMPLATE,
    "description": "Template for regular newsletters",
    "template": data
  },
  function (error, body) {
    if(!error) {
      console.log("Template sent")
      sendMail()
    } else {
      console.log(error)
    }
  });
}

function sendMail() {
  let data = {
    from: '', // My company <email@mg.example.com
    to: '', // An email adress or a mailing list hosted on Mailgun
    subject: '', // What you want your email to be titled
    template: CURRENT_TEMPLATE
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}
