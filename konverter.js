const inputCurBtns = document.querySelectorAll(
  ".input-source .single-currency"
);
const outputCurBtns = document.querySelectorAll(
  ".output-target .single-currency"
);
const output = document.querySelectorAll("#output");
const input = document.querySelector("#input");
const baseExchangeRate = document.querySelector("input-source .exchange-rate");
const targetExchangeRate = document.querySelector(
  ".output-target .exchage-rate"
);


const getCurrentExchange = async () => {
  try {
    const activeBase = [...inputCurBtns].find((item) =>
      item.classList.contains("single-currency-active")
    )?.textContent;


    const activeTarget = [...outputCurBtns].find((item) =>
      item.classList.contains("single-currency-active")
    ).textContent
     console.log(activeBase, activeTarget);

    const res = await fetch(
      `https://api.exchangerate.host/latest?base=USD&symbols=RUB=${activeBase}&symbols=${activeTarget}`
    );
    const data = await res.json();
    output.value = (+Object.values(data?.rates)[0] * +input.value).toFixed(4);
    return data;
  } catch (error) {
    console.log("error happend: ", error);
  }
};
getCurrentExchange();
console.log(inputCurBtns);

inputCurBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    inputCurBtns.forEach((el) => el.classList.remove("single-currency-active"));
    item.classList.add("single-currency-active");
    getCurrentExchange();
  });
});

outputCurBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    outputCurBtns.forEach((el) => el.classList.remove("single-currency-active"));
    item.classList.add("single-currency-active");
    getCurrentExchange();
  });
});
input.addEventListener("blur", (e) => {
  getCurrentExchange();
});
