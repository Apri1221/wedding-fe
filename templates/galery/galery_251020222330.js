import { useState, useEffect } from "react"
import { LiquidSwipe } from "./page";


var content = []
  
export default function Galery({ }) {
    var componentsToRender = content.map((e, index) => {
        return (
            <>
                <div id={`header${index}`} className="header">
                    <div>GameCoin</div>
                    <div className={`skip text${index}`}>SKIP</div>
                </div>
                <img alt={`img${index}`} src={e.src} />
                <div id="content">
                    <div className={`contentL1 text${index}`}>{e.contentL1}</div>
                    <div className={`contentL2 text${index}`}>{e.contentL2}</div>
                    <div className={`contentL3 text${index}`}>{e.contentL3}</div>
                </div>
            </>
        )
    })

    // var componentsToRender = [
    //     (<div>Anjat</div>), <div>Yes</div>
    // ] // Add components you want to render.
    var backgroundColors = ['#FF5733', '#7DFF33', "#FFA233"] // Add background colors for each component.

    return (
        <LiquidSwipe
            components={componentsToRender}
            colors={backgroundColors}
        />
    );
}