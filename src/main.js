import './style.css'

const log = document.querySelector('#log');

document.querySelector('#otpButton').addEventListener('click', () => {

  if (!'OTPCredential' in window) {
    alert('No otp credential support (may work with autocomplete on safari');
  }

  // Can use ac to abort waiting on e.g. timeout or when form is submitted manually
  const ac = new AbortController();

  navigator.credentials.get({
    otp: { transport:['sms'] },
    signal: ac.signal
  }).then(otp => {
    // Process form here
    input.value = otp.code;
    log.innerText = `Submitted form with code ${otp.code}`;
    
  }).catch(err => {
    alert(err);
  });
});
