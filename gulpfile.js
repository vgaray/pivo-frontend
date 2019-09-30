var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require( 'gulp-sass' ),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    mocha = require( 'gulp-mocha' ),
    less = require('gulp-less'),
    gutil = require( 'gulp-util' );




gulp.task( 'mocha', function()
{
    return gulp.src( [ 'src/tests/**/*.js' ], { read: false } )
           .pipe( mocha( { reporter: 'list' } ) )
           .on( 'error', gutil.log );
} );

var DEST = "src/assets";
gulp.task('script', function() {
    return gulp.src('src/assets/scripts/*.js')
        .pipe(concat('t-contacta.js'))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function(filename, options) {
    return gulp.src( 'src/assets/scss/*.scss' )
               .pipe( sass( options ).on( 'error', sass.logError ) )
               .pipe( concat( filename ) )
               .pipe( gulp.dest( DEST + '/css' ) )
               .pipe( browserSync.stream() );
};

gulp.task('sass', function() {
    return compileSASS('style.css', {});
});

gulp.task('sass-minify', function() {
    return compileSASS('style.min.css', { outputStyle: 'compressed' });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./bower_components/bootstrap-timepicker/css/timepicker.less')
    .pipe(less())
    
    .pipe(gulp.dest( DEST + '/css'));
    
}); 
/* Task to watch less changes */


gulp.task('watch', function() {
    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch('src/components/**/*.js', browserSync.reload);
    gulp.watch('src/assets/scripts/**/*.js', ['script']);
    gulp.watch('src/assets/scss/**/*.scss', ['sass', 'sass-minify']);
    gulp.watch('./**/*.less' , ['compile-less']);
});

gulp.task('default', ['browser-sync', 'watch']);
