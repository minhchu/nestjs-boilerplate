const repl = require('repl');

const loop = repl.start({
  prompt: '> ',
  ignoreUndefined: true,
  breakEvalOnSigint: true, // allow exiting with ctrl-C during evaluation
});

global.app = null;

function teardown() {
  console.log('Tearing down ...');
  app.close();
}

function setup() {
  const core = require('@nestjs/core');
  const module = require('./dist/src/app.module.js');
  core.NestFactory.create(module.AppModule, { logger: false }).then((a) => {
    app = a;

    loop.context.app = app;
  });
}

setTimeout(function () {
  setup();
}, 0);

loop.on('exit', function () {
  teardown();
});

loop.defineCommand('cl', { 
  help: 'Clear screen',
  action: function() { 
    process.stdout.write('\033c');
  }
})
