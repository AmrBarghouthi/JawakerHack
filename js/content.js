function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
let cont = document.createElement("div")
cont.className = "amr card-icons-container";
function addCard(card, cont) {
    let newEl = document.createElement('div');
    newEl.className = "card face-up " + card;
    cont.appendChild(newEl);
    let face = document.createElement("div");
    face.className = "face";
    newEl.appendChild(face);
}
let interval = setInterval(() => {
    var target = document.querySelector("#game")
    if (target) {
        clearInterval(interval);
        //insertAfter(cont, target);
        target.parentElement.insertBefore(cont, target);
    }
}, 50);
function getSuitNumber(s) {
    if (s == 'spade')
        return 1;
    else if (s == 'club')
        return 3;
    else if (s == 'heart')
        return 0;
    return 2;
}
function getRankNumber(r) {
    if (r == 'A')
        return 13;
    if (r == 'K')
        return 12;
    if (r == 'Q')
        return 11;
    if (r == 'J')
        return 10;
    let n = parseInt(r);
    return n - 1;

}
function sortCompritor(a, b) {
    let A = a.split('-');
    let B = b.split('-');
    let sa = getSuitNumber(A[0]);
    let sb = getSuitNumber(B[0]);
    if (sa !== sb)
        return sa < sb ? -1 : 1;
    else {
        let ra = getRankNumber(A[1]);
        let rb = getRankNumber(B[1]);
        return ra < rb ? -1 : 1;
    }
}
let stack = [];
let traceTable = () => {
    var target = document.querySelector("#table-stack");
    var target2 = document.querySelector("#upcards");
    let observer;
    console.log("tracetable");
    if (target) {
        clearInterval(interval2);
        console.log("target found");

        observer = new MutationObserver(function (mutations) {
            console.log("MutationObserver");

            if (mutations.length == 1) {
                if (mutations[0].addedNodes.length != 0) {
                    cont.innerHTML = '';
                    let cardName = mutations[0].addedNodes[0].className.split(" ")[2];
                    stack.push(cardName);
                    stack.sort(sortCompritor);
                    for (let i = 0; i < stack.length; i++)
                        addCard(stack[i], cont);
                    if (document.querySelectorAll(".hand")[0].childElementCount == 0) {
                        stack = [];
                        cont.innerHTML = '';
                    }
                }
            }
        });
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
        let interval3 = setInterval(() => {
            console.log(target === document.querySelector("#table-stack"))
            if (target !== document.querySelector("#table-stack")) {
                console.log("interval3 game not found")
                interval2 = setInterval(traceTable, 50);
                observer.disconnect();
                clearInterval(interval3);
                stack = [];
                cont.innerHTML = '';
                interval = setInterval(() => {
                    var target = document.querySelector("#game")
                    if (target) {
                        clearInterval(interval);
                        target.parentElement.insertBefore(cont, target);
                    }
                }, 50);
            }
        }, 50);
    }
    if (target2) {
        clearInterval(interval2);
        observer = new MutationObserver((m) => {
            let cardsUP = target2;
            cont.innerHTML = '';
            stack = [];
            for (let i = 0; i < cardsUP.childNodes.length; i++) {
                let child = cardsUP.childNodes[i];
                let cardName = child.className.split(" ")[2];
                if (cardName == "face-up")
                    cardName = child.className.split(" ")[3]
                stack.push(cardName);
            }
            stack.sort(sortCompritor);
            stack.forEach((e) => addCard(e, cont));
        });
        var config = { attributes: true, childList: true, characterData: true };
        observer.observe(target2, config);
        let interval3 = setInterval(() => {
            if (target2 !== document.querySelector("#upcards")) {
                interval2 = setInterval(traceTable, 50);
                observer.disconnect();
                clearInterval(interval3);
                stack = [];
                cont.innerHTML = '';
                interval = setInterval(() => {
                    var target = document.querySelector("#game")
                    if (target) {
                        clearInterval(interval);
                        target.parentElement.insertBefore(cont, target);
                    }
                }, 50);
            }
        }, 50);
    }
}
let interval2 = setInterval(traceTable, 50);