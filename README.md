`polyperf` is a simple performance testing harness. It loads a series of target pages
(each in their own iframe) a configurable number of times, and displays the successive run
times, as well as the overall minimum.

## Installing and running

Run
```
bower install
polyserve
```

Then navigate to  [http://localhost:8080/components/polyperf/sample/runner.html](http://localhost:8080/components/polyperf/sample/runner.html). The results will look something like this:

<img width="469" alt="screen shot 2016-11-03 at 12 54 32" src="https://cloud.githubusercontent.com/assets/1369170/19982787/b20dee9e-a1c4-11e6-8d2b-d7f607eaeff9.png">

The tests are run by `runner.html`, which defines the list of tests to run. Edit `runner.html` to choose test pages to run. There are two different ways to run a test:

## Using the harness
Use this approach if you want to test the cost of
an element by repeating it a number of times on the page (by default: 250 times).

In `runner.html`, modify the array of tests in `document.querySelector('frame-tester').tests` as follows:

```
document.querySelector('frame-tester').tests = [
  'harness.html?wc-element=input',
  'harness.html?wc-element=test1-element&wc-path=./elements/test1-element.html',
  'harness.html?wc-element=test2-element&wc-path=./elements/test2-element.html'
];
```

To test a native element (eg. `input`), use `wc-element=input`. To test a custom
element, use `harness.html?wc-element=$name&wc-path=$path`, where `$name` is
the name of the custom element (eg. `paper-input`), and `$path` is the path
to where it lives (eg. `./elements/paper-input/paper-input.html`).

To configure the number of times the element is repeated in the page, use
the `wc-count` argument:
`harness.html?wc-element=$name&wc-path=$path&wc-count=17`

Note that the numbers displayed as a test result are the cummulative ones (i.e. how long the page with the repeated element took to run).
## Using specific tests
Use this approach if you want to repeat a custom test that does something
more than just repeating an element in a page.

In `runner.html`, modify the array of tests in `document.querySelector('frame-tester').tests` as follows:

```
document.querySelector('frame-tester').tests = [
  'test1.html',
  'test2.html'
];
```

Where `test.1.html` is the specific webpage to test. Each test page should include

```
<script src="perf-lib/perf.js"></script>
```

and call

```
<script>
  console.perf();
</script>
```

before the snippet of code to test, followed by

```
<script>
   console.perfEnd();
</script>
```

after the snippet of code to test.
