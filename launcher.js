/* SILVERBOTv1 LAUNCHER
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

const inquirer = require('inquirer')
const fs = require('fs')
const childProcess = require('child_process')
const request = require('request')
const package = require("./package.json")
const cmp = require("semver-compare")
const updater = require("./updater.js")

console.log('--- SilverBot v1 Rewrite Launcher ---')
console.log("--- Version " + package.version + " ---")

function runScript (scriptPath, callback) {
  var invoked = false
  var process = childProcess.fork(scriptPath)
  process.on('error', function (err) {
    if (invoked) return
    invoked = true
    callback(err)
  })
  process.on('exit', function (code) {
    if (invoked) return
    invoked = true
    var err = code === 0 ? null : new Error('exit code ' + code)
    callback(err)
  })
}
function launch (autoRestart) {
  if (autoRestart) {
    const child = childProcess.spawn('autorestart.bat') // will have support for linux, just wait
    // forward output of bot and autostarter
    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (text) => {
      console.log(text.toString())
    })
    child.stderr.on('data', (text) => {
      console.error(text.toString())
    })
    child.on('error', (err) => {
      console.error('An error occured.')
      console.error(err)
    })
    child.on('close', (code) => {
      if (code !== 0) {
        console.error('An error occured. Exit code: ' + code)
        process.exit()
      }
      console.log('Bye-bye!')
      process.exit()
    })
  } else {
    runScript('index.js', (err) => {
      if (err) {
        console.error('An error occured.')
        console.error(err)
      } else {
        console.log('Bye-bye!')
        process.exit()
      }
    })
  }
}
function configurePrompt () {
  var questions = [
    {
      name: 'token',
      message: 'Please enter your token for your bot (This is NOT the Client Secret)',
      validate: function (name) {
        return name !== ''
      }
    },
    {
      name: 'game',
      message: "Please enter a game name to display. Won't be displayed if not specified.",
      default: 'None'
    },
    {
      name: 'status',
      message: 'Enter the status for the bot to use.',
      validate: (status) => {
        const statuses = ['online', 'idle', 'dnd', 'invisible']
        if (!statuses.includes(status)) return 'Invalid status. Valid statuses are ' + statuses.join(' ,')
        return true
      },
      default: "online"
    },
    {
      name: 'prefix',
      message: "Enter the prefix to use. The prefix will be '&' if not specified.",
      default: '&'
    },
    {
      name: 'password',
      message: (answers) => { return "Enter the 'password' to use for the " + answers.prefix + 'restart command' },
      type: 'password'
    },
    {
      name: 'guildNotify',
      message: 'Would you like SilverBot to notify in a certain channel when it is added or removed from a server?',
      type: 'list',
      choices: ['Yes', 'No'],
      filter: (r) => {
        return r == "Yes" ? true : false
      }
    },
    {
      name: 'guildNotifyChannel',
      message: 'Enter your channel ID that you want SilverBot to send notifications there.',
      validate: function (name) {
        return name !== ''
      },
      when: (hash) => {
        return hash.guildNotify
      }
    },
    {
      name: 'allowBotFarms',
      message: 'Would you like to enable the "Bot Farms Protection" option? (More info in README.)',
      type: 'list',
      choices: ['Yes', 'No'],
      filter: (r) => {
        return r == "Yes" ? true : false
      }
    }
  ]
  inquirer.prompt(questions).then(answers => {
    answers.game = answers.game !== 'None' ? answers.game : null
    fs.writeFileSync('settings.json', JSON.stringify(answers))
    console.log('Configuration was successfull. You can now reload the launcher and start up the bot.')
    process.exit()
  })
}
process.stdout.write("Checking for updates...")
request.get('https://chanonlim.pythonanywhere.com/botinfo/silverbotv1/manifest.json', {json: true}, function(err, res, r) {
    if (err) { process.stdout.write(" Error"); throw err; process.exit()}
    process.stdout.write("\r")
    if (cmp(r.latestVersion, package.version)) {
      var hasNewerVersion = true
      inquirer.prompt({
        type: 'list',
        name: 'update',
        choices: ['Yes', 'No'],
        filter: (o) => {
          return o == "Yes" ? true : false
        },
        message: 'A new update is available (' + package.version + ' => ' + r.latestVersion + ')\nUpdate notes: ' + r.latestRelease.updateNotes + '\nWould you like to update now?'
      }).then(r=> {
        if (r.update) {
          updater.update()
        } else {
          if (fs.existsSync('settings.json')) {
            var choices = ['Launch SilverBot', 'Launch SilverBot w/ auto-restarts', new inquirer.Separator(), 'Reconfigure SilverBot', 'Check for updates', new inquirer.Separator(), 'Exit']
          } else {
            var choices = ['Configure SilverBot', new inquirer.Separator(), 'Exit']
          }
          var question = {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
          }
          inquirer.prompt(question).then(answers => {
            switch (answers.action) {
              case 'Configure SilverBot':
              case 'Reconfigure SilverBot':
                configurePrompt()
                break
              case 'Launch SilverBot':
                launch(false)
                break
              case 'Launch SilverBot w/ auto-restarts':
                launch(true)
                break
              case 'Exit':
                process.exit()
                break
              case 'Check for updates':
                updater.checkForUpdates()
            }
          })
        }
      })
    }
})
