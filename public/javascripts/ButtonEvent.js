export class ButtonEvent {
    constructor(sortingArr) {
        for (let i = 0; i < 2; i++) {
            const btnParent = document.getElementById(sortingArr[i][0])
            for (let j = 1; j < 3; j++) {
                const btn = document.createElement('button')
                btn.id = sortingArr[i][j]
                btn.textContent = sortingArr[i][j]
                btn.onclick = this._event
                btnParent.appendChild(btn)
            }
            btnParent.insertBefore(document.createTextNode("|"), document.getElementById(sortingArr[i][0]).lastChild)
        }
    }
    _event = e => {
        console.log(e.target.id)
        // if (e.target.id == '') 
        // else
    }
}


