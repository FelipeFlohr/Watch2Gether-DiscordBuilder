import axios from "axios"

// Class for executing POSTs
export class Poster {

    public static async postToBuildW2G(data: any, url: string = "http://localhost:8080/w2g/build"): Promise<{
        nonWorkingVideos: string[],
        url: string
    }> {
        return await axios.post(url, data, {
            method: "post",
            url: "url",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then(data => {
            return data.data
        }).catch(() => {
            return null
        })
    }
}