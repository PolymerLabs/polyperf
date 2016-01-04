// x-browser compat.
if (!window.performance) {
  var start = Date.now();
  // only at millisecond precision
  window.performance = {now: function(){ return Date.now() - start }};
}

console.perf = function() {
  if (window.HTMLImports && !HTMLImports.useNative) {
    var fn = console._perf.bind(console);
    if (!CustomElements.ready) {
      addEventListener('HTMLImportsLoaded', fn, true);
    } else {
      HTMLImports.whenReady(fn);
    }
  } else {
    console._perf();
  }
};

console._perf = function() {
  if (window.gc) {
    for (var i=0; i<20; i++) {
      gc();
    }
  }
  if (console.time) {
    console.time('perf');
  }
  console.profile();
  console.perf.time = performance.now();  
};

console.perfEnd = function() {
  // TODO(sorvell): WCR is unnecessarily delayed via setTimeout to workaround
  // https://code.google.com/p/chromium/issues/detail?id=425790.
  // This can add significant noise to benchmarking so avoid the wait
  // if we know we can (native CE).
  // We don't need the workaround for this use case because perfEnd is typically
  // called via a blocking script.
  if (window.WebComponents && !CustomElements.useNative) {
    // TODO(sjmiles): we need some kind of 'whenReady' or other signal
    // that will work if this function is called after the event has fired
    if (!CustomElements.ready) {
      addEventListener('WebComponentsReady', function() {
        console._perfEnd();
      });    
    } else {
      CustomElements.takeRecords();
      console._perfEnd();  
    }
  } else {
    console._perfEnd();
  }
};

console._perfEnd = function() {
  // force layout
  document.body.offsetWidth;
  var time = performance.now() - console.perf.time;
  console.profileEnd();
  if (console.time) {
    console.timeEnd('perf');
  }
  document.title = time.toFixed(1) + 'ms: ' + document.title;
  if (window.top !== window) {
    window.top.postMessage(time + 'ms', '*');
  }
};
