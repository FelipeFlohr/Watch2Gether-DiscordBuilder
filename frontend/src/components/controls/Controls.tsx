import { useState } from "react"
import { User, VideosData } from "../../types/VideosData"
import Button from "../button/Button"
import Socket from "../socket/Socket"

export default function Controls() {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [nonWorking, setNonWorking] = useState<string[]>([])
    const [users, setUsers] = useState<User[]>([])

    const setVideoData = (videoData: VideosData) => {
        setNonWorking(videoData.nonWorking)
        setUsers(videoData.users)
    }

    const setButtonsCurrentStatus = () => {
        return nonWorking.length > 0
    }

    const renderUsers = () => {
        return users.map((u, i) => {
            const user = Object.entries(u)[0]
            return <span key={i}>{user[0]}: <span className="font-bold">{user[1]}</span></span>
        })
    }

    const renderIndex = () => {
        if (nonWorking.length) {
            return (
                <span className="text-xl">
                    Current video: {currentIndex + 1} / {nonWorking.length}
                </span>
            )
        }
    }

    const prevIndex = () => {
        if (currentIndex - 1 >= 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const openIndex = () => {
        const a = document.createElement("a")
        a.target = "_"
        a.href = nonWorking[currentIndex]
        a.click()
    }

    const nextIndex = () => {
        if (currentIndex + 1 < nonWorking.length) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <Socket onDataReceived={setVideoData}>
            <div className="flex flex-col items-center justify-center">
                <h4 className="text-5xl text-center">Watch2Gether - Video Opener</h4>
                <div className="flex flex-col justify-center items-center mt-9 gap-3">
                    {renderIndex()}
                    <div className="flex gap-2">
                        <Button onClick={setButtonsCurrentStatus() ? prevIndex : undefined} enabled={setButtonsCurrentStatus()}>-</Button>
                        <Button onClick={setButtonsCurrentStatus() ? openIndex : undefined} enabled={setButtonsCurrentStatus()}>{String.fromCharCode(9166)}</Button>
                        <Button onClick={setButtonsCurrentStatus() ? nextIndex : undefined} enabled={setButtonsCurrentStatus()}>+</Button>
                    </div>
                    <div className="flex flex-col items-center mt-8">
                        {renderUsers()}
                    </div>
                </div>
            </div>
        </Socket>
    )
}