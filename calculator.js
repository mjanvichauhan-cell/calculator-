const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");
const btn = document.getElementById("scientificBtn");
const panel = document.querySelector(".scientific-panel");

let expression = "";

btn.addEventListener("click", () => {
    panel.classList.toggle("show");
});
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.innerText;
        if (value === "AC") {
            expression = "";
            screen.value = "";

        }
        else if (button.querySelector(".fa-delete-left")) {
            expression = expression.slice(0, -1);
            screen.value = expression;
        }
        else if (value === "+/-") {
            let lastNumber = expression.match(/(\d+\.?\d*)$/);
            if(lastNumber){
                let num = lastNumber[0];
                expression = expression.replace(
                    num,
                    (-Number(num)).toString()
                );
                screen.value = expression;
            }
        }
        else if(value === ".") {
            let last = expression.split(/[\+\-\×\÷]/).pop();
            if(last.includes(".")){
                return;
            }
            expression += value;
            screen.value = expression;

        }
        else if (button.classList.contains("equal")) {
            try {
                let exp = expression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/");
                let result = eval(exp);
                if (!Number.isInteger(result)) {
                    result = parseFloat(result.toFixed(8));

                }
                screen.value = result;
                expression = result.toString();
            }
            catch {
                screen.value = "Error";
                expression = "";
            }

        }
        else {
            if (button.querySelector(".fa-plus")) value = "+";
            if (button.querySelector(".fa-minus")) value = "-";
            if (button.querySelector(".fa-xmark")) value = "×";
            if (button.querySelector(".fa-divide")) value = "÷";
            if (button.querySelector(".fa-percent")) value = "%";
            expression += value;
            screen.value = expression;

        }

    });

});