var gulp = require('gulp');
require('gulp-stats')(gulp);
var sequence = require('gulp-sequence');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var istanbul = require('gulp-istanbul');
var tsPath = 'src/**/*.ts';
var mocha = require('gulp-mocha');
var bump = require('gulp-bump');
var fs = require('fs');

gulp.task('default', sequence('compile', 'unit-tests'));

gulp.task('clean-coverage', function () {
    return del(['coverage/**/*']);
});

gulp.task('clean-build', function () {
    return del(['build/**/*']);
});

gulp.task('compile', ['clean-build'], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var compilePipeline =
        gulp.src(['src/index.ts', 'src/**/*.ts', 'typings/main/**/*', 'typings/main.d.ts', 'typings/custom/**/*.ts'])
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject)).js
            .pipe(sourcemaps.write({ sourceRoot: '/src', includeContent: false }))
            .pipe(gulp.dest('build/src'));

    return compilePipeline;
});

gulp.task('unit-tests', ['clean-coverage', 'pre-test'], function () {
    return gulp.src(['build/src/**/*.spec.js'])
        .pipe(mocha({ reporter: 'spec' }))
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reportOpts: {
                dir: './coverage'
            },
            reporters: ['text-summary', 'html']
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }));
});

gulp.task('pre-test', function () {
    return gulp.src(['build/**/*.js', '!build/src/features/**/*'])
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire());
});

gulp.task('bump', function () {
    var version = "1.0." + (process.env.TRAVIS_BUILD_NUMBER || "1");
    return gulp.src('./package.json')
        .pipe(bump({ version: version }))
        .pipe(gulp.dest('./'));
});

gulp.task('run', sequence('convert-steps', 'run-chimp'));

gulp.task('run-chimp', function (done) {
    const execFile = require('child_process').execFile;
    execFile('chimp', ["--path=./test_assets/features", "--watch"], (error, stdout, stderr) => {
        if (error) {
            console.log(stderr);
            throw error;
        }
        console.log(stdout);
        done();
    });

});

gulp.task('convert-steps', ['compile'], function (done) {
    var folder = "./test_assets/features/";
    var pepinoLang = fs.readFileSync(folder + "test.step", 'utf8');
    var js = require('./build/src/index').convert(pepinoLang);
    fs.writeFileSync(folder + "test.step.js", js);
    done();
});