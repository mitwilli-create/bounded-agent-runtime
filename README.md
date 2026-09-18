# bounded-agent-runtime

A small agent runtime, built around three ways these systems fail in production. A provider goes down. Configuration is missing or wrong. A loop does not stop.

Most agent examples show the path where everything works. This one shows what happens when it does not.

## What works today

If a provider throws, the runtime tries the next one and returns its answer. If every provider throws, the runtime throws. It does not return nothing.

## Run the tests

    npm install
    npm test

There are no dependencies or API keys. Tests use fake providers, so a clean clone runs green on any machine running Node 20 or newer.

## How a provider is defined

A provider is any object with a send function.

    const provider = {
      name: 'example',
      send(message) {
        return 'an answer';
      }
    };

The runtime never learns what that provider actually is. Fake and real clients are interchangeable. That is why the tests need no network.

## Decisions

**When every provider fails, run throws rather than returning nothing.** Returning nothing lets a caller treat total failure as an empty answer, and the caller who forgets to check is the one who finds out in production.

## Decided, not yet built

These are settled design choices with no code behind them yet. They are listed here so the reasoning is on the record before the implementation is, and so nothing above claims behavior the repo does not have.

**Errors will not all be treated the same.** An outage, a timeout or a rate limit might succeed on another provider. A malformed request will be rejected identically by every one of them, so retrying turns one clear error into several confusing ones. The runtime currently retries on any error, which is wrong for the second case.

**The provider will label its own errors, and an unlabeled error will not be retried.** The runtime deliberately knows nothing about any particular service. If it read status codes it would carry knowledge that goes stale the moment a provider changes, and the fake providers in the tests would have to start pretending to be real ones. The cost is real: a provider that forgets to label an error gets no retries. That is the intended direction, because an absent signal should not be read as permission to continue.

**A provider will be required to have a name and a send function, checked before it is used.** Bad input should fail at setup with a clear message rather than deep inside a loop.

**Providers will be supplied once, at setup, rather than on every call.** Validation belongs where a configuration mistake happens, before any request is made.

## Planned

Configuration that stops the run when missing or corrupt, rather than treating unknown spend as zero.

A loop cap that exits with a written reason.

Answers required to cite a source, tested against a small fixed corpus.
