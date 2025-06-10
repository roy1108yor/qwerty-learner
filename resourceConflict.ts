let sharedResource = 0;

function incrementResource() {
  for (let i = 0; i < 1000000; i++) {
    sharedResource++;
  }
}

function decrementResource() {
  for (let i = 0; i < 1000000; i++) {
    sharedResource--;
  }
}

async function main() {
  const promise1 = new Promise((resolve) => {
    incrementResource();
    resolve();
  });

  const promise2 = new Promise((resolve) => {
    decrementResource();
    resolve();
  });

  await Promise.all([promise1, promise2]);

  console.log('Final value of shared resource:', sharedResource);
}

main();
