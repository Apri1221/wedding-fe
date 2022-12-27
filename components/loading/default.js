import animation from "../../public/assets/94685-bouncing-heart.json"
import Lottie from "lottie-web";
import { useRef, useEffect } from "react";


export default function LoadingDefault() {
    const animationContainer = useRef(null);
    const anim = useRef(null);

    useEffect(() => {
        if (animationContainer.current) {
            anim.current = Lottie.loadAnimation({
                container: animationContainer.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animation
            });

            return () => anim.current?.destroy();
        }
    })

    return (
        <div className="grid grid-cols-1">
            <div className="mt-5" style={{ height: '20rem' }} ref={animationContainer}></div>
            <p className="flex justify-center">Data kamu sedang kami proses!</p>
        </div>
    )
}