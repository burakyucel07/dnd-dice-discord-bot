const is_debug = process.env.IS_DEBUG == 'true' ? true : false;

function debugLog(message) {
  if (!is_debug) {
    return;
  }

  console.log(message);
}

function log(message) {
  console.log(message);
}

module.exports = {
  debugLog,
  log,
};
