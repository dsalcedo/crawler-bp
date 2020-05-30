const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.js('resources/js/app.js', 'assets/js/app.js')
.postCss('./resources/css/app.css', './assets/css/app.css',
	tailwindcss('./tailwind.config.js')
);