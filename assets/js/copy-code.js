(function() {
  function getCodeText(block) {
    var code = block.querySelector('td.rouge-code pre, td.code pre, pre code, pre');
    return code ? code.innerText : '';
  }

  function copyText(text, button) {
    var reset = function() {
      window.setTimeout(function() {
        button.textContent = 'Copy';
      }, 1400);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function() {
        button.textContent = 'Copied';
        reset();
      });
      return;
    }

    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    button.textContent = 'Copied';
    reset();
  }

  document.addEventListener('DOMContentLoaded', function() {
    var blocks = document.querySelectorAll('.page__content div.highlighter-rouge, .page__content figure.highlight');

    blocks.forEach(function(block) {
      if (block.querySelector('.copy-code-button')) return;

      var button = document.createElement('button');
      button.className = 'copy-code-button';
      button.type = 'button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', function() {
        copyText(getCodeText(block), button);
      });

      block.appendChild(button);
    });
  });
})();
