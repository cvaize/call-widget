let mix = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('src/call-widget.lib.js', 'dist/call-widget.lib.js')
    .js('src/call-widget.js', 'dist/call-widget.js')
    .sass('src/call-widget.scss', 'dist/call-widget.css')
    .copy('src/index.html', 'dist/index.html')
    .disableSuccessNotifications()
    .sourceMaps()