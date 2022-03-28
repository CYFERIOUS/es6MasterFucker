//initialize modules
const { src,dest,watch,series,parallel,del} = require('gulp');
var browsersync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rename = require("gulp-rename");
var babel= require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
var glob = require("glob")
const es = require('event-stream');



//file path variables
const files = {
	scssPath: './src/scss/**/*.scss', 
	jsE6Path: './src/js/**/*.js'
};


///errorlog task

function handleError (err) {
  console.log(err.toString())
  process.exit(-1)
}


//sass-task 

function scssTask(argument) {
	return src(files.scssPath)
		  .pipe(sourcemaps.init())
		  .pipe(sass())
		  .pipe(postcss([ autoprefixer(),cssnano() ]))
		  .pipe(sourcemaps.write('.'))
		  .pipe(dest('dist/css/'))
		  .pipe(browsersync.stream())
		  .on('error', handleError);
	
}

//jsE6-task
function jsE6Task(done){
	
	glob(files.jsE6Path, function(err, files) {
	        if(err) done(err);
			var b = files.map(function(entry) { 
				return browserify({
		    		entries: entry,
		    		debug: true,
		    		transform: [babelify.configure({ presets: ['@babel/preset-env']})]
		    	}).bundle()
		    	.pipe(source(entry))
		    	.pipe(rename(function(path){
		    	 	path.dirname = path.dirname.replace('src/', '');
		     	 })).pipe(rename({extname: '.min.js'}))
		    	.pipe(buffer())
		    	.pipe(sourcemaps.init({loadMaps: true}))
		    	.pipe(uglify())
		    	.pipe(sourcemaps.write('./'))
		    	.pipe(dest('dist/'))
		    	.pipe(browsersync.stream())
		    	.on('error', handleError);
		    });

	      	es.merge(b).on('end', done);
	});
    done();
}

//cachebusting-task
const cbString = new Date().getTime();
function cacheBustTask(){
	return src(['./src/index.html'])
			.pipe(replace(/cb=\d+/g,'cb=' + cbString))
			.pipe(dest('./dist'))
			.on('error', handleError);
}


//browsersync-tasks

function browsersyncServe(cb){
	browsersync.init({
		server:{
			baseDir:'./dist'
		}
	});
	cb();
}



//watch task
function watchTask() {
	
	watch([files.scssPath, files.jsE6Path], 
	parallel(scssTask,jsE6Task)).on('error', handleError);

}

//default task
exports.default = series(
	parallel(scssTask,jsE6Task),
	cacheBustTask,
	browsersyncServe,
	watchTask
	
);