/* SILVERBOTv1 UPDATER
MIT LICENSE STARTS HERE:
Copyright 2018-2019 chanonlim (SuperNiintendo)/RaZeFeiXX

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

MIT LICENSE ENDS HERE
*/
const request = require('request')
const fs = require('fs')
const sha256 = require('js-sha256').sha256
const packagejson = require('./package.json')
const cmp = require('semver-compare')
const npm = require('npm')
const inquirer = require('inquirer')
const promisify = require('util').promisify
const childProcess = require('child_process')

const manifestURL = 'https://chanonlim.pythonanywhere.com/botinfo/silverbotv1/manifest.json'
const downloadURL = 'https://chanonlim.pythonanywhere.com/botinfo/silverbotv1/files/latest/'
const rget = promisify(request.get)

async function main () {
  npm.load()
  console.log('--- SilverBotv1 Updater ---')
  console.log('Version: ' + packagejson.version)
  process.stdout.write('Checking for updates...')
  request.get(manifestURL, { json: true }, async(err, res, r) => {
    if (err) { process.stdout.write(' Error\n'); throw err }
    if (cmp(r.latestVersion, packagejson.version) === 1) {
      process.stdout.write('\r')
      console.log('Updating... (' + packagejson.version + ' => ' + r.latestVersion + ')')
      var pb = new ProgressBar("[:bar] (:percent) [:current of :total files]  ETA: :etas", {total: r.latestRelease.changedFiles.length, width: 10})
      for (var file in r.latestRelease.changedFiles) {
        var fileData = await rget(downloadURL + r.latestRelease.changedFiles[file])
        if (sha256(fileData.body) !== r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256) {
          console.error('Cannot trust ' + r.latestRelease.changedFiles[file] + ", SHA256's do not match.\nExpected: " + r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256 + '\nGot: ' + sha256(fileData.body))
        } else {
          fs.writeFileSync(r.latestRelease.changedFiles[file], fileData.body)
        }
        pb.tick(1)
      }
      if (r.latestRelease.requiresNewDependencies) {
        console.log("Installing dependencies...")
        npm.install()
      } else {
        console.log("Finished updating to version " + r.latestVersion)
      }
    } else {
      console.log('You are using the latest version. (' + packagejson.version + ')')
      process.exit()
    }
  })
}
async function update () {
  request.get(manifestURL, { json: true }, async(err, res, r) => {
    if (err) { process.stdout.write(' Error\n'); throw err }
    process.stdout.write('\r')
    console.log('Updating... (' + packagejson.version + ' => ' + r.latestVersion + ')')
    var pb = new ProgressBar("[:bar] (:percent) [:current of :total files]  ETA: :etas", {total: r.latestRelease.changedFiles.length, width: 10})
    for (var file in r.latestRelease.changedFiles) {
      var fileData = await rget(downloadURL + r.latestRelease.changedFiles[file])
      if (sha256(fileData.body) !== r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256) {
        console.error('Cannot trust ' + r.latestRelease.changedFiles[file] + ", SHA256's do not match.\nExpected: " + r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256 + '\nGot: ' + sha256(fileData.body))
      } else {
        fs.writeFileSync(r.latestRelease.changedFiles[file], fileData.body)
      }
      pb.tick(1)
    }
    if (r.latestRelease.requiresNewDependencies) {
      console.log("Installing dependencies...")
      npm.install()
    } else {
      console.log("Finished updating to version " + r.latestVersion)
    }
  })
}
async function checkForUpdates () {
  npm.load()
  console.log('--- SilverBotv1 Updater ---')
  console.log('Version: ' + packagejson.version)
  process.stdout.write('Checking for updates...')
  request.get(manifestURL, { json: true }, async(err, res, r) => {
    if (err) { process.stdout.write(' Error\n'); throw err }
    if (cmp(r.latestVersion, packagejson.version) === 1) {
      process.stdout.write('\r')
      inquirer.prompt({ type: 'list', name: 'confirm', choices: ['Yes', 'No'], message: 'A new update is available. Would you like to install it?' })
        .then(async(ra) => {
          if (ra.confirm == 'Yes') {
            console.log('Updating... (' + packagejson.version + ' => ' + r.latestVersion + ')')
            var pb = new ProgressBar("[:bar] (:percent) [:current of :total files]  ETA: :etas", {total: r.latestRelease.changedFiles.length, width: 10})
            for (var file in r.latestRelease.changedFiles) {
              var fileData = await rget(downloadURL + r.latestRelease.changedFiles[file])
              if (sha256(fileData.body) !== r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256) {
                console.error('Cannot trust ' + r.latestRelease.changedFiles[file] + ", SHA256's do not match.\nExpected: " + r.latestRelease.files[r.latestRelease.changedFiles[file]].sha256 + '\nGot: ' + sha256(fileData.body))
              } else {
                fs.writeFileSync(r.latestRelease.changedFiles[file], fileData.body)
              }
              pb.tick(1)
            }
            if (r.latestRelease.requiresNewDependencies) {
              console.log("Installing dependencies...")
              npm.install()
            } else {
              console.log("Finished updating to version " + r.latestVersion)
            }
          } else { process.exit() }
        })
    } else {
      console.log('You are using the latest version. (' + packagejson.version + ')')
    }
  })
}
function showVersions() {
  var package = require("./package.json")
  console.log("Version information:")
  console.log("SilverBot version: " + package.version)
  console.log("Node.js version: " + process.version)
  for (var i in package.dependencies) {
    var version = childProcess.execSync("npm show " + i + " version")
    console.log(i + " version: " + version)
  }
}
module.exports.update = update
module.exports.checkForUpdates = checkForUpdates
module.exports.showVersions = showVersions
if (require.main === module) {
  main()
}
