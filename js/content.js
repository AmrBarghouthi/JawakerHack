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
    var target = document.querySelector("#fixed-notifications")
    if (target) {
        clearInterval(interval);
        insertAfter(cont, target);
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
    return n-1;
    
}
let stack = [];
let interval2 = setInterval(() => {
    var target = document.querySelector("#table-stack")
    if (target) {
        clearInterval(interval2);
        var observer = new MutationObserver(function (mutations) {
            if (mutations.length == 1) {
                if (mutations[0].addedNodes.length != 0) {
                    cont.innerHTML = '';
                    let cardName = mutations[0].addedNodes[0].className.split(" ")[2];
                    console.log(cardName);
                    stack.push(cardName);
                    stack.sort((a, b) => {
                        let A = a.split('-');
                        let B = b.split('-');
                        let sa = getSuitNumber(A[0]);
                        let sb = getSuitNumber(B[0]);
                        if (sa !== sb)
                            return sa < sb ? -1 : 1;
                        else {
                            let ra = getRankNumber(A[1]);
                            let rb = getRankNumber(B[1]);
                            return ra<rb?-1:1;
                        }
                    });
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
    }

}, 50);
/*
let stack = [];
let interval = setInterval(() => {
    var target = document.querySelector("#table-stack")
    if (target) {
        clearInterval(interval);
        console.log(target)
        var observer = new MutationObserver(function (mutations) {
            if (mutations.length == 1)
            {
                let cardName = mutations[0].addedNodes[0].className.split(" ")[2];
                console.log(cardName);
                stack.push(cardName);
                stack = [...new Set(stack)];
                if(stack.length == 52)
                    stack = [];
                for(let i=0;i<stack.length;i++){
                    let cardContainors = document.querySelectorAll(".card-icons-container");
                    let newEl = document.createElement('div');
                    newEl.className = "card face-up "+stack[i];
                    cardContainors[2].childNodes[1].appendChild(newEl);
                    let face = document.createElement("div");
                    face.className= "face";
                    newEl.appendChild(face);

                }
            }
        });
        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
    }
}, 50);
*/