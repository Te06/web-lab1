# AI FAILURE AUDIT

## Defect 1: Countdown Drift

### Defect Description

An AI-generated countdown may decrease the remaining time manually every second.\
This can cause timer drift because `setInterval()` is not guaranteed to run at an exact interval.

### Diagnostic Method

Reviewed the JavaScript countdown logic and checked whether the timer relied on decrementing stored values instead of recalculating the remaining time.

### Refactored Solution

The countdown was refactored to calculate the remaining time from the real deadline on every update:

`const remaining = deadline - Date.now();`

This keeps the countdown synchronized with the UTC ISO 8601 deadline.

## Defect 2: Unsafe HTML Rendering

### Defect Description

AI-generated code may use `innerHTML` to display user-provided input.\
This can introduce an XSS vulnerability if malicious HTML or JavaScript is submitted.

### Diagnostic Method

Tested the form with the following payload:

`<img src=x onerror=alert(1)>`

and inspected the code for unsafe `innerHTML` usage.

### Refactored Solution

User input is sanitized before processing and dynamic text is handled using safe text operations instead of `innerHTML`.

`function sanitizeInput(value) {`\
`  return value`\
`    .trim()`\
`    .replace(/[<>]/g, "");`\
`}`

## Defect 3: Duplicate Form Submission

### Defect Description

AI-generated form handlers may allow users to submit the form multiple times while a previous request is still being processed.

### Diagnostic Method

Reviewed the form state and tested repeated submit attempts while the form was in the `submitting` state.

### Refactored Solution

The form checks its current state before processing another submission.

`if (formState === "submitting") {`\
`  return;`\
`}`

The submit button is also disabled during the submitting state.