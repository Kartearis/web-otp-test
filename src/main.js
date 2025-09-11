import './style.css'

const log = document.querySelector('#log');
const input = document.querySelector('input');

document.querySelector('#otpButton').addEventListener('click', () => {

  if (!'OTPCredential' in window) {
    alert('No otp credential support (may work with autocomplete on safari');
  }

  // Can use ac to abort waiting on e.g. timeout or when form is submitted manually
  const ac = new AbortController();

  log.innerHtml = log.innerHtml + '<br>' + 'Sent (kinda) sms code';


  navigator.credentials.get({
    otp: { transport:['sms'] },
    signal: ac.signal
  }).then(otp => {
    // Process form here
    input.value = otp.code;
    log.innerHtml = log.innerHtml + '<br>' + `Submitted form with code ${otp.code}`;
    
  }).catch(err => {
    alert(err);
  });
});
