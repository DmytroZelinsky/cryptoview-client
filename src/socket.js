var ws = new WebSocket("wss://stream.binance.com/stream");

const waitForOpenConnection = () => {
    return new Promise((resolve, reject) => {

        if (ws.readyState !== ws.OPEN) {
            const maxNumberOfAttempts = 10
            const intervalTime = 200 //ms

            let currentAttempt = 0
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (ws.readyState === ws.OPEN) {
                    console.log(ws.readyState)
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        }
        else{
            resolve()
        }
    })
}

const subscribeToSocket = async (streamNames, id) => {
    await waitForOpenConnection()
    await new Promise(resolve => setTimeout(resolve, 1000));
    ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": streamNames,
        "id": id
    }))
    console.log('subscribed')
}

const unsubscribeFromSocket = async (streamNames, id) => {
    await waitForOpenConnection()
    ws.send(JSON.stringify({
        "method": "UNSUBSCRIBE",
        "params": streamNames,
        "id": id
    }))
    console.log('unsubscribed')
}

export default ws

export { unsubscribeFromSocket, subscribeToSocket }