const getSnsInput = e => {
    const snsMessage = e.Records[0].Sns
    const data = JSON.parse(snsMessage.Message)
    return data
}

module.exports.handler = async event => {
    const data = getSnsInput(event)
    console.log('log - ', event)
    if (data.record === 'error') {
        throw new Error('RECORD ERROR')
    }

    return data
}