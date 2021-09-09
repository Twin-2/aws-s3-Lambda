const AWS = require('aws-sdk')

const s3 = new AWS.S3();
const fs = require('fs');


exports.handler = function (event, context, callback) {
    //pull info off the event that called our lambda
    console.log(event.Records[0])
    const data = {
        s3Bucket: event.Records[0].s3.bucket.name,
        item: event.Records[0].s3.object
    }
    //get all the images so far from the second bucket
    //this should be a json array with each point representing an image
    //add the new image that was uploaded above to the list of images
    //send back the new list to the second bucket

    let file = fs.writeFile('images.json', event.Records[0].s3.object.key)
    console.log(file)
    //send the added item to the second bucket
    let params = {
        Bucket: "lab17-ouput",
        Key: file
    }
    s3.putObject(params, function (err, data) {
        if (err) console.log(err)
        else console.log('Data sent')
    })

    return {
        status: 200,
        body: data.item
    }
}

