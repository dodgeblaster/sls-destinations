const getSnsInput = event => {
    const record = event.requestPayload.Records[0]
    const input = JSON.parse(record.Sns.Message)
    return input
}

module.exports.handler = async event => {
    console.log('INPUT - ', event)
    const recordInDatabase = {
        time: event.timestamp,
        input: getSnsInput(event),
        source: event.requestContext.functionArn.split(':')[6],
        error: event.responsePayload
    }

    console.log('RECORD - ', recordInDatabase)
    return true
}