const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const glob = require('glob');
const fs = require('fs');
const merge = require('merge-stream');
const replace = require('gulp-replace');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const paths = {
    html: [
        './Roman/**/*.html',
        './Vlad/**/*.html',
        './Ilya/**/*.html',
        './egorchik/**/*.html'
    ],
    images: [
        './Roman/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
        './Vlad/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
        './Ilya/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
        './egorchik/**/*.{png,jpg,jpeg,gif,svg,webp,ico}',
        './**/*.{png,jpg,jpeg,gif,svg,webp,ico}'
    ],
    css: [
        './*.css',
        './Roman/**/*.css',
        './Vlad/**/*.css',
        './Ilya/**/*.css',
        './egorchik/**/*.css'
    ],
    js: [
        './egorchik/**/*.js',
        './**/*.js',
        '!./node_modules/**',
        '!./dist/**',
        '!./gulpfile.js'
    ],
    db: './db.json'
};

function html() {
    const existingHtml = glob.sync(paths.html, { ignore: ['node_modules/**', 'dist/**'] });
    
    if (existingHtml.length === 0) {
        console.log('⚠️  HTML файлы не найдены');
        return Promise.resolve('No HTML files');
    }
    
    return gulp.src(existingHtml, { base: '.' })
        .pipe(replace(/src=["']([^"']*\.(png|jpg|jpeg|gif|svg|webp|ico))["']/gi, function(match, imgPath) {
            const filePath = this.file.relative;
            
            if (imgPath.startsWith('http') || imgPath.startsWith('//') || imgPath.startsWith('/')) {
                return match;
            }
            
            imgPath = imgPath.trim();
            const depth = (filePath.match(/\//g) || []).length;
            const prefix = depth > 0 ? '../'.repeat(depth) : '';
            
            return `src="${prefix}${imgPath}"`;
        }))
        .pipe(replace(/url\(["']?([^"')]*\.(png|jpg|jpeg|gif|svg|webp|ico))["']?\)/gi, function(match, imgPath) {
            const filePath = this.file.relative;
            const depth = (filePath.match(/\//g) || []).length;
            const prefix = depth > 0 ? '../'.repeat(depth) : '';
            return `url("${prefix}${imgPath}")`;
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function images() {
    const existingImages = glob.sync(paths.images, { 
        ignore: ['node_modules/**', 'dist/**'],
        nocase: true
    });
    
    if (existingImages.length === 0) {
        console.log('⚠️  Изображения не найдены');
        return Promise.resolve('No images');
    }
    
    console.log(`📸 Найдено изображений: ${existingImages.length}`);
    
    return gulp.src(existingImages, { 
        base: '.', 
        allowEmpty: true,
        encoding: false
    })
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function css() {
    const existingCss = glob.sync(paths.css, { ignore: ['node_modules/**', 'dist/**'] });
    
    if (existingCss.length === 0) {
        console.log('⚠️  CSS файлы не найдены');
        return Promise.resolve('No CSS files');
    }
    
    return gulp.src(existingCss, { base: '.', allowEmpty: true })
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function js() {
    const existingJs = glob.sync(paths.js, { ignore: ['node_modules/**', 'dist/**'] });
    
    if (existingJs.length === 0) {
        console.log('⚠️  JS файлы не найдены');
        return Promise.resolve('No JS files');
    }
    
    return gulp.src(existingJs, { base: '.', allowEmpty: true })
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function db() {
    if (!fs.existsSync(paths.db)) {
        console.log('⚠️  db.json не найден в корне проекта');
        return Promise.resolve('No db.json');
    }
    
    console.log('📦 Копируем db.json');
    
    const streams = [];
    
    streams.push(gulp.src(paths.db).pipe(gulp.dest('./dist')));
    
    const dirs = glob.sync('./dist/*/', { ignore: ['node_modules/**'] });
    dirs.forEach(dir => {
        streams.push(gulp.src(paths.db).pipe(gulp.dest(dir)));
    });
    
    return merge(...streams).pipe(browserSync.stream());
}

function misc() {
    return gulp.src(['./*.{json,md,txt}', '!./db.json', '!./package*.json'], { base: '.', allowEmpty: true })
        .pipe(gulp.dest('./dist'));
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './dist',
            middleware: [
                function(req, res, next) {
                    try {
                        req.url = decodeURIComponent(req.url);
                    } catch (e) {}
                    next();
                },
                createProxyMiddleware('/api', {
                    target: 'http://localhost:3001', // json-server
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                })
            ]
        },
        port: 8080, // ← Изменил с 3000 на 8080
        open: false,
        notify: false
    });
    
    console.log('\n✅ Фронтенд запущен на http://localhost:8080');
    console.log('📡 API прокси: /api/* → http://localhost:3001/*');
    done();
}

function watch() {
    gulp.watch(['./**/*.html', '!./node_modules/**', '!./dist/**'], html);
    gulp.watch(['./**/*.css', '!./node_modules/**', '!./dist/**'], css);
    gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**'], js);
    gulp.watch(['./**/*.{png,jpg,jpeg,gif,svg,webp,ico}', '!./node_modules/**', '!./dist/**'], images);
    gulp.watch('./db.json', db);
}

function clean(done) {
    if (fs.existsSync('./dist')) {
        fs.rmSync('./dist', { recursive: true, force: true });
        console.log('🧹 Папка dist очищена');
    }
    done();
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, db, misc));
const dev = gulp.series(build, serve, watch);

exports.clean = clean;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.db = db;
exports.build = build;
exports.dev = dev;
exports.default = dev;