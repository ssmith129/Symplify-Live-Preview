// Simplify Healthcare - Shared Interactions and Validation
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    // Mobile nav toggle
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if(toggle && nav){
      toggle.addEventListener('click', function(){
        var isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Simulate loading states
    document.querySelectorAll('[data-loading]')?.forEach(function(el){
      el.classList.add('loading');
      setTimeout(function(){el.classList.remove('loading');}, 800);
    });

    // Appointment booking validation
    var apptForm = document.querySelector('#appointment-form');
    if(apptForm){
      apptForm.addEventListener('submit', function(e){
        var requiredIds = ['patientName','doctor','department','apptDate','apptTime','reason'];
        var valid = true;
        requiredIds.forEach(function(id){
          var field = apptForm.querySelector('#'+id);
          var msg = apptForm.querySelector('[data-error-for="'+id+'"]');
          if(field){
            var value = (field.value || '').trim();
            var ok = value.length > 0;
            if(field.type === 'date') ok = ok && /^\d{4}-\d{2}-\d{2}$/.test(value);
            if(field.type === 'time') ok = ok && /^\d{2}:\d{2}$/.test(value);
            field.classList.toggle('invalid', !ok);
            if(msg){ msg.textContent = ok ? '' : 'This field is required'; msg.setAttribute('role', ok ? '' : 'alert'); }
            valid = valid && ok;
          }
        });
        if(!valid){ e.preventDefault(); apptForm.querySelector('.error-summary').textContent = 'Please fix the errors highlighted below.'; return; }
      });
    }

    // Email compose validation
    var emailForm = document.querySelector('#email-compose-form');
    if(emailForm){
      emailForm.addEventListener('submit', function(e){
        var to = emailForm.querySelector('#emailTo');
        var subject = emailForm.querySelector('#emailSubject');
        var body = emailForm.querySelector('#emailBody');
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((to.value||'').trim());
        var subjectOk = (subject.value||'').trim().length>0;
        var bodyOk = (body.value||'').trim().length>5;
        to.classList.toggle('invalid', !emailOk);
        subject.classList.toggle('invalid', !subjectOk);
        body.classList.toggle('invalid', !bodyOk);
        if(!(emailOk && subjectOk && bodyOk)){
          e.preventDefault();
          var sum = emailForm.querySelector('.error-summary');
          if(sum) sum.textContent = 'Please provide a valid recipient, subject, and message.';
        }
      })
    }

    // Simple filter for message list
    var msgFilter = document.querySelector('#message-filter');
    if(msgFilter){
      msgFilter.addEventListener('input', function(){
        var q = (msgFilter.value||'').toLowerCase();
        document.querySelectorAll('[data-message-item]')?.forEach(function(item){
          var text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? '' : 'none';
        })
      })
    }
  });
})();
