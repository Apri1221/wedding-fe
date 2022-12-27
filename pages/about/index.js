import Lottie from "lottie-web";
import { useRef, useEffect } from "react";
import animation from "../../public/assets/animation.json"

export default function Example() {
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
    });

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 m-10">
                    <h1 className="font-poppins text-5xl font-black">
                        Buat cerita cintamu sempurna
                    </h1>
                </div>
                <div style={{ height: '100em' }} ref={animationContainer}/>
            </div>
        </>
    )
}