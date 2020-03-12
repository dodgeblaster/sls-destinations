const AWS = require('aws-sdk')
const SNS = new AWS.SNS({
    region: process.env.AWS_REGION
})

const emit = async (event, data) => {
    return SNS.publish({
        Subject: event,
        Message: JSON.stringify(data),
        TopicArn: process.env.EVENT
    }).promise()
}

module.exports.handler = async event => {
    const data = JSON.parse(event.body)
    if (data.start === 'error') {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: 'error'
                }
            )
        }
    }

    await emit('ed-received-dev', data)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'sent'
            }
        )
    }
}