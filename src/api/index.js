const Api = {
    sendCellClick: (cell) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('api has sended a click to the server');
                resolve();
            }, 200);
        });
    }
}

export default Api;