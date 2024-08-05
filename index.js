document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const neck = document.querySelector(".neck");
  const wowElement = document.querySelector("#wows");

  const largeWowContainer = document.querySelector("#largewowcontainer");
  const rainbowWowContainer = document.querySelector("#rainbowwowcontainer");
  const otterPrimeContainer = document.querySelector("#otterprimecontainer");
  const secretWowContainer = document.querySelector("#secretwowcontainer");
  const fiboWowContainer = document.querySelector("#fibowowcontainer");

  const largeWowElement = document.querySelector("#largeWows");
  const lengthElement = document.querySelector("#length");
  const rainbowElement = document.querySelector("#rainbow");
  const otterPrimeElement = document.querySelector("#otterprime");
  const secretWowElement = document.querySelector("#secretwow");
  const fiboElement = document.querySelector("#fibo");

  let wows = 0;
  let largeWows = 0;
  let rainbowWows = 0;
  let secretWows = 0;
  const primeWows = [];
  const largeWowsRequired = 10;

  let fibonacciChallengeStarted = false;
  let fibonacciChallengeComplete = false;
  const fibonacciWows = [];
  const fibonacciSecretWows = [];
  let otterPrime = false;

  document.querySelector(".print").addEventListener("click", () => {
    if (fibonacciChallengeComplete) {
      document.querySelector(".head").style.display = "none";
      document.querySelector(".hatted").style.display = "block";
    }
    window.print();
  });

  const observer = new IntersectionObserver(handleIntersect, { rootMargin: "0px 0px 200% 0px" });

  document.addEventListener("click", handleBodyClick);
  window.addEventListener("scroll", handleScroll);

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        injectNeck(entry);
      }
    });
  }

  function handleScroll() {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      const lastNeck = document.querySelector(".neck:last-child");
      injectNeck({ target: lastNeck });
    }
  }

  function injectNeck(entry) {
    observer.unobserve(entry.target);

    const clonedNeck = neck.cloneNode(true);
    wrapper.appendChild(clonedNeck);
    observer.observe(clonedNeck);

    injectWow();
  }

  function injectWow() {
    wows++;
    wowElement.innerText = wows;

    const newWow = createWowElement();
    document.body.appendChild(newWow);

    if (isPrime(wows)) primeWows.push(newWow);
    if (isFibonacci(wows)) fibonacciWows.push(newWow);

    updateLengthText();
    maybeInjectLargeWow();
  }

  function createWowElement() {
    const newWow = document.createElement("div");
    newWow.className = "textwow";
    newWow.innerText = "WOW";
    newWow.style.left = `${100 + Math.random() * (window.innerWidth - 300)}px`;
    newWow.style.top = `${wrapper.offsetHeight - 200}px`;
    return newWow;
  }

  function updateLengthText() {
    const lengthTexts = [
      { count: 10, text: "wow wow" },
      { count: 50, text: "wow wow wow" },
      { count: 100, text: "much wow" },
      { count: 150, text: "long much wow" },
      { count: 250, text: "very long much wow" },
      { count: 500, text: "wow very long much wow" },
      { count: 1000, text: "much wow very long much wow!" },
      { count: 2000, text: "much wow very long much wow!!" },
      { count: 3000, text: "much wow very long much wow!!!" },
      { count: 5000, text: "!!much wow very long much wow!!" },
      { count: 10000, text: "many many wow amaze" },
      { count: 30000, text: "amaze wow dont forget to print!" },
      { count: 50000, text: "wowwowowowowowowowowowowwoow" },
      { count: 80000, text: "wowwowowowowowowowowowowwooweeeeeeeeee" }
    ];

    const lengthText = lengthTexts.find(({ count }) => wows === count);
    if (lengthText) lengthElement.innerText = lengthText.text;
  }

  function maybeInjectLargeWow() {
    if (wows > 200 && Math.random() > 0.99) injectLargeWow();
  }

  function injectLargeWow() {
    largeWows++;
    largeWowElement.innerText = largeWows;
    largeWowContainer.classList.remove("hidden");

    const newWow = document.createElement("div");
    newWow.className = "largewow";
    newWow.innerText = "WOW";
    newWow.style.left = "50%";
    newWow.style.top = `${wrapper.offsetHeight - 200}px`;
    document.body.appendChild(newWow);

    if (largeWows === largeWowsRequired) {
      rainbowWowContainer.classList.remove("hidden");
      otterPrimeContainer.classList.remove("hidden");
    }
  }

  function handleBodyClick(event) {
    if (event.target.className === "textwow" && largeWows >= largeWowsRequired) {
      handleRainbowWowClick(event.target);
    }

    if (event.target.className === "secretwow") {
      handleSecretWowClick(event.target);
    }

    if (fibonacciChallengeStarted) {
      handleFibonacciChallengeClick(event.target);
    }
  }

  function handleRainbowWowClick(target) {
    rainbowWows++;
    target.classList.add("rainbow");
    rainbowElement.innerText = rainbowWows;

    const isPrimeActive = primeWows.every((wowElement, index) => {
      return wowElement.classList.contains("rainbow");
    });

    if (!otterPrime && isPrimeActive) {
      otterPrime = true;
      otterPrimeElement.innerText = "ACTIVE";
      setupSecretWows();
    } else {
      const activeCount = primeWows.filter((wowElement) => wowElement.classList.contains("rainbow")).length;
      otterPrimeElement.innerText = `INACTIVE (${activeCount}/${primeWows.length})`;
    }
  }

  function handleSecretWowClick(target) {
    target.classList.add("found");
    secretWows++;
    secretWowElement.innerText = secretWows;

    if (secretWows === 100) {
      fibonacciChallengeStarted = true;
      fiboWowContainer.classList.remove("hidden");
    }
  }

  function handleFibonacciChallengeClick(target) {
    if (target.classList.contains("textwow") || target.classList.contains("secretwow")) {
      toggleSpinClass(target);
      checkFibonacciChallengeCompletion();
    }
  }

  function toggleSpinClass(element) {
    if (element.classList.contains("spinLeft")) {
      element.classList.remove("spinLeft");
      element.classList.add("spinRight");
    } else if (element.classList.contains("spinRight")) {
      element.classList.remove("spinRight");
      element.classList.add("spinLeft");
    } else {
      element.classList.add("spinLeft");
    }
  }

  function checkFibonacciChallengeCompletion() {
    const regularSuccess = checkFibonacciSuccess(fibonacciWows, true);
    const secretSuccess = checkFibonacciSuccess(fibonacciSecretWows, false);

    if (regularSuccess && secretSuccess) {
      fibonacciChallengeComplete = true;
      fiboElement.innerText = "COMPLETE (NOW PRINT!)";
    } else {
      fibonacciChallengeComplete = false;
      fiboElement.innerText = `INACTIVE\n(${regularSuccess}/${fibonacciWows.length}) Regular (LRL)\n(${secretSuccess}/${fibonacciSecretWows.length}) Secret (RLR)`;
    }
  }

  function checkFibonacciSuccess(wowElements, startRight) {
    let right = startRight;
    return wowElements.every((wowElement) => {
      const success = wowElement.classList.contains(right ? "spinRight" : "spinLeft");
      right = !right;
      return success;
    });
  }

  function setupSecretWows() {
    secretWowContainer.classList.remove("hidden");

    const allNecks = Array.from(document.querySelectorAll(".neck")).slice(1);
    shuffleArray(allNecks);

    allNecks.slice(0, 100).forEach((neckItem) => {
      const pieces = neckItem.innerText.split("\n");
      const pieceIndex = Math.floor(Math.random() * (pieces.length - 1));
      const injectionIndex = 5 + Math.floor(Math.random() * 18);
      pieces[pieceIndex] = `${pieces[pieceIndex].slice(0, injectionIndex)}<span class="secretwow">WOW</span>${pieces[pieceIndex].slice(injectionIndex + 3)}`;
      neckItem.innerHTML = pieces.join("\n");
    });

    const allSecretWows = document.querySelectorAll(".secretwow");
    allSecretWows.forEach((element, index) => {
      if (isFibonacci(index + 1)) fibonacciSecretWows.push(element);
    });
  }

  function isPrime(number) {
    if (number < 2) return false;
    const limit = Math.floor(Math.sqrt(number));
    for (let i = 2; i <= limit; i++) {
      if (number % i === 0) return false;
    }
    return true;
  }

  function isFibonacci(number) {
    return isSquare(5 * number * number + 4) || isSquare(5 * number * number - 4);
  }

  function isSquare(number) {
    return number > 0 && Math.sqrt(number) % 1 === 0;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  observer.observe(neck);
});
