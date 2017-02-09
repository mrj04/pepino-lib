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
var cucumber = require('gulp-cucumber');
var minimist = require('minimist');
var shell = require('gulp-shell');

var knownOptions = {
  string: 'browser',
  default: { browser: 'chrome' }
};

var options = minimist(process.argv.slice(2), knownOptions);

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
        gulp.src(['src/index.ts', 'src/**/*.ts', 'typings/main/**/*', 'typings/main.d.ts',
            'typings/custom/**/*.ts', 'typings/globals/**/*.ts', 'typings/modules/**/*.ts'])
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
    var version = "1.1." + (process.env.BUILDKITE_BUILD_NUMBER || "1");
    return gulp.src('./package.json')
        .pipe(bump({ version: version }))
        .pipe(gulp.dest('./'));
});

gulp.task('run', sequence('convert-steps', 'convert-steps-backend', 'run-chimp'));

gulp.task('run-chimp', shell.task([
  `chimp --path=./test/features --watch --browser=${options.browser}`
]));

gulp.task('convert-steps', ['compile'], function (done) {
    var folder = "./test/features/";
    var pepinoLang = fs.readFileSync(folder + "test.step", 'utf8');
    var js = require('./build/src/index').convert(pepinoLang);
    fs.writeFileSync(folder + "test.step.js", js);
    done();
});

gulp.task('convert-steps-backend', function (done) {
    var folder = "./test/features/";
    var pepinoLang = fs.readFileSync(folder + "myapi.step", 'utf8');
    var js = require('./build/src/index').convert(pepinoLang);
    fs.writeFileSync(folder + "myapi.step.js", js);
    done();
});

gulp.task('test-api', function() {
    return gulp.src('./test/features/myapi.feature')
        .pipe(cucumber({
            'steps': './test/features/step_definitions/*.js',
            'format': 'pretty'
        }));
});
