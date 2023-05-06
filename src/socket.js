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
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        }
    })
}

export default ws

export { waitForOpenConnection }