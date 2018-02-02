'use strict';

var path = require('path');
var execSync = require('child_process').execSync;
var findup = require('findup-sync');

var pkgpath = findup('package.json');
var pkgdir = path.dirname(pkgpath);
var pkg = require(pkgpath);

var links = pkg.links || [];

module.exports = links.map(function (link) {

  // execute npm install in link directory
  var abspath = path.join(pkgdir, link);
  var installcmd = 'npm install --production';

  console.log(abspath + '$', installcmd);
  execSync(installcmd, {
    cwd: abspath
  });

  // Link
  var linkcmd = 'npm link ' + link;

  console.log(pkgdir + '$', linkcmd);
  execSync(linkcmd, {
    cwd: pkgdir
  });

  return abspath;
});
