let mix = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('src/app.js', 'dist/call-widget.min.js')
    .sass('src/app.scss', 'dist/call-widget.min.css')
    .copy('src/index.html', 'dist/index.html')
    .disableSuccessNotifications()
    .sourceMaps()