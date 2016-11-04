Simple webpage testing harness.  Loads series of target pages in iframe configurable number of times and displays successive and overall minimum run time.

Edit `runner.html` to choose test pages to run.

Each test page should include

```html
<script src="perf-lib/perf.js"></script>
```
and call

```html
<script>
console.perf();
</script>
```

before code to test, followed by

```html
<script>
console.perfEnd();
</script>
```

after code to test.
