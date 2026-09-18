# bounded-agent-runtime

A small agent runtime with boundaries. It is built around the three ways
agent systems fail in production: a provider goes down, configuration is
missing or wrong, and a loop will not end.

Work in progress.

## Run the tests

```
npm install
npm test
```

There are no dependencies and no API keys. The tests run against fake
providers, so a clean clone runs green on any machine with Node 20 or newer.
