const AWS = require('aws-sdk')

const emit = async (event, data) => {
    const SNS = new AWS.SNS({
        region: process.env.AWS_REGION
    })

    const arn = await SNS.createTopic({
        Name: event
    }).promise()

    return SNS.publish({
        Subject: event,
        Message: JSON.stringify(data),
        TopicArn: arn.TopicArn
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