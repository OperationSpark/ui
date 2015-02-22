# ui
A simple ui library supporting the generation of ui controls from json.

The function `makeControls()` takes a `values` object, a `settings` and a reset function.

1. The values objects can be empty.  All updates via controls will be written to the `values` object.
2. The `settings` object represents the configuration to generate the html form controls.  See the example-data.json file for expected input.
3. The `reset()` function will be called if the application needs to be _restarted_ on change of a value.  The application can decide what this means.
