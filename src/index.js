import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
require('reveal.js/dist/reveal.css')
require('reveal.js/dist/theme/black.css')
let deck = new Reveal({
    slideNumber: 'c/t',
    plugins: [ Markdown ]
})
deck.initialize();
