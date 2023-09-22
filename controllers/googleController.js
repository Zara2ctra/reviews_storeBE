const axios =  require('axios');

class GoogleController {
    async getUserData(accessToken) {
        try {
            const {data} = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            console.log(data)
            return data;
        } catch (error) {
            return null;
        }
    };
}

module.exports = new GoogleController();