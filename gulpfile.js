var gulp = require("gulp");

var sass = require("gulp-sass");

var minCss = require("gulp-clean-css");

var blean = require("gulp-webserver");

var uglify = require("gulp-uglify");

var url = require("url");

var path = require("path");

var fs = require("fs");

var data = require("./src/data/serach.json");
//编译scss压缩css
gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
});
//监听css
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});
//压缩js
gulp.task("minJs", function() {
    return gulp.src(["./src/js/**/*.js", "!./src/js/libs/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./src/build"))
});
gulp.task("server", function() {
        return gulp.src("src")
            .pipe(blean({
                port: 8080,
                open: true,
                middleware: function(req, res, next) {
                    if (req.url === "/favicon.ico") {
                        res.end("");
                        return
                    }
                    var obj = url.parse(req.url, true);
                    var pathname = obj.pathname;
                    var query = obj.query;
                    pathname = pathname === "/" ? "index.html" : pathname;

                    if (pathname === "/api/find") {
                        // var arr = [];
                        // data.forEach(function(file) {
                        //     if (file.name.match(query.val)) {
                        //         arr.push(file.name)
                        //     }
                        // })
                        res.end(JSON.stringify({ code: 1, data: data }))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    }
                }
            }))
    })
    //整合任务
gulp.task("dev", gulp.series("devCss", "server", "watch"))