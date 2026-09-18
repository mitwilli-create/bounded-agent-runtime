export async function run(providers, message) {
    for (const provider of providers) {
      try {
        return await provider.send(message);
      } catch (error) {
        continue;
      }
    }
    throw new Error('every provider failed');
  }