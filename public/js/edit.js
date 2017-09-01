window.addEventListener('DOMContentLoaded', function(e) {

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  });

  var markdown = document.querySelector('#markdown');
  var preview = document.querySelector('#preview');

  preview.innerHTML = marked(markdown.value);

  markdown.addEventListener('keyup', function(e) {
    preview.innerHTML = marked(markdown.value);
  }, false);
});