const userId = localStorage.getItem('userId') || 'anon';

function setUser() {
  const input = document.getElementById('username');
  localStorage.setItem('userId', input.value);
  location.reload();
}

// Instantiate the SDK. CDN will expose splitio globally
const splitConfig = { 
  core: {
    authorizationKey: '7gkpq12fk7knr6gt7fv629srmh5eien9e7td',
    // your internal user id, or the account id that 
    // the user belongs to. 
    // This coudld also be a cookie you generate
    // for anonymous users
    key: userId,
    // an OPTIONAL traffic type, if provided will be
    // used for event tracking with the SDK client.
    trafficType: 'user'
  }
};
const factory = splitio(splitConfig);
// And get the client instance you'll use
const client = factory.client();
client.on(client.Event.SDK_READY, function() {
  const buttonColor = client.getTreatment("red_button");
  if (buttonColor != "control") {
    const button = document.getElementById('get-started');
    button.style.background = buttonColor;
  }

  const linkText = client.getTreatment("link_text", { userId });
  // Change each link's text depending on user
  for (let i = 1; i < 5; i++) {
    if (linkText != "control") {
      const link = document.getElementById(`link-0${i}`);
      link.innerText = linkText.replace(/_/g, ' ');
    }
  }
});

