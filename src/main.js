import './style.css'

const log = document.querySelector('#log');
const input = document.querySelector('#input');

document.querySelector('#otpButton').addEventListener('click', () => {

  if (!'OTPCredential' in window) {
    console.log('No otp credential support (may work with autocomplete on safari');
  }

  // Can use ac to abort waiting on e.g. timeout or when form is submitted manually
  const ac = new AbortController();

  log.innerHTML += '<br>Sent (kinda) sms code';

  console.log('awaiting');
  navigator.credentials.get({
    otp: { transport:['sms'] },
    signal: ac.signal,
  })
  .then(otp => {
    console.log('Sms received', otp);
    // Process form here
    input.value = otp.code;
    log.innerHTML += `<br>Submitted form with code ${otp.code}`;
    
  }).catch(err => {
    console.error(err);
    alert(err);
  });
});
