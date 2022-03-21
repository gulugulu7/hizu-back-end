import instance from "@/axios";
export default {
    newMessage(messageHeader, messageContent, userId, messageJump, messageType) {
        instance.get('api/users/newMessage', {
            params: {
                messageHeader: messageHeader,
                messageContent: messageContent,
                userId: userId,
                messageJump: messageJump,
                messageType: messageType
            }
        }).then().
        catch(error =>
            console.log(error)
        )
    },
    getCity() {
        return new Promise(function(resolve, reject) {
            instance
                .get("api/citys/getCity")
                .then(response => {
                    resolve(response.data.cityList)
                })
                .catch(error => {
                    reject(error);
                });
        })
    },
}