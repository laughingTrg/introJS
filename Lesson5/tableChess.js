const settings = {
    rows: 8,
    cols: 8,
    colorWhitePlace: '#ffffff',
    colorBlackPlace: '#000000',
}

const game = {
    settings: settings,
    chessPlace: null,

    createTableChess() {


        console.log(this.chessPlace);

        this.chessPlace = document.getElementById('table-chess');
        this.chessPlace.innerHTML = '';

        for (let row = 0, num = 8; row <= this.settings.rows; row++, num--) {
            const trElement = document.createElement('tr');

            this.chessPlace.append(trElement);
            if (row != this.settings.rows) {
                for (let col = 0; col <= this.settings.cols; col++) {
                    const tdElement = document.createElement('td');
                    if (col != this.settings.cols) {
                        if (row % 2 == 0 && col % 2 == 0 || row % 2 != 0 && col % 2 != 0) {
                            tdElement.style.backgroundColor = this.settings.colorWhitePlace;
                        } else {
                            tdElement.style.backgroundColor = this.settings.colorBlackPlace;
                        }
                        trElement.append(tdElement);
                    } else {
                        tdElement.textContent = num;
                        trElement.append(tdElement);

                    }
                }

            } else {
                for (let col = 0, code = 65; col < this.settings.cols; col++, code++) {
                    const tdElement = document.createElement('td');
                    tdElement.textContent = String.fromCharCode(code);
                    trElement.append(tdElement);

                }
            }

        }
    }
}

window.addEventListener('load', () => {
    game.createTableChess();
})
