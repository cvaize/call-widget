let mix = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('src/call-widget.lib.js', 'dist/call-widget.js')

    .js('src/themes/default.lib.js', 'dist/call-widget-theme-default.js')
    .sass('src/themes/default.scss', 'dist/call-widget.default.css')

    .js('src/themes/mobile.lib.js', 'dist/call-widget-theme-mobile.js')
    .sass('src/themes/mobile.scss', 'dist/call-widget.mobile.css')

    .copy('src/index.html', 'dist/index.html')
    .disableSuccessNotifications()
    .sourceMaps()