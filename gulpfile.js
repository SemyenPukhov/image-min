const { task, src, dest, series } = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imagesConvert = require("gulp-images-convert");
const rename = require("gulp-rename");
const del = require("del");

task("images-min", function() {
  return src("img/*")
    .pipe(imagemin({ progressive: true }))
    .pipe(dest("img"));
});

task("images-convert", function() {
  return src("img/*")
    .pipe(imagesConvert({ targetType: "jpeg" }))
    .pipe(rename({ extname: ".jpeg" }))
    .pipe(dest("img"));
});

task("clear-images", function() {
  return del(["img/*", "!img/*.jpeg"]);
});

task("mozjpeg", function() {
  return src("img/*")
    .pipe(
      imagemin([
        imageminMozjpeg({
          quality: 75
        })
      ])
    )
    .pipe(dest("img"));
});

task(
  "default",
  series("images-min", "images-convert", "clear-images", "mozjpeg")
);
